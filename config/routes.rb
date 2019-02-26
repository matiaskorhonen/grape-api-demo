Rails.application.routes.draw do
  mount Todo::API => "/"
  # Mount the swagger engine in development etc…
  if defined?(GrapeSwaggerRails)
    mount GrapeSwaggerRails::Engine => "/swagger"
  end
end
