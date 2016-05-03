


User.create!({username: "Arnold.S",password: "123123", gym_id: 1,
  age: 68, weight: 249, profile_image_url: "http://daily.barbellshrugged.com/wp-content/uploads/2015/02/Screen-Shot-2015-02-05-at-10.52.48-AM.png"})
User.create!({username: "Kai.G",password: "123123", gym_id: 1,
  age: 40, weight: 310, profile_image_url: 'http://broscience.co/wp-content/uploads/2015/01/Kai-greene-workout-routine.jpg'})
User.create!({username: "Jay.Cutler",password: "123123", gym_id: 1,
  age: 42, weight: 274, profile_image_url: "http://cdn.nextimpulsesports.com/wp-content/uploads/2015/01/a236f_ORIG-JayCutler_MD_Dec2012_PerBernal_612JJ_B.jpg" })
User.create!({username: "Dom.M",password: "123123", gym_id: 1,
  age: 25, weight: 183, profile_image_url: "https://bodywhat.com/uploads/media/report/0001/09/thumb_8981_report_extra_eac14c103849acaa85f8ccbc4a1264414a066aca.png"})
User.create!({username: "Timothy.E",password: "123123", gym_id: 1,
  age: 23, weight: 180, profile_image_url: "https://scontent.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/10858351_10152974780013203_7558280172421105113_n.jpg?oh=788c74308a3fd394904a4848e99dde13&oe=57BA63DD"})
User.create!({username: "Max.L",password: "123123", gym_id: 1,
  age: 22, weight: 165, profile_image_url: "https://scontent.xx.fbcdn.net/t31.0-8/11895031_10153073140616009_5004617786088603322_o.jpg"})


HomeCity.create!({name: "San Francisco"})
HomeCity.create!({name: "New York"})
HomeCity.create!({name: "Los Angeles"})
HomeCity.create!({name: "Boston"})

Gym.create!({name: "Crunch", home_city_id: 1})
Gym.create!({name: "LA Fitness", home_city_id: 1})
Gym.create!({name: "24 Hour", home_city_id: 1})
Gym.create!({name: "Golds Gym", home_city_id: 1})

Exercise.create!({name: "Sit Up"})
Exercise.create!({name: "Plank"})
Exercise.create!({name: "Bench"})
Exercise.create!({name: "Incline Bench"})
Exercise.create!({name: "Decline Bench"})
Exercise.create!({name: "Dumbbell Bench Press"})
Exercise.create!({name: "Chest Flies"})
Exercise.create!({name: "Cable Crossover"})
Exercise.create!({name: "Dip"})
Exercise.create!({name: "Cable Pulldown"})
Exercise.create!({name: "Skull Crusher"})
Exercise.create!({name: "Barbell Overhead Pullover"})
Exercise.create!({name: "Squat"})
Exercise.create!({name: "Leg Press"})
Exercise.create!({name: "Leg Curl"})
Exercise.create!({name: "Leg Extension"})
Exercise.create!({name: "Calf Raise"})
Exercise.create!({name: "Hip Extension"})
Exercise.create!({name: "Hip Abduction"})
Exercise.create!({name: "Deadlift"})
Exercise.create!({name: "Shoulder Press"})
Exercise.create!({name: "Arnold Dumbbell Press"})
Exercise.create!({name: "Back Fly"})
Exercise.create!({name: "Barbell Row"})
Exercise.create!({name: "Dumbbell Row"})
Exercise.create!({name: "Cable Row"})
Exercise.create!({name: "Face Pull"})
Exercise.create!({name: "Lateral Raise"})
Exercise.create!({name: "Deltoid Raise"})
Exercise.create!({name: "Pullups"})
Exercise.create!({name: "Lat Pulldowns"})

6.times do |i|
  time = Time.new
  date = Date.current

  Workout.create!({name: "Workout 1" + i.to_s, user_id: i+1, buddy_id: 2, date: date + rand(20), time: time + rand(1000)})
  Workout.create!({name: "Workout 2" + i.to_s, user_id: i+1, date: date + rand(20), time: time + rand(1000)})
  Workout.create!({name: "Workout 3" + i.to_s, user_id: i+1, date: date + rand(20), time: time + rand(1000)})
end


18.times do |i|
  exercises = []
  while exercises.length < 5 do
    num = rand(21) + 1
    exercises << num unless exercises.include?(num)
  end
  WorkoutExercise.create!({workout_id: i+1, exercise_id: exercises.pop, sets: rand(10)+1, reps: rand(5)+5})
  WorkoutExercise.create!({workout_id: i+1, exercise_id: exercises.pop, sets: rand(10)+1, reps: rand(5)+5})
  WorkoutExercise.create!({workout_id: i+1, exercise_id: exercises.pop, sets: rand(10)+1, reps: rand(5)+5})
  WorkoutExercise.create!({workout_id: i+1, exercise_id: exercises.pop, sets: rand(10)+1, reps: rand(5)+5})
  WorkoutExercise.create!({workout_id: i+1, exercise_id: exercises.pop, sets: rand(10)+1, reps: rand(5)+5})
end
