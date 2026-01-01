/**
 * Utility functions for audio processing
 */

export function createBlob(audioData: Float32Array): Blob {
  // Create a WAV file from audio data
  const buffer = new ArrayBuffer(44 + audioData.length * 2);
  const view = new DataView(buffer);

  // RIFF header
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + audioData.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // fmt chunk size
  view.setUint16(20, 1, true); // format (1 = PCM)
  view.setUint16(22, 1, true); // channels
  view.setUint32(24, 16000, true); // sample rate
  view.setUint32(28, 32000, true); // byte rate
  view.setUint16(32, 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  writeString(36, 'data');
  view.setUint32(40, audioData.length * 2, true);

  // Write audio data
  const offset = 44;
  for (let i = 0; i < audioData.length; i++) {
    const sample = Math.max(-1, Math.min(1, audioData[i]));
    view.setInt16(offset + i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

export function decode(base64String: string): Uint8Array {
  // Decode base64 string to Uint8Array
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  base64String: string
): Promise<AudioBuffer> {
  const audioData = decode(base64String);
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)({sampleRate: 24000});
  return new Promise((resolve, reject) => {
    const arrayBuffer = audioData.buffer.slice() as ArrayBuffer;
    audioContext.decodeAudioData(
      arrayBuffer,
      resolve,
      reject
    );
  });
}