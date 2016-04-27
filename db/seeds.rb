
User.create!({username: "sang",password: "123123", gym_id: 1})
User.create!({username: "sang2",password: "123123", gym_id: 2})
User.create!({username: "sang3",password: "123123", gym_id: 3})
User.create!({username: "sang4",password: "123123", gym_id: 4})

HomeCity.create!({name: "San Francisco"})
HomeCity.create!({name: "New York"})
HomeCity.create!({name: "Los Angeles"})
HomeCity.create!({name: "Boston"})

Gym.create!({name: "Crunch", home_city_id: 1})
Gym.create!({name: "LA Fitness", home_city_id: 1})
Gym.create!({name: "24 Hour", home_city_id: 1})
Gym.create!({name: "Golds Gym", home_city_id: 2})

Exercise.create!({name: "Bench"})
Exercise.create!({name: "Squat"})
Exercise.create!({name: "Deadlift"})
Exercise.create!({name: "Pullups"})
Exercise.create!({name: "Shoulder Press"})

time = Time.new
date = Date.current
Workout.create!({name: "Intense Workout", user_id: 1, buddy_id: 2, date: date + 1, time: time + 30})
Workout.create!({name: "Decent Workout", user_id: 3, buddy_id: 4, date: date + 2, time: time + 45})
Workout.create!({name: "Okay Workout", user_id: 1, date: date + 3, time: time + 60})

WorkoutExercise.create!({workout_id: 1, exercise_id: 1})
WorkoutExercise.create!({workout_id: 1, exercise_id: 2})
WorkoutExercise.create!({workout_id: 1, exercise_id: 3})
WorkoutExercise.create!({workout_id: 1, exercise_id: 4})
WorkoutExercise.create!({workout_id: 1, exercise_id: 5})
WorkoutExercise.create!({workout_id: 2, exercise_id: 1})
WorkoutExercise.create!({workout_id: 2, exercise_id: 2})
WorkoutExercise.create!({workout_id: 2, exercise_id: 3})
WorkoutExercise.create!({workout_id: 2, exercise_id: 4})
WorkoutExercise.create!({workout_id: 3, exercise_id: 1})
WorkoutExercise.create!({workout_id: 3, exercise_id: 2})
WorkoutExercise.create!({workout_id: 3, exercise_id: 3})
