Rails.application.routes.draw do
  resources :recipes, only: [:index, :create, :show]
  resources :ingredients, only: [:index]
  # resources :recipe_ingredients, only: [:create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/get_ingredients', to: 'ingredients#get_ingredients'
  get '/get_recipes', to: 'recipes#get_recipes'
  post '/recipe_ingredients', to: 'recipe_ingredients#create'
end
