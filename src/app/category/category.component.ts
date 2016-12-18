import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../item/item';
import { PartyService } from '../party.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @Input() category: any;
  private newItem: Item = new Item();

  constructor(private partyService: PartyService) { }

  ngOnInit() {
  }

  // Handle item creation form submission
  submitItem() {
    this.addItem.emit({item: this.newItem});
    this.newItem = new Item();
  }
}
