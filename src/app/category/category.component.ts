import { Component, OnInit, Input, Output, EventEmitter,
         ViewChild, ElementRef, HostBinding } from '@angular/core';
import { Item } from '../item/item';
import { PartyService } from '../party.service';
import { UserService } from '../user.service';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Output() addItemEvent: EventEmitter<any> = new EventEmitter();
  @Output() removeItemEvent: EventEmitter<any> = new EventEmitter();
  @Input() category: any;
  @HostBinding('class.category--open') open: boolean = false;
  private newItem: Item = new Item();

  constructor(
    private partyService: PartyService,
    private userService: UserService,
    private appStateService: AppStateService
  ) { }

  ngOnInit() {
    this.open = this.appStateService.categoryIsOpen(this.category);
  }

  // Handle item creation form submission
  submitItem() {
    if(this.userService.userIsIdentified()) {
      this.addItem();
    } else {
      this.userService.identifyUser().subscribe({
        next: (userIsIdentified) => {
          if(userIsIdentified) {
            this.addItem();
          }
        }
      });
    }
  }

  // Add item into the category
  addItem() {
    this.addItemEvent.emit({item: this.newItem});
    this.newItem = new Item();
  }

  // Remove an item from the category
  onRemoveItem(item: Item) {
    this.removeItemEvent.emit({item: item});
  }

  // Get number of items inside category
  getItemsLength() {
    return Object.keys(this.category.items).length;
  }

  // Open and close the category
  toggle() {
    this.open = this.appStateService.toggleCategory(this.category);
  }

  // Is the category without item?
  isEmpty() {
    return typeof(this.category.items) == 'undefined'
      || this.category.items.length === 0;
  }
}
