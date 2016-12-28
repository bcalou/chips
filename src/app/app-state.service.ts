import { Injectable } from '@angular/core';
import { Category } from './category/category';

@Injectable()
export class AppStateService {
  private openCategories: Array<string> = [];

  constructor() { }

  // Check if given category is among the open categories
  categoryIsOpen(category: Category) {
    return this.openCategories.indexOf(category.id) > -1;
  }

  // Open or close a category and return true if category is now open
  toggleCategory(category: Category) {
    if(this.categoryIsOpen(category)) {
      this.openCategories.splice(this.openCategories.indexOf(category.id), 1);

      return false;
    } else {
      this.openCategories.push(category.id);

      return true;
    }
  }
}
