json.extract! @user, :username, :id, :profile_image_url, :age, :weight
json.workouts @user.workouts
