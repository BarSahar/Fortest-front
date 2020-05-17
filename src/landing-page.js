import { LitElement, html, css } from 'lit-element';
import './message-input.js';

class LandingPage extends LitElement {
  static get properties() {
    return {
      socket: {type: Object}
    };
  }

  constructor() {
    super();
    this.socket = io('http://localhost:3000');
  }

  _registerUser(e) {
    let eventDetails = e.detail;

    this.socket.emit('register-user', eventDetails);
    this.dispatchEvent(new CustomEvent('register-user', { detail: eventDetails }));
  }

  static get styles() {
    return [
      css`
        :host {
          margin: 0 auto;
          width: 400px;
        }
        `
    ]
  }

  render() {
    return html`
      <kor-grid columns="1" rows="10">
        <kor-card grid-rows="9">
          <kor-empty-state label="Please enter a nickname and Login" icon="account_circle"></kor-empty-state>
        </kor-card>
        <kor-card grid-rows="1">
          <message-input
              @sent-message="${this._registerUser}">
          </message-input>
        </kor-card>
      </kor-grid>
    `;
  }
}

customElements.define('landing-page', LandingPage);
