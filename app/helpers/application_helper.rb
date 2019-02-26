module ApplicationHelper
  def default_props
    props = {
      csrfParam: request_forgery_protection_token,
      csrfToken: form_authenticity_token,
      flashes: {
        notice: notice,
        alert: alert
      }
    }

    if user_signed_in?
      props[:current_user] = current_user.as_json(only: [
        :id, :email
      ])
    end

    props
  end
end
