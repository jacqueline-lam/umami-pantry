Rails.application.routes.draw do
  resources :recipes, only: [:index, :create, :show]
  resources :ingredients, only: [:index, :create, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
