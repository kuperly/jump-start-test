# Selt Implemation

Add new order functionality that connected new order to existing customer.

## components added:

1. NewOrderComponent - (route: orders/new-order) - new
* allow only for authnticate user
* handle proccess of insert new order for existing costumer.

2. OrderSummery - new
* table that present costumer order summary befor submit the order.

3. orders - endpoint (post)
* endpoint that handling new order request in server site.
* save order into costumer object as long session is running.

3. products - endpoint (get)
* recieved all existing products in my site.
* used in NewOrderComponent for present user all existing products. 

One of my main problem I ran into was to build a unit test, I made some reserach for make it work.


## Running the Application locally with Node.js

1. Install the latest LTS version of Node.js from https://nodejs.org. *IMPORTANT: The server uses ES2015 features AND the Angular CLI so you need a current version of Node.js.*

1. Run `npm install` to install app dependencies

1. Run `ng build --watch` to build and bundle the code

1. Run `npm start` in a separate terminal window to build the TypeScript, watch for changes and launch the web server

1. Go to http://localhost:8080 in your browser 

## Running Unit test (for NewOrderComponent only!)

1. Run `ng test`


