import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[appItem]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Object;
  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  // Remove the item from its category
  onRemove() {
    this.remove.emit();
  }
}
