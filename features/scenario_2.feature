Feature: Web automation tests

    Scenario: Problem user adds one item to cart
        Given I log in as "problem_user" with password "secret_sauce"
        Then I should be in the inventory page
        When I click on item "Test.allTheThings() T-Shirt (Red)"
        Then I should be in the item page
        When I click on the 'Add to Cart' button
        And I go to the cart page
        Then I should be in the cart page
        And I should see the item added to cart
        