import { ReflectiveInjector, Injectable, Inject } from '@angular/core';
import { UserService } from '../user.service';

@Injectable()
export class Item {
  private title: string;
  private user: Object;
  private timestamp: number;

  setUser(user: Object) {
    this.user = user; 
  }

  // Set timestamp and other useful things before saving
  beforeSave() {
    this.timestamp = Date.now();
  }
}
