import { SSDCPage } from './app.po';

describe('ssdc App', () => {
  let page: SSDCPage;

  beforeEach(() => {
    page = new SSDCPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
