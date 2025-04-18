Feature: Web automation tests

    Scenario: Standard user sorts items by name in ascending order
        Given I log in as "standard_user" with password "secret_sauce"
        Then I should be in the inventory page
        When I sort items by "name" in "ascending" order
        Then the items should be sorted by "name" in "ascending" order

        # We can also sort by "price". The order can also be "descending".