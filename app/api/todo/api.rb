module Todo
  class API < Grape::API
    prefix :api
    format :json
    content_type :json, "application/json"

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
