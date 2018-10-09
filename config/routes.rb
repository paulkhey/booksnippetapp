Rails.application.routes.draw do
  root 'books#home'
  resources :books
  get '/search' => 'books#search'
  get '/log-in' => 'books#log-in'
end
