if defined?(GrapeSwaggerRails)
  GrapeSwaggerRails.options.url = "/api/swagger_doc"
  GrapeSwaggerRails.options.hide_url_input = true
  GrapeSwaggerRails.options.hide_api_key_input = true
  GrapeSwaggerRails.options.app_name = "Grape Todo"
  GrapeSwaggerRails.options.doc_expansion = "full"

  GrapeSwaggerRails.options.before_action do
    GrapeSwaggerRails.options.app_url = request.protocol + request.host_with_port
  end
end
