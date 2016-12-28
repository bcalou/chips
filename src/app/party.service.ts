import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Party } from './party/party';
import { Item } from './item/item';
import { RandomService } from './random.service';
import { UserService } from './user.service';

@Injectable()
export class PartyService {
  constructor(
    private af: AngularFire,
    private randomService: RandomService,
    private userService: UserService
  ) { }

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
    let party = new Party(this.randomService.generateId(), title);

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

    item.setUser(this.userService.getBasicUser());
    item.beforeSave();

    category.items[this.randomService.generateId()] = item;
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
}
