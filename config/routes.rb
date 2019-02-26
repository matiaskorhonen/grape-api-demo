Rails.application.routes.draw do
  devise_for :users

  root to: "pages#home"

  mount Todo::API => "/"
  # Mount the swagger engine in development etc…
  if defined?(GrapeSwaggerRails)
    mount GrapeSwaggerRails::Engine => "/swagger"
  end
end
