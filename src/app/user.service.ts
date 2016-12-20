import { Injectable, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class UserService {
  private userIdentificationMethod: any;
  private userIdentified: EventEmitter<any>;

  constructor() {
    this.createIdentificationEventEmitter();
  }

  // Create identification event emitter
  createIdentificationEventEmitter() {
    this.userIdentified = new EventEmitter();

    if(Cookie.get('userName') != null) {
      this.userIdentified.complete();
    }
  }

  // Check if user informations exist
  userIsIdentified() {
    return this.userIdentified;
  }

  // Register the user method for future triggering
  registerUserIdentificationMethod(
    userIdentificationMethod: any,
    context: Object
  ) {
    this.userIdentificationMethod = userIdentificationMethod.bind(context);
  }

  // Trigger the registered user component
  identifyUser() {
    try {
      this.userIdentificationMethod.call();
    } catch(e) {
      console.error(e);
    }
  }

  // Save user identify
  saveUserIdentity(userName: string) {
    Cookie.set('userName', userName, 365);
    this.userIdentified.complete();
  }

  // Get the user name
  getUserName() {
    return Cookie.get('userName');
  }
}
