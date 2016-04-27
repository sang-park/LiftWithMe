json.extract! @workout, :name, :time, :date, :buddy_id
zip_file = @workout.exercises.zip(@workout.workout_exercises)
json.exercises do
  json.array! zip_file do |exercise|
    json.name exercise[0].name
    json.sets exercise[1].sets
    json.reps exercise[1].reps
    json.id exercise[0].id
  end
end
