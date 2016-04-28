class Api::WorkoutsController < ApplicationController
  def show
    @workout = Workout.includes(:exercises).includes(:workout_exercises).find(params["id"].to_i)
    render :show
  end

  def create
    if current_user
      @workout = Workout.create!(workout_params.merge(user_id: current_user.id))
      @gym = Gym.find(current_user.gym_id)
      render 'api/gyms/show'
    else
      @errors = ['Must be signed in to create a workout']
      render "api/shared/error", status: 404
    end
  end

  def destroy
    @workout = Workout.find(params["id"])
    if @workout && @workout.user_id == current_user.id
      @workout.delete
      @gym = Gym.find(current_user.gym_id)
      render 'api/gyms/show'
    else
      @errors = ['Cannot delete this workout']
      render "api/shared/error", status: 404
    end

  end

  private
  def workout_params
    params.require(:workout).permit(:name, :date, :time)
  end
end
