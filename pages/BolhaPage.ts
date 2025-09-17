import { Page, expect } from "@playwright/test";
import { acceptCookies, selectCategory, selectYearRange, setMileage } from '../helpers/helpers';

export class BolhaPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('https://www.bolha.com/');

        // From helpers.ts - accept cookies
        await acceptCookies(this.page);
    }

    // Search for a term "BMW", click on "Kategorije", and select "BMW", check URL contains "bmw"
    async search(term: string) {
        const input = this.page.locator('input[name="keywords"]');
        await input.fill(term, { timeout: 5000 });

        // From helpers.ts - select category
        await selectCategory(this.page, term);
        await expect(this.page).toHaveURL(new RegExp(term, 'i'));
    }

    async applyFilters(minYear: number, maxYear: number, maxMileage: number) {
        await selectYearRange(this.page, minYear, maxYear);
        await setMileage(this.page, maxMileage);
    }
}