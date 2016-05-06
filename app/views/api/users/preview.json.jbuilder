json.extract! @user, :username, :id, :profile_image_url, :age, :weight
json.workouts @user.workouts
json.paired_workouts  do
  json.array! @user.paired_workouts do |paired_workout|
    json.date paired_workout.date
    json.time paired_workout.time
    json.id paired_workout.id
    json.name paired_workout.name
    json.username paired_workout.user.username
  end
end
