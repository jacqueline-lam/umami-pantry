Rails.application.routes.draw do
  resources :recipes, only: [:index, :create, :show]
  resources :ingredients, only: [:index]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/categorized_ingredients', to: 'ingredients#get_ingredients'
  get '/get_recipes', to: 'recipes#get_recipes'
end
