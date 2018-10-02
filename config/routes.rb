Rails.application.routes.draw do
  # root 'books#home'
  root 'books#search'
  resources :books
  get "/search" => "books#search"
end
