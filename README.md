# Game On!


## Project Summary

**Project Context**

Game On! is a mobile-responsive open platform for vendors to put up their boardgame listings and for customers to browse and purchase boardgames from.

**Site Owner Goals**

As the developer of the site, I aim to create an easy-to-use website for both vendors and customers by incorporating features that cater to their needs. For the vendors, they are able to create, update, and delete their listings as well as check the orders that are placed for their listings. For the customers, they are able to browse the boardgames and add them to their cart for checkout. They will also be able to view their order history.

**User Goals**

There are two types of users for this website: vendors and customers. The aim of vendors is to post their boardgames listing and see records of their orders easily. The aim of customers is to browse the boardgames, add their items to cart and checkout easily.



**Logical Schema Diagram for Game On!**
<img src='./public/logical_schema_boardgames.png' style='display:block'><br>



## UX/UI

### **Stategy**

_Site Owner_
* Objectives:
    - Provide an online alternative for people to sell and buy boardgames
    - Integrate my knowledge of MySql, Express (NodeJs) and React Hook to build features (e.g. CRUD) to meet the needs of both vendors and customers in the context of an e-commerce site

_User_

For vendors: 
* Objective: To further expand their business by selling boardgames online

* Needs: An online platform to post their boardgames listing and track orders made to their listing

* Demographics:
    * Business owners for who owns a warehouse or shop for boardgames

* Pain point: Customers are usually limited to those who come down to the physical stores

For customers:
* Objective: To buy boardgames online at a competitive price

* Needs: A platform to browse the boardgames, add their games to cart and checkout via secure payment

* Demographic: 
    * People who are interested in boardgames
    * People who prefer the convenience of online shopping

* Pain point: 
    * Inconvenient to travel to physical store to buy boardgames
    
    * Difficulty comparing prices of games across different shops

User Stories | Acceptance Criteria(s)
------------ | -------------
As a vendor who is looking to sell my boardgames, I want to create, update, and delete my listings so that I have the flexibility to sell more than one game and keep their information up to date. | Feature that provides CRUD for game listings
As a vendor who is looking to track the state of my products (e.g. stocks left), I want to view the details of each transaction made for my games so I can refer to these order receipt for future audit purposes. | Feature that display order history
As a customer who is looking to buy boardgames, I want to view the details of each game so that I can understand what the game is about.| Master details view for game listings
As a customer who is buying boardgames, I want to be able to add multiple games to my cart so I can buy more than one games in a single checkout.| Feature that allow users to add games to cart, change quantity of cart items
As a customer who might not want to make purchase immediately, I want to be able to save my items in a cart so that I can make payment for them in the future.| Allow customers to create an account to store their details and cart items
As a customer who want to search for a particular game, I want to be able to search for a game from specific categories so that I can narrow down to the results that I want quickly.| Feature that allow users to search and filter for specific games

### **Scope**

_Functional Specifications_
* Create, read, update, delete game listings

* Create, read, update, delete orders

* Create, read, update, delete cart items

* Create, read, update user account information 

* Search and filter game listings and orders

* Make payment through Stripes

* Routes are protected (require user authentication)


_Content requirements_
* Details about game listings

* Details about order transaction

* Details about cart items

* Details about latest transaction

* Profile details about users (e.g. email, address, contact number, password)


_Non-functional requirements_
* Mobile responsiveness
    * Achieved via the use of bootstrap media queries,bootstrap grid columns, and flex box

* Performance

### **Structure**

_Vendor Sitemap_
<br>
<img src='./public/vendor_sitemap.png'><br>

_Customer Sitemap_
<br>
<img src='./public/customer_sitemap.png'><br>


### **Skeleton**

_Vendor Site Mockup_
<img src='./public/vendor_boardgames_mockup.png'><br>

_Customer Site Mockup_
<img src='./public/customer_boardgames_mockup.png'><br>


### **Surface**

_Background Design_
* Wood background design is used on the customer’s site to bring about a warm and cozy feeling that is associated with playing boardgames. 

_Colours_
* Warm colors are mostly used to fit the wood theme on the customer’s site

_Font Choice_
* Boardgames are associated with fun so for the majority of the website san-serif is used to give a more casual feeling and improves readability. Some page headers are in serif for aesthetic purposes.


## Features

_For Users_

1. Users can create, view, and update their profile

2.	Users can search and filter the game listings

3.	Users can add games to cart, view their cart, update the game quantity in the cart, and remove games from their cart

4.	Users can make payment via Stripes

5.	Users can view their latest transaction after payment on Stripes is completed or view all their past transactions in the orders page


_For Vendors_

1.	Vendors can create, view, and update their profile

2.	Vendors can create, view, update, and delete their game listings

3.	Vendors can view, update, and delete their orders

4.	Vendors can search and filter through their game listings

5.	Vendors can search through their orders


_General Features_

1.	Certain page only allows authorized access (e.g. shopping cart, profile page). In other words, users have to sign in to access the page otherwise they would be redirected to the login page to sign in.

2.	Callback feature - Attempts to access an authorized page when not logged in would redirect users to the login page. After user has logged in, they will be redirected back to the page that they were trying to access previously.

3.	All forms are properly validated using both Caolan form validators. and back-end validation



## Testing

**Testing for Mobile Responsiveness**

 * Testing was done using chrome developer tool across iPhone X, iPad Pro, and 13-inch MacBook Air

## Technologies Used
* HTML5
    * To create import CDN for Bootstrap and Font Awesome
* CSS3
    * To style various elements throughout the web app
* JavaScript
    * To include interactive elements throughout the web app

* [React](https://reactjs.org/)
    * To create a single page application by using React Hooks

* [Bootstrap v5.0.1](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
    * For offcanvas, alerts, navbar templates

* [Git](https://git-scm.com/)
    * For version control

* [GitHub](http://github.com)
    * To create repository and store source code

* [Balsamiq Mockups 3](https://balsamiq.com/)
    * To create mockups

* [app.diagrams.net](https://app.diagrams.net/)
    * To create site map

* [SqlDBM](https://sqldbm.com)
    * To create Logical Schema Diagram

* [Heroku](https://id.heroku.com/login)
    * To enable access to database

* [Netlify](https://www.netlify.com/)
    * To deploy React application

* [Google Font](https://fonts.google.com/)
    * To select font families used for web app 



## Deployment

The web app is hosted using Heroku (for Express NodeJS) and Netlify (for React).

**Steps to deployment using Heroku**


**Steps to deployment using Netlify**
1. Check that in the terminal, the current working directory can list the package.json file for the React application.
2. Build react application using yarn build
3. Download the build folder and agree to grant permissions when prompted
4. Log into [Netlify](https://www.netlify.com/) 
5. Click on "Sites" and drag the downloaded build folder into the upload box
6. Deployment of App to Netlify is completed


## Dependencies

* [MySQL](https://www.mysql.com)
    * To store data

* [PostgreSQL](https://www.postgresql.org/)
    * To store data

* [Axios](https://cdnjs.com/libraries/axios)
    * To call API

## Credits

* Hero image


* Brand logo 



* Deployment steps
    * Extracted and edited based on TGC's deployment guide for [Netlify](https://docs.google.com/document/d/1cquGsm1x8Tm2vzcJcAxQdnCe_BxF9b9z34vQEJ6-K7E/edit?usp=sharing)
