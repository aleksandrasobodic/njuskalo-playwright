import { Page, expect } from '@playwright/test';
import { acceptCookies, selectCategory, selectYearRange, setMileage } from '../helpers/helpers';

export class NjuskaloPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('https://www.njuskalo.hr/');

        // From helpers.ts - accept cookies
        await acceptCookies(this.page);
    }

    // Search for a term "Audi", click on "Kategorije", and select "Audi", check URL contains "audi"
    async search(term: string) {
        await this.page.type('input[name="keywords"]', term, { timeout: 5000 });
        // From helpers.ts - select category
        await selectCategory(this.page, term);
        await expect(this.page).toHaveURL(new RegExp(term, 'i'));
    }

    async applyFilters(minYear: number, maxYear: number, maxMileage: number) {
        await selectYearRange(this.page, minYear, maxYear);
        await setMileage(this.page, maxMileage);
    }
}
