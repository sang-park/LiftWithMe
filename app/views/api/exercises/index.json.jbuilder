json.exercises do
  json.array! @exercises do |exercise|
    json.id exercise.id
    json.name exercise.name
  end
end
