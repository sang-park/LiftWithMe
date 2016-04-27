class Api::UsersController < ApplicationController


  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render 'api/user/show'
    else
      flash.now[:errors] = @user.errors.full_messages
      # render :show
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
