Rails.application.routes.draw do
  root 'planets#index'
  resources :planets, only: [:index, :new, :create]
end
