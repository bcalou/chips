import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css']
})
export class UserWelcomeComponent implements OnInit {
  private user: Object;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.waitForIdentification();
  }

  // Get user one he's identified
  waitForIdentification() {
    this.userService.waitForIdentification().subscribe({
      next: (userIsIdentified) => {
        if(userIsIdentified) {
          this.user = this.userService.getUser()
        }
      }
    });
  }

  // Update user profile
  update() {
    this.userService.update();
  }
}
