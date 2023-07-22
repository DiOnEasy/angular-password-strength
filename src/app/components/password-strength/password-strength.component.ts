import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent {

  password: string;
  strength: number;

  constructor() {
    this.password = ''
    this.strength = 0
  }


  stateMapper: Record<number, string> = {
    3: 'green',
    2: 'yellow',
    1: 'red',
    0: 'gray',
  };

  getColor(i: number): string {
    if (this.strength === 4) {
      return 'red';
    }

    if (i > this.strength) {
      return this.stateMapper[0];
    }

    return this.stateMapper[this.strength];
  }

  calculateStrength(password: string): number {

    const hasLetters: boolean = /[A-zА-я]/.test(password);
    const hasDigits: boolean = /[0-9]/.test(password);
    const hasSymbols: boolean = /[^A-zА-я0-9]/.test(password);

    console.log(hasLetters, hasDigits, hasSymbols)

    if (password.length === 0) {
      return 0
    } else if (password.length < 8) {
      return 4;
    } else if (hasLetters && hasDigits && hasSymbols) {
      return 3;
    } else if ((hasLetters && hasDigits) || (hasDigits && hasSymbols) || (hasLetters && hasSymbols)) {
      return 2;
    } else {
      return 1;
    }
  }

  ngModelChange() {
    this.strength = this.calculateStrength(this.password)
  }

}

