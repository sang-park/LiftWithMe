Rails.application.routes.draw do
  root to: "static_page#root"
  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :show]
    resource :session, only: [:create, :destroy, :show], controller: "session"
  end

end
