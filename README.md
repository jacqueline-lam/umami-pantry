# Umami Pantry
## Overview
This is a single page application that shows matching recipes for different pantry ingredients. It is designed to encourage freestyle homecooking with easy-to-substitute ingredients.

The app is composed of backend rails API and front-end modular JS clients, which use asynchronous Javascript to make HTTP requests to the API to get/ post data and render them to the user interface.

![project demo](./umami-pantry-frontend/images/umami-pantry.gif)
* [Video Demo](https://youtu.be/xL5mj8t-rMM)
* [Blog Post](https://dev.to/jacquelinelam/building-a-single-page-cooking-app-for-covid-19-lockdown-28ke)

## Features
1. Single Page App: Users will not have to travel across different URL links
2. Pick Ingredients: Users can select ingredients by clicking the ingredient icons available
3. Matching Recipes: recipe results will automatically show up as users select ingredients
4. Recipe Card: Displays the recipe name, category, and ingredients
5. Selected Recipe: User can read the instructions, ingredient list and choose to add any substitute ingredients


## Technologies Implemented
1. ActiveRecord
2. Bootsrap
3. CRUD
4. HTML & CSS
5. Fetch API
6. JavaScript
7. Object Oriented Design
8. PostgreSQL
9. RESTful API
10. Ruby
11. Ruby On Rails

## Installation
Download zip from my project repository: https://github.com/jacqueline-lam/umami-pantry

Go to your terminal and change directory:

    $ cd umami-pantry

If you don't have Ruby, please install Ruby version `ruby 2.6.1`.

 With Rubygems loaded, you can install all of Rails and its dependencies using the following command through the command line:

    $ gem install rails -v 6.0.2

Use the following command to make Rails executable available.

    $ rbenv rehash

More installation instructions can be found on the [Ruby on Rails Guide](https://guides.rubyonrails.org/v5.0/getting_started.html#installing-rails)

Once Ruby and Rails are installed, `cd` into `umami-pantry-api` and run:

    $ gem install bundler


Bundler gem provides us access to a terminal command: `bundle install`

Install the gems and gem dependencies for this app by running:

    $ bundle install

And then run:

    $ rails db:seed

And then run:

    $ rails s

Lastly, open another tab and `cd` into `umami-pantry-frontend`, then run:
    $ open index.html
to browse the application in your browser.

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/jacqueline-lam/umami-pantry. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Authors
Jacqueline Lam - @jacqueline-lam

## License

The code is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the project’s codebases is expected to follow the [code of conduct](https://github.com/jacqueline-lam/bolderer_sinatra_app/blob/master/CODE_OF_CONDUCT.md).
