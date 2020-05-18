Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/get_ingredients', to: 'ingredients#get_ingredients'
  get '/get_recipes', to: 'recipes#get_recipes'
  resources :recipes, only: [:show]
  resources :recipe_ingredients, only: [:create]
end
