import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartyService } from '../party.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  title: string;

  constructor(
    private router: Router,
    private partyService: PartyService,
    private userService: UserService
  ) {}

  ngOnInit() {
  }

  // Creation form submission handler
  onSubmit() {
    this.partyService.create(this.title).then((party) => {
      this.redirectToParty(party);
    });
  }

  // Redirect to the party page
  redirectToParty(party: any) {
    this.router.navigate(['/party', party.getId()]);
  }
}
