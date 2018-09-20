Rails.application.routes.draw do
  resources :books
  get 'book/index'
  root 'books#index'
end
