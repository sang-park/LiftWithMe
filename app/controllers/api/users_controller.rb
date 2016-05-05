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
      existing_exercises = []
      existing_we = [];
      new_exercises = []

      params['exercises'].values.each do |we|
        if we["workout_exercise_id"]
          existing_exercises << we
          existing_we << we["workout_exercise_id"].to_i
        else
          new_exercises << we
        end
      end

      WorkoutExercise.remove_extras(workout.id, existing_we)

      existing_exercises.each do |exercise|
        we = WorkoutExercise.find(exercise['workout_exercise_id'])
        we.update_attributes({
          sets: exercise['sets'],
          reps: exercise['reps']
        })
      end


      new_exercises.each do |exercise|
        WorkoutExercise.create!({
          workout_id: workout.id,
          exercise_id: exercise["exercise_id"],
          sets: exercise['sets'],
          reps: exercise['reps']
        })
      end
      @gym = current_user.gym
      render 'api/gyms/show'
    else
      @errors = ['Cannot create this workout']
      render "api/shared/error", status: 404
    end
  end

  def preview
    @user = User.find(params['user_id'])
    @workouts = @user.workouts
    render 'api/users/preview'
  end

  def update
    @user = User.find(params['userId'])
    @user.update_attributes({gym_id: params['gymId']})
    render 'api/user/show'
  end

  private
  def user_params
    params.require(:user).permit(
      :username,
      :password,
      :profile_image_url,
      :weight,
      :age
    )
  end

  def workout_params
    params.require(:workout).permit(:name, :date, :time)
  end

  def exercise_params
    params.require(:exercises)
  end
end
