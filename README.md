# Game On!

<img src='./public/multi_device_display.png' style='display:block'><br>


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
    - Integrate my knowledge of MySQL, Express (NodeJs) and React Hook to build features (e.g. CRUD) to meet the needs of both vendors and customers in the context of an e-commerce site

_User_

For vendors: 
* Objective: To further expand their business by selling boardgames online

* Needs: An online platform to post their boardgames listing and track orders made to their listing

* Demographics:
    * Business owners who owns a warehouse or shop for boardgames

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
As a customer who is buying boardgames, I want to be able to add multiple games to my cart so that I can buy more than one game in a single checkout.| Feature that allow users to add games to cart, change quantity of cart items
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
* Boardgames are associated with fun so for the majority of the website, san-serif is used to give a more casual feeling and improves readability. Some page headers are in serif for aesthetic purposes.


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

2.	Callback feature - Attempts to access a restricted page when not logged in would redirect users to the login page. After user has logged in, they will be redirected back to the page that they were trying to access previously.

3.	All forms are properly validated using both Caolan form validators. and back-end validation.

## Limitations and Future Implementations
1. In the future I would like to add a seller page on the customer site so that customer can view all the games that are sold by a specific seller.

2. In the future I would like to add more details to the game listings such as the dimensions of the game product, what the game includes, the game instructions, and more pictures of the game.

3. Currently, customers have to click into the listing details page to check if stock is available. In the future, I would like to show on the home page that stock is unavailable for a particular listing so that they do not have to click on the listing.

4. I would like to implement pagination to limit the number of game listings shown on the home page to improve the page performance.

5. Currently, deleting a game listing would delete the game from all the past orders. In the future, I would like to attempt to use a soft delete for the game listings such that the past orders would still be retained even though customers would no longer see the game listing itself.

6. Currently if a customer tries to purchase a product that does not have enough stock, a general message would popup saying that there is insufficient stock. However it does not specify which product is insufficient and customer would have to check the stock in the listing page themselves. In the future, I would like to specify for which game the stock is insufficient.

7. In the future, I would like to create a service layer to organize codes that are constantly used.

8. In the future, I would like to implement refresh tokens to keep users from being logged out only after a fixed period of time.


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
    * For badges, accordion, alerts, navbar templates

