import { LitElement, html, css } from 'lit-element';
import { MessageBubble } from './message-bubble';
import { User } from './user';
import { UserColorManager } from './user-colors';
import './message-input.js';


class MessageList extends LitElement {
  static get properties() {
    return {
      currUser: { type: String },
      messages: { type: Array },
      socket: { type: Object }
    };
  }

  constructor() {
    super();
    this.messages = this._getStoredMessages();
    this.socket = io('http://localhost:3000');
    this.socket.on('chat message', (msg) => {this._printNewMessage(msg)});
    this.socket.on('bot message', (msg) => {this._printBotMessage(msg)});
    this.socket.on('new user', (user) => {this._printAndAddNewUser(user)});
  }

  _getStoredMessages() {
    let messages = sessionStorage.getItem('messages');
    if (!messages) {
      return [];
    }
    
    return JSON.parse(messages);
  }

  _storeMessages() {
    sessionStorage.setItem('messages', JSON.stringify(this.messages));
  }

  _broadcastMessage(e) {
    const {text, timestamp} = e.detail;
    
    this.socket.emit('chat message',
       {text: text, author: this.currUser, timestamp: timestamp}
    );
  }

  _printBotMessage(msg) {
    msg.author = User.sysBot.name;
    this._printNewMessage(msg);
  }

  _printNewMessage(msg) {
    if (this.messages.length > 0) {
      this.messages[this.messages.length-1].last = false;
    }

    const {text, author, timestamp} = msg;
    let color = UserColorManager.getUserColor(author);
    let realAuthor = author === this.currUser ? "You" : author;
    let newMessage = new MessageBubble(realAuthor, color, text, timestamp, true);
    
    this.messages = [...this.messages, newMessage];
    this._storeMessages();
  }

  _printAndAddNewUser(msg) {
    let text = 'new user has joined the chat: ' + msg.text;
    UserColorManager.setUserColor(msg.text);
        
    let newMsg = {text: text, author: User.sysBot.name, timestamp:msg.timestamp}
    this._printNewMessage(newMsg)
  }

  static get styles() {
    return [
      css`
        :host {
          margin: 0 auto;
          width: 400px;
        }

        .messageDiv {
          display: flex;
          flex-direction: column;
        }
        `
    ]
  }

  render() {
    return html`
      <kor-grid columns="1" rows="10">
        <kor-card grid-rows="1" image="">
          <kor-text size="header-1">Hi ${this.currUser}!!</kor-text>
        </kor-card>
        <kor-card grid-rows="8">
          <div class="massageDiv">
            ${this.messages.map(
              msg => html`
                <message-bubble .authorColor=${msg.__authorColor} .authorName=${msg.__authorName} .text=${msg.__text} .last=${msg.__last}></message-bubble>
                  `
            )}
          </div>
        </kor-card>
        <kor-card grid-rows="1">
          <message-input
            @sent-message="${this._broadcastMessage}">
          </message-input>
        </kor-card>
      </kor-grid>
    `;
  }
}

customElements.define('message-list', MessageList);
