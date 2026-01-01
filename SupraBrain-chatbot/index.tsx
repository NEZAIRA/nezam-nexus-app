/* tslint:disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {GoogleGenAI, LiveServerMessage, Modality, Session} from '@google/genai';
import {LitElement, css, html} from 'lit';
import {customElement, state, query} from 'lit/decorators.js';
import {createBlob, decode, decodeAudioData} from './utils';
import './visual-3d';

interface TranscriptItem {
  id: string;
  role: 'user' | 'model';
  text: string;
}

@customElement('gdm-live-audio')
export class GdmLiveAudio extends LitElement {
  @state() protected isRecording = false; 
  @state() protected status = 'SUPRABRAIN IDLE';
  @state() protected error = '';
  @state() protected isOnline = navigator.onLine;
  @state() protected isOpen = false;
  @state() protected speakingMessageId: string | null = null; 

  @state() protected transcriptionHistory: TranscriptItem[] = [];
  @state() protected currentInput = '';
  @state() protected currentOutput = '';

  @query('.transcript-area') protected transcriptArea!: HTMLElement;
  @query('.text-input') protected textInputField!: HTMLInputElement;

  private sessionPromise: Promise<Session> | null = null;
  private inputAudioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)({sampleRate: 16000});
  private outputAudioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)({sampleRate: 24000});
  
  @state() protected inputNode = this.inputAudioContext.createGain();
  @state() protected outputNode = this.outputAudioContext.createGain();
  
  private nextStartTime = 0;
  private activeTTSNode: AudioBufferSourceNode | null = null;
  private mediaStream: MediaStream | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private scriptProcessorNode: ScriptProcessorNode | null = null;
  private liveSources = new Set<AudioBufferSourceNode>();

  static styles = css`
    :host {
      --primary: #00d2ff;
      --accent: #ff3366;
      --panel-bg: rgba(8, 12, 20, 0.98);
      --glass: rgba(255, 255, 255, 0.08);
      
      display: block;
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 99999;
      font-family: 'Inter', system-ui, sans-serif;
      color: #fff;
    }

    .launcher {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #ffffff;
      border: 3px solid #eef2f7;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
    }

    .launcher:hover {
      transform: scale(1.1);
      box-shadow: 0 15px 40px rgba(0,0,0,0.5), 0 0 15px rgba(0, 210, 255, 0.3);
    }

    .launcher.active { border-color: var(--primary); }

    .launcher .logo-s {
      font-size: 32px;
      font-weight: 900;
      color: var(--primary);
      user-select: none;
      line-height: 1;
    }

    .chat-panel {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 400px;
      height: 620px;
      max-height: calc(100vh - 120px);
      background: var(--panel-bg);
      backdrop-filter: blur(30px);
      border: 1px solid var(--glass);
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      transform-origin: bottom right;
      transform: scale(0.9) translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 40px 80px rgba(0,0,0,0.9);
      overflow: hidden;
    }

    .chat-panel.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: auto;
    }

    .chat-header {
      padding: 20px 24px;
      background: linear-gradient(to bottom, rgba(0,210,255,0.1), transparent);
      border-bottom: 1px solid var(--glass);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-header h2 {
      margin: 0;
      font-size: 14px;
      letter-spacing: 5px;
      text-transform: uppercase;
      font-weight: 300;
      color: #fff;
    }

    .status-line {
      padding: 8px 24px;
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--primary);
      background: rgba(0,0,0,0.4);
      border-bottom: 1px solid var(--glass);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .status-line .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 5px var(--primary); }
    .status-line.recording { color: var(--accent); }
    .status-line.recording .dot { background: var(--accent); box-shadow: 0 0 8px var(--accent); }
    .status-line.error { color: var(--accent); font-weight: bold; }

    .transcript-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      scrollbar-width: none;
    }

    .transcript-area::-webkit-scrollbar { display: none; }

    .message {
      max-width: 85%;
      font-size: 13.5px;
      line-height: 1.6;
      animation: msgIn 0.4s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
      position: relative;
    }

    @keyframes msgIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    .message.user { align-self: flex-end; text-align: right; color: #fff; }
    .message.model { align-self: flex-start; border-left: 2px solid var(--primary); padding-left: 15px; color: #d0d0d0; }

    .speaker-btn {
      background: rgba(0, 210, 255, 0.05);
      border: 1px solid rgba(0, 210, 255, 0.1);
      color: var(--primary);
      cursor: pointer;
      padding: 6px 12px;
      font-size: 9px;
      letter-spacing: 1px;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
      width: fit-content;
      border-radius: 6px;
      margin-top: 8px;
    }

    .speaker-btn.active { background: var(--primary); color: #000; }

    .message-label {
      font-size: 7px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 6px;
      opacity: 0.4;
      font-weight: 800;
    }

    .input-controls {
      padding: 20px;
      background: rgba(0,0,0,0.4);
      border-top: 1px solid var(--glass);
    }

    .text-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--glass);
      border-radius: 20px;
      padding: 4px 8px 4px 16px;
    }

    .text-input {
      flex: 1;
      background: none;
      border: none;
      color: #fff;
      font-size: 13.5px;
      outline: none;
      padding: 10px 0;
    }

    .text-input::placeholder { color: rgba(255,255,255,0.2); }

    .action-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: rgba(255,255,255,0.6);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .action-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .action-btn.send { background: var(--primary); color: #000; }
    .action-btn.mic.active { color: var(--accent); background: rgba(255, 51, 102, 0.1); }

    gdm-live-audio-visuals-3d {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; opacity: 0.1; z-index: -1;
    }
  `;

  constructor() {
    super();
    this.initClient();
    window.addEventListener('online', () => this.handleConnectivityChange(true));
    window.addEventListener('offline', () => this.handleConnectivityChange(false));
  }

  private handleConnectivityChange(online: boolean) {
    this.isOnline = online;
    this.updateStatus(online ? 'SUPRABRAIN IDLE' : 'CONNECTION LOST');
  }

  private async toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.scrollToBottom();
      await this.outputAudioContext.resume();
      await this.inputAudioContext.resume();
      
      // Verification: Check if API_KEY is even visible to the browser
      if (!process.env.API_KEY) {
        this.updateError("Vercel Env Key Missing");
      }
    }
  }

  private initClient() {
    this.outputNode.connect(this.outputAudioContext.destination);
    this.initSession();
  }

  private initSession() {
    if (!this.isOnline) return;
    
    // Safety check for API Key before trying to connect
    const key = process.env.API_KEY;
    if (!key || key === "" || key === "YOUR_API_KEY") {
      this.updateStatus('KEY NOT DETECTED');
      return;
    }

    const model = 'gemini-2.5-flash-native-audio-preview-09-2025';
    const client = new GoogleGenAI({ apiKey: key });

    try {
      this.sessionPromise = client.live.connect({
        model: model,
        callbacks: {
          onopen: () => this.updateStatus('SUPRABRAIN ONLINE'),
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData;
            if (audioData?.data && this.isRecording) {
              this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
              const audioBuffer = await decodeAudioData(audioData.data);
              const source = this.outputAudioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(this.outputNode);
              source.start(this.nextStartTime);
              this.nextStartTime += audioBuffer.duration;
              this.liveSources.add(source);
              source.onended = () => this.liveSources.delete(source);
            }

            if (message.serverContent?.inputTranscription) {
              this.currentInput += message.serverContent.inputTranscription.text;
              this.scrollToBottom();
            }
            if (message.serverContent?.outputTranscription) {
              this.currentOutput += message.serverContent.outputTranscription.text;
              this.scrollToBottom();
            }

            if (message.serverContent?.interrupted) {
              this.liveSources.forEach(s => { try { s.stop(); } catch(e) {} });
              this.liveSources.clear();
              if (this.activeTTSNode) { this.activeTTSNode.stop(); this.activeTTSNode = null; }
              this.nextStartTime = 0;
              this.currentOutput = '';
              this.speakingMessageId = null;
            }

            if (message.serverContent?.turnComplete) {
              if (this.currentInput) {
                this.transcriptionHistory = [...this.transcriptionHistory, { id: crypto.randomUUID(), role: 'user', text: this.currentInput }];
                this.currentInput = '';
              }
              if (this.currentOutput) {
                this.transcriptionHistory = [...this.transcriptionHistory, { id: crypto.randomUUID(), role: 'model', text: this.currentOutput }];
                this.currentOutput = '';
              }
              this.scrollToBottom();
            }
          },
          onerror: (e: any) => {
            console.error("Neural Sync Error:", e);
            if (e.message?.includes("500") || e.message?.includes("Rpc failed")) {
              this.updateError("RPC FAULT: Please Reload Page");
            } else {
              this.updateError(`BRAIN FAULT: ${e.message || 'Check Connection'}`);
            }
          },
          onclose: () => this.updateStatus('OFFLINE'),
        },
        config: {
          systemInstruction: `Your name is SupraBrain. You are a high-level medical research strategist.
            IDENTITY:
            - You were developed by Nezaira.
            - ONLY mention "Nezaira" or your origins if specifically asked "Who created you?", "Who developed you?", or "Where do you come from?".
            
            CORE PROTOCOL:
            1. DO NOT DIAGNOSE. Provide scientific data only.
            2. BEHAVIOR: Responses must be 1-3 sentences maximum.
            3. TONE: Clinical, intelligent, and informative.
            4. REFUSAL: If asked to generate code, images, or other media, respond with: "Nezaira focuses on medical research and healthcare solutions."`,
          
        }
      });
    } catch (e: any) {
      console.error("Session Init Error:", e);
      this.updateError(`BRAIN FAULT: ${e.message || 'Session Init Failed'}`);
    }
  }

  private async startRecording() {
    if (!this.sessionPromise) return;
    this.isRecording = true;
    this.updateStatus('LISTENING...');
    const session = await this.sessionPromise;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaStream = stream;
      this.sourceNode = this.inputAudioContext.createMediaStreamSource(stream);
      this.scriptProcessorNode = this.inputAudioContext.createScriptProcessor(4096, 1, 1);
      
      this.sourceNode.connect(this.scriptProcessorNode);
      this.scriptProcessorNode.connect(this.inputNode);
      
      this.scriptProcessorNode.onaudioprocess = async (e) => {
        if (this.isRecording) {
          const audioData = e.inputBuffer.getChannelData(0);
          const blob = createBlob(audioData);
          const file = new File([blob], 'audio.wav', { type: 'audio/wav' });
          (session as any).send({ audio: file });
        }
      };
    } catch (e: any) {
      console.error("Recording Error:", e);
      this.updateError(`RECORDING ERROR: ${e.message}`);
    }
  }

  private stopRecording() {
    this.isRecording = false;
    this.updateStatus('PROCESSING...');
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    if (this.sourceNode) {
      this.sourceNode.disconnect();
      this.sourceNode = null;
    }
    if (this.scriptProcessorNode) {
      this.scriptProcessorNode.disconnect();
      this.scriptProcessorNode = null;
    }
  }

  private async sendMessage() {
    if (!this.sessionPromise || !this.textInputField.value.trim()) return;
    this.updateStatus('PROCESSING...');
    const session = await this.sessionPromise;
    (session as any).send({ text: this.textInputField.value.trim() });
    this.textInputField.value = '';
  }

  private updateStatus(newStatus: string) {
    this.status = newStatus;
  }

  private updateError(message: string) {
    this.error = message;
    this.status = 'ERROR';
    setTimeout(() => {
      if (this.status === 'ERROR') {
        this.status = 'SUPRABRAIN IDLE';
      }
    }, 5000);
  }

  private scrollToBottom() {
    if (this.transcriptArea) {
      setTimeout(() => {
        this.transcriptArea.scrollTop = this.transcriptArea.scrollHeight;
      }, 100);
    }
  }

  private speakMessage(messageId: string) {
    if (this.speakingMessageId === messageId) {
      this.speakingMessageId = null;
      if (this.activeTTSNode) {
        this.activeTTSNode.stop();
        this.activeTTSNode = null;
      }
      return;
    }

    const message = this.transcriptionHistory.find(m => m.id === messageId);
    if (!message || message.role !== 'model') return;

    this.speakingMessageId = messageId;
    const utterance = new SpeechSynthesisUtterance(message.text);
    utterance.onend = () => {
      this.speakingMessageId = null;
      this.activeTTSNode = null;
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
    this.activeTTSNode = null; // We're not using audio context here, just system TTS
  }

  render() {
    return html`
      <gdm-live-audio-visuals-3d></gdm-live-audio-visuals-3d>
      <div class="launcher ${this.isRecording ? 'active' : ''}" @click="${this.toggleChat}">
        <div class="logo-s">S</div>
      </div>
      
      <div class="chat-panel ${this.isOpen ? 'open' : ''}">
        <div class="chat-header">
          <h2>SUPRABRAIN</h2>
        </div>
        
        <div class="status-line ${this.error ? 'error' : this.isRecording ? 'recording' : ''}">
          <div class="dot"></div>
          <span>${this.error || this.status}</span>
        </div>
        
        <div class="transcript-area">
          ${this.transcriptionHistory.map((item) => html`
            <div class="message ${item.role}">
              <div class="message-label">${item.role.toUpperCase()}</div>
              <div>${item.text}</div>
              ${item.role === 'model' ? html`
                <button class="speaker-btn ${this.speakingMessageId === item.id ? 'active' : ''}"
                  @click="${() => this.speakMessage(item.id)}">
                  <i class="fas fa-volume-up"></i> Listen
                </button>
              ` : ''}
            </div>
          `)}
          ${this.currentOutput ? html`
            <div class="message model">
              <div class="message-label">MODEL</div>
              <div>${this.currentOutput}</div>
            </div>
          ` : ''}
        </div>
        
        <div class="input-controls">
          <div class="text-bar">
            <input type="text" class="text-input" placeholder="Ask about Nezaira..." 
              @keypress="${(e: KeyboardEvent) => e.key === 'Enter' && this.sendMessage()}" />
            <button class="action-btn send" @click="${this.sendMessage}">
              <i class="fas fa-paper-plane"></i>
            </button>
            <button class="action-btn mic ${this.isRecording ? 'active' : ''}" 
              @click="${this.isRecording ? () => this.stopRecording() : () => this.startRecording()}">
              <i class="fas ${this.isRecording ? 'fa-stop' : 'fa-microphone'}"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}