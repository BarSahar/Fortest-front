import { User } from './user.js';

export class UserColorManager {

  static colorConstants = [
    "#36B3E5",
    "#5FABBF",
    "#B2CCCF",
    "#FF996B",
    "#F6BEB7",
    "#FDB68F",
    "#FF7A2A",
    "#E3DB72",
    "#71D778",
    "#D3E761",
    "#A1E4D6",
    "#00BD9B",
    "#00BBB0",
    "#C0C0C0",
    "#f0f8ff",
    "#faebd7"
  ]

  static nonRepeatIndex = 16;
  static initIndex = 16;


  static getUsers() {
    let users = sessionStorage.getItem('users');
    if (!users) {
      return [];
    }
    
    return JSON.parse(users);
  }
  
  static suedoRandomColor() {
    if (this.nonRepeatIndex == 1) {
      this.nonRepeatIndex = this.initIndex;
    }

    let randomIndex = Math.floor(Math.random() * this.nonRepeatIndex);
    let randomColor = this.colorConstants[randomIndex];
    this.colorConstants[randomIndex] = this.colorConstants[this.nonRepeatIndex-1];
    this.colorConstants[this.nonRepeatIndex-1] = randomColor;

    this.nonRepeatIndex--;
    return randomColor;
  }

  static setUserColor(userName) {
    let users = sessionStorage.getItem('users');
    if (!users) {
      users = {};
    } else {
      users = JSON.parse(users);
    }

    let color = this.suedoRandomColor();
    users[userName] = color;
    sessionStorage.setItem('users', JSON.stringify(users));
    
    return color;
  }

  static getUserColor(userName) {
    if (userName == User.sysBot.name) {
      return User.sysBot.color;
    }

    let users = sessionStorage.getItem('users');
    if (!users) {
      return this.setUserColor(userName);
    }
    
    users = JSON.parse(users);
    if (!users.hasOwnProperty(userName)) {
      return this.setUserColor(userName);
    }

    return users[userName];
  }
}