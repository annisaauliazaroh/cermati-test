Feature: Search and filter products on eBay

  Scenario: Access a Product via category after applying multiple filters
    Given I open the eBay homepage
    When I navigate to shop by category
    And I navigate to "Cell phones & accessories" in "Electronics" category
    And I filter by "Cell Phones & Smartphones"
    And I navigate to "All Filters" in list filter
    And I apply filters "1000000" to "5000000" in "Price" and "New" in "Condition" and for location "Asia" in "Item location"
    Then I verify the filters are applied

  Scenario: Access a Product via Search
    Given I open the eBay homepage
    When I search for "MacBook" in "Computers/Tablets & Networking"
    Then I verify the search results contain "MacBook"