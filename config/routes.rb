Rails.application.routes.draw do
  root 'books#home'
  resources :books
  get '/search' => 'books#search'
  get '/sign-in' => 'books#sign-in'
end
