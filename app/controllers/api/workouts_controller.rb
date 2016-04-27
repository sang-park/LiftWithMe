class Api::WorkoutsController < ApplicationController
  def show
    @workout = Workout.includes(:exercises).includes(:workout_exercises).find(params["id"].to_i)
    render :show
  end
end
