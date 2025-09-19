import { Page, expect } from '@playwright/test';
import { acceptCookies, fillSearchInput, selectCategory, selectYearRange, setMileage } from '../helpers/helpers';

export class NjuskaloPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('https://www.njuskalo.hr/');
        // From helpers.ts - accept cookies
        await acceptCookies(this.page);
    }


    // Search for a term "Audi", click on "Kategorije", and select "Audi", check URL contains "audi"
    async search(term: string) {
        // From helpers.ts - simulate human typing
        await fillSearchInput(this.page, term);
        // From helpers.ts - select category
        await selectCategory(this.page, term);
        // Check URL contains the term (case insensitive)
        await expect(this.page).toHaveURL(new RegExp(term, 'i'));
    }


    // Apply filters: year range and mileage
    async applyFilters(minYear: number, maxYear: number, maxMileage: number) {
        await selectYearRange(this.page, minYear, maxYear);
        await setMileage(this.page, maxMileage);
    }
}