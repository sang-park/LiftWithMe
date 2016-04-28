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

  def add_workout
    if current_user && Workout.create!(workout_params.merge({user_id: current_user.id}))
      exercise_params.length.times do |i|
        exercise = exercise_params[i.to_s]
        WorkoutExercise.create!({
          workout_id: Workout.last.id,
          exercise_id: exercise["id"],
          sets: exercise["sets"],
          reps: exercise["reps"]
          })
      end
      @gym = current_user.gym
      render 'api/gyms/show'
    else
      @errors = ['Cannot create this workout']
      render "api/shared/error", status: 404
    end

  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

  def workout_params
    params.require(:workout).permit(:name, :date, :time)
  end

  def exercise_params
    params.require(:exercises)
  end
end
