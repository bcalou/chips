import { ReflectiveInjector } from '@angular/core';
import { UserService } from '../user.service';

export class Item {
  private userService: UserService;
  private title: string;
  private user: string;
  private timestamp: number;

  constructor() {
    let injector = ReflectiveInjector.resolveAndCreate([UserService]);
    this.userService = injector.get(UserService);
  }

  // Set user, timestamp and other useful things before saving
  beforeSave() {
    this.user = this.userService.getUserName();
    this.timestamp = Date.now();
  }
}
