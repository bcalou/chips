import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Party } from './party';
import { PartyService } from '../party.service';
import { Item } from '../item/item';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css'],
  providers: [PartyService]
})
export class PartyComponent implements OnInit {
  private party: Party;
  private subscription: Subscription;
  private url: string;

  constructor(
    private route: ActivatedRoute,
    private partyService: PartyService
  ) {}

  ngOnInit() {
    this.getParty();
    this.url = this.getPageUrl();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Get party based on the url
  getParty() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.partyService.get(params.id).subscribe((parties) => {
          this.party = parties[0];
        });
      }
    );
  }

  // Get current page url
  getPageUrl() {
    let location = document.location;
    return location.host + location.pathname;
  }

  // Add an item to a category
  addItem($event, category) {
    this.partyService.addItem(this.party, category, $event.item);
  }

  // Remove an item from a category
  removeItem($event, category) {
    console.log(this.party, category, $event.item);
    this.partyService.removeItem(this.party, category, $event.item)
  }
}
