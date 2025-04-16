Feature: Web automation tests

    Scenario: Standard user removes one item before completing order
        Given I log in as "standard_user" with password "secret_sauce"
        Then I should be in the inventory page
        When I add all items to the cart
        Then the number of items should match the cart count
        When I go to the cart page
        Then I should be in the cart page
        When I remove the "third" item from the cart
        Then the number of items should match the cart count
        When I proceed to checkout
        Then I should be in the checkout page with information fields
        When I submit customer information with first name "Daniel", last name "Apolonio", and postal code "1700"
        Then I should be in the checkout overview page
        And the listed items should match the items in the cart
        When I finish the checkout
        Then I should see the order confirmation message