class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render 'api/user/show'
    else
      flash.now[:errors] = @user.errors.full_messages
      render 'api/shared/error', status: 404
    end
  end

  def add_workout

    if current_user && Workout.create!(workout_params.merge({user_id: current_user.id}))
      exercise_params.length.times do |i|
        exercise = exercise_params[i.to_s]
        WorkoutExercise.create!({
          workout_id: Workout.last.id,
          exercise_id: exercise["exercise_id"],
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

  def update_workout
    workout = Workout.find(params['workout']['id'].to_i)
    if current_user && workout
      params['exercises'].each do |exercise|
        WorkoutExercise.destory_all_in_workout(workout.id)
        # we_id = exercise[1]["workout_exercise_id"]
        # if we_id
        #   we = WorkoutExercise.find(we_id)
        #   we.update_attributes(exercise[1].permit(:sets, :reps))
        # else
        debugger
        new_params = exercise[1]
          .permit(:sets, :reps, :exercise_id)
          .merge(workout_id: workout.id)
        WorkoutExercise.create!(new_params)
        # end
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
