import { Injectable } from '@angular/core';

@Injectable()
export class RandomService {
  private letters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  constructor() { }

  // Generate a random id
  generateId(length: number = 6) {
    let id = '';
    for(let i = 0; i < length; i++) {
      id = id + this.letters[Math.floor(Math.random()*this.letters.length)];
    }

    return id;
  }
}
