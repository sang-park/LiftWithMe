class Api::GymsController < ApplicationController
  def show
    @gym = Gym.includes(:workouts).find(params["id"].to_i)
    render :show
  end
end
