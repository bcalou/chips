import { Component, OnInit, Input,Output, EventEmitter,
         ViewChild, ElementRef, HostBinding } from '@angular/core';
import { Item } from '../item/item';
import { PartyService } from '../party.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @Output() removeItem: EventEmitter<any> = new EventEmitter();
  @Input() category: any;
  @ViewChild("newItemInput") newItemInput: ElementRef;
  @HostBinding('class.category--open') open: boolean = false;
  private newItem: Item = new Item();
  private userIsIdentified: boolean;
  private waitingForFocus: boolean; 

  constructor(
    private partyService: PartyService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.watchUserIdentification();
  }

  // Wait for user identification
  watchUserIdentification() {
    this.userService.getUserIdentificationEvents().subscribe(null, null, () => {
      this.userIsIdentified = true;

      if(this.waitingForFocus) {
        this.focusOnNewItemInput();
      }
    });
  }

  // Handle item creation form submission
  submitItem() {
    this.addItem.emit({item: this.newItem});
    this.newItem = new Item();
  }

  // Remove an item from the category
  onRemoveItem(item: Item) {
    this.removeItem.emit({item: item});
  }

  // Ask for user identification
  identifyUser() {
    this.waitingForFocus = true;
    this.userService.identifyUser();
  }

  // Focus on new item field
  focusOnNewItemInput() {
    setTimeout(() => {
      this.newItemInput.nativeElement.focus()
    });
  }

  // Get number of items inside category
  getItemsLength() {
    return Object.keys(this.category.items).length;
  }

  toggle() {
    this.open = !this.open;
  }
}
