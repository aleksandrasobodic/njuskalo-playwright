import { test, expect } from '@playwright/test';
import { NjuskaloPage } from '../pages/NjuskaloPage';
import { BolhaPage } from '../pages/BolhaPage';
import testData from '../test-data.json';

// Add stealth script before each test to reduce bot detection
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });
});


interface SearchData {
    njuskalo: { term: string; minYear: string; maxYear: string; maxMileage: string };
    bolha: { term: string; minYear: string; maxYear: string; maxMileage: string };
}

const data = testData as SearchData;

test.describe('Search tests for Njuškalo and Bolha', () => {

    // Njuskalo test: search for "Audi", filter by year 2015-2019 and mileage < 200000, check results count > 0
    test('Njuskalo search with filters', async ({ page }) => {
        const njuskalo = new NjuskaloPage(page);

        await njuskalo.goto();
        await njuskalo.search(data.njuskalo.term);
        await njuskalo.applyFilters(
            Number(data.njuskalo.minYear),
            Number(data.njuskalo.maxYear),
            Number(data.njuskalo.maxMileage)
        );
        const results = page.locator('li.EntityList-item article.entity-body');
        const count = await results.count();
        expect(count).toBeGreaterThan(0);
    });


    // Bolha test: search for "BMW", filter by year 2018-2022 and mileage < 100000, check results count > 0
    test('Bolha search with filters', async ({ page }) => {
        const bolha = new BolhaPage(page);

        await bolha.goto();
        await bolha.search(data.bolha.term);
        await bolha.applyFilters(
            Number(data.bolha.minYear),
            Number(data.bolha.maxYear),
            Number(data.bolha.maxMileage)
        );

        const results = page.locator('li.EntityList-item article.entity-body');
        const count = await results.count();
        expect(count).toBeGreaterThan(0);
    });
});