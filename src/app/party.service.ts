import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/first';
import { Party } from './party/party';
import { Item } from './item/item';
import { UserService } from './user.service';

@Injectable()
export class PartyService {
  private letters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  constructor(private af: AngularFire, private userService: UserService) { }

  // Fetch a party based on its id
  get(id: number) {
    return this.af.database.list('/parties', {
      query: {
        orderByChild: 'id',
        equalTo: id
      }
    });
  }

  // Create a party
  create(title: string) {
    let party = new Party(this.generateId(), title);

    return new Promise((resolve, reject) => {
      this.af.database.list('/parties').push(party).then(() => {
        resolve(party);
      });
    });
  }

  // Add an item to a category
  addItem(party: Party, category: any, item: Item) {
    let key = this.getItemsListKey(party, category);

    if(!category.items) {
      category.items = {};
    }

    item.setUser(this.userService.getUserName());
    category.items[this.generateId()] = item;
    this.af.database.list('/parties').update(key, category.items);
  }

  // Remove an item from a category
  removeItem(party: Party, category: any, item: Item) {
    let key = this.getItemsListKey(party, category);

    for(let itemKey of Object.keys(category.items)) {
      if(category.items[itemKey] == item) {
        key = key + '/' + itemKey;
      }
    }

    this.af.database.list('/parties').remove(key);
  }

  // Get the firebase key of an items list
  getItemsListKey(party: Party, category: any) {
    return party['$key'] + '/categories/' + category.id + '/items';
  }

  // Generate a unique party id
  generateId() {
    let id = '';
    for(let i = 0; i < 6; i++) {
      id = id + this.letters[Math.floor(Math.random()*this.letters.length)];
    }

    return id;
  }
}
