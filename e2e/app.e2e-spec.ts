import { ChipsPage } from './app.po';

describe('chips App', function() {
  let page: ChipsPage;

  beforeEach(() => {
    page = new ChipsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