* [Git](https://git-scm.com/)
    * For version control

* [GitHub](http://github.com)
    * To create repository and store source code

* [Gitpod](https://www.gitpod.io)
    * Platform to write code with Express NodeJS and React

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
    * To select font families used for web app (e.g. Noto Sans JP, Noto Serif JP)

* [Caolan Form](https://github.com/caolan/forms)
    * To easily add validation to forms

* [React-multi-select-component](https://www.npmjs.com/package/react-multi-select-component)
    * To allow easy creation of multiple dropdown selection

* [Bookshelf](https://www.npmjs.com/package/react-multi-select-component)
    * To represent database entities as objects and their relationships with other objects

* [Knex.js](http://knexjs.org/)
    * Used with Bookshelf to build MySQL query

* [Moment.js](https://momentjs.com/)
    * To format date and time

* [Stripes](https://stripe.com/en-sg)
    * For online payment processing

* [Uploadcare](https://uploadcare.com/)
    * To store photos of products submitted by vendors

* [db-migrate](https://www.npmjs.com/package/db-migrate)
    * To create tables on MySql 

* [MySQL](https://www.mysql.com/)
    * To store all necessary data for the ecommerce site

* [csurf](https://www.npmjs.com/package/csurf)
    * For session validation for vendors

* [jsonwebtokens](https://www.npmjs.com/package/jsonwebtoken)
    * To provide user authentication for API calls in React Application

* [Multi Device Website Mockup Generator](https://techsini.com/multi-mockup/index.php)
    * To display screen-responsiveness of website across different devices



## Deployment

The web app is hosted using Heroku (for Express NodeJS) and Netlify (for React).

**Steps to deployment using Heroku**

**Step 1| Log into Heroku**

At the terminal, log in to heroku with:
```
heroku login - i
```
Enter your username and password.

**Step 2| Create the Heroku App**

Once you have logged in, create a new Heroku app with the following commands at the terminal:

```
heroku create <app-name>
```

Replace \<app-name> with a name of your choice. Do not use underscore. As the app name has to be unique, make sure the name you use is distinctive. You can use your initials as part of the app name, for instance.

**Step 3| Define Procfile**

The Procfile executes a command when Heroku needs to run our server. Create one in the same directory as index.js and name it as Procfile (the first alphabet must be capitalized, and there is no extension).


Add the following line to the Procfile:
```
web: node index.js
```

Make sure to save the Procfile

**Step 4| Add a start script to package.json**
```
{
  "name": "06-api-auth",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
. . .
}
```

**Step 5| Change the port that we are using**

In index.js, change the 3000 in app.listen to process.env.PORT. 
```
app.listen(process.env.PORT, () => {
    console.log("Server has started");
});
```

**Step 6| Push to Heroku**

Make sure you have a .gitignore file, and it must have node_modules, sessions/ and .env included,
```
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

**Step 7| Setup the Database**

We need to use an external database, hosted on an external server such as Postgres.

In the terminal, type in:
```
heroku addons:create heroku-postgresql
```

When you are done, go to Heroku, and open your newly created application. Click on settings, and then "Reveal Config"

**Step 8| Add database information to your .env file**

Make a copy of your .env file.

Open up Notepad, and paste in the DATABASE_URL obtained from the previous step.

Follow the steps below to obtain the host, user, password and database name:
```
The syntax is postgres://<user>:<password>@<host>/<database_name>?reconnect = true

Example:
postgres://b80f8d428xxxxx:f48exxxx@us-cdbr-iron-east-02.cleardb.net/heroku_58632fb6debxxxx?reconnect=true

# host will be: us-cdbr-iron-east-02.cleardb.net

# user will be: B80f8d428xxxxx

# password will be: F48exxxx

# database_name will be: heroku_58632fb6debxxxx
```

In your .env file, change the setting DB_DRIVER to postgres

Update your .env file with the host, user, password and database name obtained from parsing the syntax above:
```
DB_DRIVER=postgres
DB_USER=nzabcdefghkah
DB_PASSWORD=84f1d63eb61938670f2efa4aaaaaaaf6b725eeed2e19356e11db92a1
DB_DATABASE=d1ldaaaa275
DB_HOST=ec2-54-196-33-23.compute-1.amazonaws.com
```

Finally, install postgres with:
```
yarn add pg
yarn add db-migrate-pg
```
**Step 9| Setup tables with migrations**

Change your database.json to read as below:
```
{
  "dev": {
    "driver": {"ENV" :"DB_DRIVER"},
    "user": {"ENV": "DB_USER" },
    "password": {"ENV":"DB_PASSWORD"},
    "database": {"ENV":"DB_DATABASE"},
    "host": {"ENV":"DB_HOST"},
    "ssl": {
         "rejectUnauthorized": false
    }
  }
}
```

Do the same for bookshelf/index.js
```
const knex = require('knex')({
    'client': process.env.DB_DRIVER,
    'connection': {
        'user': process.env.DB_USER,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_DATABASE,
        'host':process.env.DB_HOST,
        'ssl': {
            'rejectUnauthorized': false
        }
    }
})
```
In the terminal, type in:
```
./db-migrate.sh up
```

The migration takes a longer time to run now because it is happening on a remote server.

**Step 10 | Copy all settings from the  .ENV file to Heroku**

Once more, go to your application in Heroku and copy over the various settings from your .env file over.

**Step 11| Do a commit and then push to Heroku**

We have made some changes to our code, so be sure to commit and push.

**Step 12| Generate a new endpoint secret for your Heroku checkout**

Go to Stripe, and add in a new endpoint for https::\<heroku url>/checkout/process_payment, and replace the old endpoint secret with the new one in your Heroku settings.



**Steps to deployment using Netlify**
1. Add, commit, and push any latest edits made to GitHub via the terminal.
2. Go to [Netlify](https://www.netlify.com/) and log in with Github account.
3. Click on "New site from Git" button
4. Select "GitHub" for continuous deployment
5. Authorize access to GitHub should a pop-up appear
6. Select the repository that you want to deploy
7. Click on "Deploy site" button to get a link for the deployed site


## Dependencies

* [MySQL](https://www.mysql.com)
    * To store data

* [PostgreSQL](https://www.postgresql.org/)
    * To store data

* [Axios](https://cdnjs.com/libraries/axios)
    * To call API

## Credits


* Banner image
    * Extracted and edited from https://egyptianstreets.com/2020/04/16/5-classic-family-activities-boardgames-to-re-visit-during-quarantine/

* Hero image
    * Taken from [Wallpaper Flare](https://www.wallpaperflare.com/play-board-game-cube-human-don-t-be-angry-game-board-figures-wallpaper-ajphf/download/4096x2304)


* Background
    * Taken from [pptBackgrounds](https://www.ppt-backgrounds.net/wood/3154-wooden-texture-image-downloads-backgrounds.html)

* Brand logo 
    * Extracted and edited from [FAVPNG](https://favpng.com/png_view/board-game-chess-tabletop-games-expansions-board-game-png/tunXz2hD)

* Loader
    * Loader example extracted and edited from [w3schools](https://www.w3schools.com/howto/howto_css_loader.asp)


* Deployment steps
    * Extracted and edited based on TGC's deployment guide for [Heroku](https://docs.google.com/document/d/1pXu23W775fO9bbr-QzO7I0U7FInZenN5Mo4sqdWIQw4/edit?usp=sharing) and [Netlify](https://docs.google.com/document/d/1cquGsm1x8Tm2vzcJcAxQdnCe_BxF9b9z34vQEJ6-K7E/edit?usp=sharing)