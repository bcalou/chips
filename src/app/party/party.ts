import { categories } from '../categories';

export class Party {
  private id: string;
  private title: string;
  private categories: Object = categories;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }

  getId() {
    return this.id;
  }
}