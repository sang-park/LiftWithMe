class Api::HomeCitiesController < ApplicationController
  def index
    @home_cities = HomeCity.all
    render :index
  end

  def show
    @home_city = HomeCity.find(params["id"].to_i)
    render :show
  end
end
