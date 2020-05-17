import { LitElement, html, css } from 'lit-element';
import { User } from './user';
import { UserColorManager } from './user-colors';


export class UserList extends LitElement {
  static get properties() {
    return {
      users: {type: Object}
    };
  }

  constructor() {
    super();
    this.users = UserColorManager.getUsers();
    this.users[User.sysBot.name] = User.sysBot.color;
  }

  static get styles() {
    return [
      css`
        :host {
          margin: 0 auto;
          width: 400px;
        }
        
        .userDiv {
          padding: 8px;
        }
      `
    ]
  }

  render() {
    return html`
      <kor-grid columns="1" rows="10">
        <kor-card grid-rows="2">
        <kor-empty-state label="Users" icon="face"></kor-empty-state>
        </kor-card>
        <kor-card grid-rows="8">
          <div class="userDiv"></div>
          ${Object.keys(this.users).map(
            name => html`
              <kor-avatar label="${name}" style="background-color:'${this.users[name]}'"></kor-avatar>
            `
          )}
        </kor-card>
      </kor-grid>
    `;
  }
}

customElements.define('user-list', UserList);
