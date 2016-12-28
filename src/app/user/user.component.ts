import { Component, OnInit, HostBinding, ViewChild,
         ElementRef } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: '[appUser]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @HostBinding('class.user--visible') visible: boolean = false;
  @ViewChild("userNameInput") userNameInput: ElementRef;
  private userName: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getIdentificationSubject().subscribe({
        next: () => { this.showComponent() },
        error: () => {},
        complete: () => { this.hideComponent() }
    });
  }

  // Show the component and focus on the main field
  showComponent() {
    this.visible = true;

    setTimeout(() => {
      this.userNameInput.nativeElement.focus()
    });
  }

  // Hide the component
  hideComponent() {
    this.visible = false;
  }

  // Save user identify
  saveUserIdentity() {
    this.userService.saveUserIdentity(this.userName);
  }
}
