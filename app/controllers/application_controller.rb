class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :signed_in?

  private
  def current_user
    @current_user ||= User.find_by_session_token(session[:token])
  end

  def signed_in?
    !!current_user
  end

  def login(user)
    @current_user = user
    session[:token] = user.reset_session_token!
  end

  def logout
    current_user.try(:reset_session_token!)
    session[:token] = nil
  end

end
