Rails.application.routes.draw do
  root 'books#home'
  resources :books
  get '/search' => 'books#search'
  get '/books/new' => 'books#new'
end
