class Api::WorkoutExercisesController < ApplicationController

  def create
    # @workout_exercise = WorkoutExercise.create!(workout_exercise_params)
    # @gym = Gym.find(current_user.gym_id)
    # render 'api/gyms/show'
    # else
    #   @errors = ['Must be an existing exercise']
    #   render "api/shared/error", status: 404
    # end
  end

  private
  def workout_exercise_params
    params.require(:workout_exercise).permit(
      :workout_id,
      :exercise_id,
      :sets,
      :reps
    )
  end
end
