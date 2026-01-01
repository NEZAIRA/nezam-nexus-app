/* tslint:disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {LitElement, css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('gdm-live-audio-visuals-3d')
export class GdmLiveAudioVisuals3d extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      overflow: hidden;
    }
    
    .container {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .particle {
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(0, 210, 255, 0.3);
      border-radius: 50%;
      animation: float 15s infinite linear;
    }
    
    @keyframes float {
      0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(100px) rotate(360deg);
        opacity: 0;
      }
    }
  `;

  private particles: HTMLElement[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.createParticles();
    window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
    super.disconnectedCallback();
  }

  private handleResize = () => {
    this.createParticles();
  };

  private createParticles() {
    // Clear existing particles
    this.renderRoot?.querySelectorAll('.particle').forEach(p => p.remove());
    
    // Create new particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100 + 100; // Start below the view
      const delay = Math.random() * 15;
      
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      particle.style.width = `${Math.random() * 3 + 1}px`;
      particle.style.height = particle.style.width;
      
      this.renderRoot?.appendChild(particle);
    }
  }

  render() {
    return html`
      <div class="container">
        <!-- Particles will be created dynamically -->
      </div>
    `;
  }
}