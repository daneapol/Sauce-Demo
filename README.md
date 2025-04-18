# Sauce Demo Web Automation Tests

This project contains end-to-end automated tests for the [Sauce Demo](https://www.saucedemo.com/) web application using `CodeceptJS` and BDD-style `.feature` files.


## Getting Started

### 1. Clone the repository

git clone https://github.com/daneapol/Sauce-Demo.git
cd Sauce-Demo

### 2. Install dependencies

npm install

### 3. Run the tests

npx codeceptjs run

### To run specific features

npx codeceptjs run --grep "Standard user removes one item before completing order"
npx codeceptjs run --grep "Problem user adds one item to cart"
npx codeceptjs run --grep "Standard user sorts items by name in ascending order"
npx codeceptjs run --grep "Standard user completes checkout"
