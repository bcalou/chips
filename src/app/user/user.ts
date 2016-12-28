import { ReflectiveInjector } from '@angular/core';
import { RandomService } from '../random.service';

export class User {
  public id: string;
  public name: string;

  constructor(name: string) {
    let randomService = new RandomService();
    this.id = randomService.generateId(12);
    this.name = name;
  }

  getId() {
    return this.id;
  }
}