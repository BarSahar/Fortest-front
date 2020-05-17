
export class User {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  static get sysBot() {
    return new User('System Bot', 'white');
  }
}