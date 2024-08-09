const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I open the eBay homepage', async () => {
  await browser.url('https://www.ebay.com');
});

When ('I navigate to shop by category', async() => {
  const shopByCategoryButton = await $('#gh-shop-ei');
  await shopByCategoryButton.click();
});

When('I navigate to {string} in {string} category', async (category, mainCategory) => {
    const mainCatElement = await $(`//a[contains(text(), "${mainCategory}")]`);
    const exists = await mainCatElement.isExisting();
    assert(exists, `Category containing text "${mainCategory}" should exist.`);
    const catElement = await $(`//a[contains(text(), "${category}")]`);
    await catElement.click();
});

When('I filter by {string}', async (subCategory) => {
  const subCatElement = await $(`//a[contains(text(), "${subCategory}")]`);
  await subCatElement.click();
});

When('I navigate to {string} in list filter', async (listFilter) => {
  const listFilterElement = await $(`//button[contains(text(), "${listFilter}")]`);
  await listFilterElement.click();
});

When('I apply filters {string} to {string} in "Price" and {string} in "Condition" and for location {string} in "Item location"', async (minPrice, maxPrice, condition, itemLocation) => {  
    const filterPopup = await $('#refineOverlay');
    await filterPopup.waitForDisplayed();

    // Apply Condition filter
    const conditionFilter = await $('[data-aspecttitle="LH_ItemCondition"]');
    await conditionFilter.scrollIntoView();
    await conditionFilter.click();
    const listConditionFilter = await $('//div[contains(@class, "x-overlay__sub-panel")]');
    await listConditionFilter.waitForDisplayed();
    const listCondition = await $(`//span[contains(@class, "cbx x-refine__multi-select-cbx") and contains(text(), "${condition}")]`);
    await listCondition.scrollIntoView();
    await listCondition.click();
    
    // Apply Price filter
    const priceFilter = await $('[data-aspecttitle="price"]');
    await priceFilter.click();
    const minPriceInput = await $('input[aria-label="Minimum Value, US Dollar"]');
    await minPriceInput.setValue(minPrice);
    const maxPriceInput = await $('input[aria-label="Maximum Value, US Dollar"]');
    await maxPriceInput.setValue(maxPrice);

    // Apply Item location filter
    const itemLocationFilter =await $('[data-aspecttitle="location"]');
    await itemLocationFilter.click();
    const listLocation = await $(`input[value= "${itemLocation}"]`);
    await listLocation.click();
  
    // Apply filters
    const applyButton = await $('button[aria-label="Apply"]');
    await applyButton.click();
});

Then('I verify the filters are applied', async () => {
  const appliedFilters = await await $(`//span[contains(@class, "brm__flyout__btn-label") and contains(text(), "3 filters applied")]`);
  await appliedFilters.click();

  const conditionFilterTag = await $('//span[contains(text(), "Condition: New")]');
  const priceFilterTag = await $('//span[contains(text(), "Price: $1,000,000.00 to $5,000,000.00")]');
  const locationFilterTag = await $('//span[contains(text(), "Item Location: Asia")]');

  assert(await conditionFilterTag.isExisting(), 'Condition filter tag is not applied');
  assert(await priceFilterTag.isExisting(), 'Price filter tag is not applied');
  assert(await locationFilterTag.isExisting(), 'Item location filter tag is not applied');
});

When('I search for {string} in {string}', async (searchString, searchCategory) => {
  const searchInput = await $('input[type="text"][aria-label="Search for anything"]');
  await searchInput.setValue(searchString);
  const categorySelect = await $('select[aria-label="Select a category for search"]');
  await categorySelect.selectByVisibleText(searchCategory);
  const searchButton = await $('#gh-btn');
  await searchButton.click();
});

Then('I verify the search results contain {string}', async (searchString) => {
  const firstResultTitle = await $('li.s-item.s-item__pl-on-bottom:nth-child(2)').getText();
  assert(firstResultTitle.includes(searchString));
});
