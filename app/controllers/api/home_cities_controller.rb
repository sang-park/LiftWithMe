class Api::HomeCitiesController < ApplicationController
  def index
    @home_cities = HomeCity.all
    render :index
  end

  def show
    if current_user && current_user.home_city.id == params["id"].to_i
      @home_city = current_user.home_city
      render :show
    else
      self.index
    end
  end
end
