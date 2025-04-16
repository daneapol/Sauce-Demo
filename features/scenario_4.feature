Feature: Web automation tests

    Scenario: Login as locked out user should fail
        Given I log in as "locked_out_user" with password "secret_sauce"
        Then I should be in the inventory page