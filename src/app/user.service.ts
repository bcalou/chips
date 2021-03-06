import { Injectable, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable, Subject } from 'rxjs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { RandomService } from './random.service';
import { User } from './user/user';

@Injectable()
export class UserService {
  private identificationSubject: Subject<any>;
  private user: User;

  constructor(private af: AngularFire) {
    this.identificationSubject = new Subject();

    if(this.userIsIdentified()) {
      this.fetchUser();
    }
  }

  getUser() {
    return this.user;
  }

  // Return the identification subject to watch identification process
  getIdentificationSubject() {
    return this.identificationSubject;
  }

  // Check if user informations exist
  userIsIdentified() {
    return Cookie.get('userId') != null;
  }

  // Ask for user identification if needed
  identifyUser() {
    this.identificationSubject.next(false);

    return this.identificationSubject;
  }

  // Wait for user identification
  waitForIdentification() {
    return this.identificationSubject;
  }

  // Save user identify
  saveUserIdentity(userName: string) {
    this.user = new User(userName);
    Cookie.set('userId', this.user.getId(), 365, '/');

    this.af.database.list('/users').push(this.user).then(() => {
      this.identificationSubject.next(true);
    });
  }

  // Fetch user
  fetchUser() {
    this.af.database.list('/users', {
      query: {
        orderByChild: 'id',
        equalTo: this.getUserId()
      }
    }).subscribe((users) => {
      this.user = users[0];
      this.identificationSubject.next(true);
    });
  }

  // Get a user object reduced to its basic properties
  getBasicUser() {
    return {
      "id": this.user.id,
      "name": this.user.name
    }
  }

  // Get the current user id
  getUserId() {
    return Cookie.get('userId');
  }

  // Update the user
  update() {
    this.identificationSubject.next(false);
  }
}
