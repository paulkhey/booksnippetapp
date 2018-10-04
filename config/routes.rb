Rails.application.routes.draw do
  root 'books#home'
  resources :books
  get "/search" => "books#search"
end
