module Todo
  class API < Grape::API
    prefix :api
    format :json
    content_type :json, "application/json"

    helpers do
      def warden
        env["warden"]
      end

      def authenticate_user!
        if warden.authenticated?(:user)
          return true
        else
          error!("Unauthorized", 401)
        end
      end

      def current_user
        warden.user(:user)
      end

      def sign_in(resource_or_scope, *args)
        options  = args.extract_options!
        scope    = Devise::Mapping.find_scope!(resource_or_scope)
        resource = args.last || resource_or_scope

        expire_data_after_sign_in!

        if warden.user(scope) == resource && !options.delete(:force)
          # Do nothing. User already signed in and we are not forcing it.
          true
        else
          warden.set_user(resource, options.merge!(scope: scope))
        end
      end

      def session
        env["rack.session"]
      end

      def expire_data_after_sign_in!
        # session.keys will return an empty array if the session is not yet loaded.
        # This is a bug in both Rack and Rails.
        # A call to #empty? forces the session to be loaded.
        session.empty?
        session.keys.grep(/^devise\./).each { |k| session.delete(k) }
      end
    end

    rescue_from ActiveRecord::RecordNotFound do |e|
      error! "Not found", 404
    end

    rescue_from StandardError do |e|
      error! "Something went wrong", 500
    end

    add_swagger_documentation doc_version: "1.0.0",
      info: {
        title: "Grape Todo",
        description: "Handle requests from the web front-end"
      }
  end
end
