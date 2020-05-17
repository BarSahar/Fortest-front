import { LitElement, html, css } from 'lit-element';
import './message-list';
import './landing-page';
import './user-list';

class MainPage extends LitElement {
  static get properties() {
    return {
      loggedIn: {type: Boolean},
      currUser: {type: String},
      currPage: {type: String}
    };
  }

  constructor() {
    super();
    this.loggedIn = false;
    this.currPage = 'message-list';
  }

  _login(e) {
    const { text } = e.detail;
    
    this.currUser = text;
    this.loggedIn = true;
    this._clearPreviousSession();
  }

  _clearPreviousSession() {
    sessionStorage.removeItem("messages");
    sessionStorage.removeItem("users");
  }

  _navTo(e) {
    const pageId = e.target.id;
    this.currPage = pageId;
  }

  static get styles() {
    return [
      css`
        :host {
          margin: 0 auto;
          width: 400px;
        }
  
        .app-footer {
          color: #a8a8a8;
          font-size: calc(10px + 0.5vmin);
        }
       `,
    ];
  }

  render() {
    if (!this.loggedIn) {
      return html`
        <kor-page>
          <kor-app-bar slot="top" label="Chat Bot 9000"></kor-app-bar>
          <landing-page @register-user="${this._login}"></landing-page>
          <kor-nav-bar slot="bottom">
            <kor-tabs style="justify-content: center">
              <p class="app-footer">
                  Made with data structures and algorithms by
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/barsahar">Bar Sahar</a>.
              </p>
            </kor-tabs>
          </kor-nav-bar>
        </kor-page>
      `
    }
    return html`
      <kor-page>
        <kor-app-bar slot="top" label="Chat Bot 9000"></kor-app-bar>
        ${this.currPage == 'message-list' ? 
        html`<message-list .currUser=${this.currUser} ></message-list>`
        :
        html`<user-list></user-list>`
        }
        <kor-nav-bar slot="bottom">
          <kor-tabs style="justify-content: center">
            <kor-tab-item @click="${this._navTo}" icon="message" id="message-list" active></kor-tab-item>
            <kor-tab-item @click="${this._navTo}" icon="supervisor_account" id="user-list"></kor-tab-item>
          </kor-tabs>
        </kor-nav-bar>
      </kor-page>
    `
  }
}

customElements.define('main-page', MainPage);
