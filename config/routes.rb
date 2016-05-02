Rails.application.routes.draw do
  root to: "static_page#root"

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :show]
    post 'user/add_workout', to: "users#add_workout"
    patch 'user/update_workout', to: "users#update_workout"
    get 'user/:user_id/preview', to: "users#preview"
    resource :session, only: [:create, :destroy, :show], controller: "session"
    resources :home_cities, only: [:index, :show]
    resources :gyms, only: [:show]
    resources :workouts, only: [:show, :create, :destroy, :update]
    resources :exercises, only: [:index]
  end

end
