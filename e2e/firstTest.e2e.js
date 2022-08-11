/* eslint-env detox/detox, mocha */

/**
 * TODO: Add your automation tests inside this file
 *
 * Example tests you can add:
 * - Test what happens after you press "break the app". It should go into a loading state for a while, and then show the network error screen.
 * - Test filtering
 * - Test swipe to refresh
 * - Find an empty row
 * - Find a specific element that you need to swipe horizontally before you can see it.
 * - Test the modal button
 * ... and others!
 */

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });


  it('should have break the app button', async () => {
    await expect(element(by.id('break_app_button'))).toBeVisible();
  });
/*

*/

  it('should break the app', async () => {
    await element(by.id('break_app_button')).tap();
    await expect(element(by.text('FIX THE APP'))).toBeVisible();
  });

  it('should FIX the app', async () => {
    await element(by.id('break_app_button')).tap();
    await expect(element(by.text('FIX THE APP'))).toBeVisible();
    await element(by.text('FIX THE APP')).tap();
    await expect(element(by.id('break_app_button'))).toBeVisible();
  });

  it('should show modal title after tapping on a video', async () => {
    await element(by.text('Army of Two')).tap();
    await expect(element(by.id('modal_title'))).toBeVisible();
  });

  it('Wait 5 seconds for popup to disappear', async () => {
    await element(by.text('Army of Two')).tap();
    await expect(element(by.id('modal_title'))).toBeVisible();
    await waitFor(element(by.text('El Koala'))).toBeVisible().withTimeout(10000);
  });

  it('Swipe up to reload', async () => {
    await element(by.id('refresh_loader')).swipe('down');
    await expect(element(by.id('loader'))).toBeVisible();
    await waitFor(element(by.text('El Koala'))).toBeVisible().withTimeout(10000);
  });

  it('should show genre list after tapping on All genres', async () => {
    await element(by.text('All genres')).tap();
    await expect(element(by.text('Holiday'))).toBeVisible();
   });

  it('should show chosen genre from the list', async () => {
    await element(by.text('All genres')).tap();
    await expect(element(by.text('Rock'))).toBeVisible();
    await element(by.text('Rock')).tap();
    await element(by.text('El Koala')).tap();
    await expect(element(by.id('modal_title'))).toBeVisible();
   });

  it('should show chosen genre from the list', async () => {
    await element(by.text('All genres')).tap();
    await expect(element(by.text('Rock'))).toBeVisible();
    await element(by.text('Rock')).tap();
    await element(by.text('El Koala')).tap();
    await expect(element(by.id('modal_title'))).toBeVisible();
    await waitFor(element(by.text('El Koala'))).toBeVisible().withTimeout(10000);
   });

 it('should browse between different genre', async () => {
   await element(by.text('All genres')).tap();
   await expect(element(by.text('Rock'))).toBeVisible();
   await element(by.text('Rock')).tap();
   await element(by.text('El Koala')).tap();
   await element(by.id('close_modal_button')).tap();
   await expect(element(by.id('genre_picker'))).toBeVisible()
   await element(by.id('genre_picker')).tap();
   await expect(element(by.text('Country'))).toBeVisible();
   await element(by.text('Country')).tap();
   await element(by.text('Bonfire')).tap()
   await expect(element(by.id('modal_title'))).toBeVisible();
   await expect(element(by.text('Bonfire'))).toBeVisible();
   });
});