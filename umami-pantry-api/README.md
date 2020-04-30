# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


# Requirements
1. The application must be an HTML, CSS, and JavaScript frontend with a Rails API backend. 
    1. All interactions between the client and the server must be handled asynchronously (AJAX - fetch) and use JSON as the communication format.
        1. no longer rendering views; we’re rendering info on front-end;
        2. user going to see page rendered in the background and JS is making requests to API and dynamically rendering that data when they get back;
2. The JavaScript application must use Object Oriented JavaScript (classes) to encapsulate related data and behavior.
    1. objects on front-end → virtual database; classes that create those objects;
3. The domain model served by the Rails backend must include a resource with at least one has-many relationship. 
    1. For example, if you were building an Instagram clone, you might display a list of photos with associated comments.
4. The backend and frontend must collaborate to demonstrate Client-Server Communication.
    1. Your application should have at least 3 AJAX calls, covering at least 2 of Create, Read, Update, and Delete (CRUD). 
        1. 2 asynchronous requests for back end - make at least 3 fetch requests to backend
        2. user driven AJAX request - user to post data to database; 
        3. user to interact with API; post data to it using `create`, `update` or `delete`
    2. Your client-side JavaScript code must use `fetch` with the appropriate HTTP verb, and your Rails API should use RESTful conventions.
        1. resource generator - set up with CRUD functionality being RESTful; e.g. post request to `/posts` when you create new post

# Description of app
* Pantry Recipes packed with a punch of umami
* Simple pantry ingredients
* Relatively easy-to-subsitute ingredients

# Classes
* 


## AJAX Requests - then use serialization process in controller to return associated data
1. get /recipes (render recipes with selected ingredients) 
2. get /recipes/:id
3. post /recipes

## Fuzzy Matching
* organize food by category
* RecipeIngredient to have amount - grams 
