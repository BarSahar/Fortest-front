import { LitElement, html, css } from 'lit-element';

export class MessageInput extends LitElement {
  static get properties() {
    return {
      text: { type: String },
      timeStamp: { type: String },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          justify-content: space-between;
        }
      `,
    ];
  }

  _sendMessage() {
    const input = this.shadowRoot.getElementById('messageInput');
    const text = input.value;
    if (!text || text == '') {
      return;
    }

    input.value = '';

    const eventDetails = { text: text, timestamp :new Date().toLocaleTimeString()};
    this.dispatchEvent(new CustomEvent('sent-message', { detail: eventDetails }));
  }

  render() {
    return html`  
      <kor-grid spacing="s">
        <kor-card flat grid-cols="10">
          <kor-input id="messageInput" style="width: 320px;" condensed="true" type="text" ></kor-input>
        </kor-card>
        <kor-card flat grid-cols="2">
          <kor-button @click="${this._sendMessage}" icon="send" color="Secondary"></kor-button>
        </kor-card>
      </kor-grid>
    `;
  }
}
customElements.define('message-input', MessageInput);
