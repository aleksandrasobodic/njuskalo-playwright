import { Page } from '@playwright/test';


// Accept cookies if the popup appears
export async function acceptCookies(page: Page) {
    const popup = page.locator('div.didomi-popup-container[role="dialog"]');

    try {
        await popup.waitFor({ state: 'visible', timeout: 10000 });
        const buttonsContainer = popup.locator('div.didomi-buttons');
        const acceptButton = buttonsContainer.locator('button#didomi-notice-agree-button');
        await acceptButton.scrollIntoViewIfNeeded();
        await acceptButton.click();
        await popup.waitFor({ state: 'detached', timeout: 5000 });
    } catch {
        console.log('Cookie popup has not appeared.');
    }
    const input = page.locator('input[name="keywords"]');
    await input.waitFor({ state: 'visible', timeout: 10000 });
}


// Search for a term "Audi/BMW", click on "Kategorije", and select "Audi/BMW", check URL contains "audi/bmw"
export async function selectCategory(page: Page, name: string) {
    await page.getByRole('button', { name: 'Kategorije' }).click();
    await page.locator('ul.items li.categories.item span.text', { hasText: new RegExp(`^${name}$`, 'i') }).click();
}


// Filter cars manufactured between minYear and maxYear
export async function selectYearRange(page: Page, minYear: number, maxYear: number) {
    await page.selectOption('select[name="yearManufactured[min]"]', String(minYear));
    await page.selectOption('select[name="yearManufactured[max]"]', String(maxYear));
}


// Filter cars with mileage below maxMileage
export async function setMileage(page: Page, maxMileage: number) {
    await page.fill('input[name="mileage[max]"]', String(maxMileage));
}