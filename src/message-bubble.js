import { LitElement, html, css } from 'lit-element';

export class MessageBubble extends LitElement {
  static get properties() {
    return {
      authorName: { type: String },
      authorColor: { type: String },
      text: { type: String },
      timeStamp: { type: String },
      last: { type: Boolean }
    };
  }

  constructor(authorName, authorColor, text, timeStamp, last) {
    super();
    this.authorName = authorName;
    this.authorColor = authorColor;
    this.text = text;
    this.timeStamp = timeStamp;
    this.last = last;
  }

  static get styles() {
    return [
      css`
      .message-frame {
        border: 1px solid #ccc;
        border-radius: 16px;
        margin-bottom: 15px;
        border-radius: 22px;

        width: fit-content;
        max-width: 345px;
        padding: 3px;
        padding-right: 18px;
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .animateLast {
        animation:  pulse 0.5s;
      }

      @keyframes pulse {
        0% {
          transform: scale(1)
        }
        20% {
          transform: scale(1.1)
        }
        100% {
          transform: scale(1)
        }
      }
      `
    ];
  }

  render() {
    return html`
    <div class="message-frame ${this.last ? 'animateLast' : ''}" style="background-color: ${this.authorColor};">
      <kor-avatar label="${this.authorName}" info="${this.text}"></kor-avatar>
    </div>
    `;    
  }
}
customElements.define('message-bubble', MessageBubble);
