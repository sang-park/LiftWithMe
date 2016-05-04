


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

gymURLs = [
  ["Lifetime Fitness", "http://res.cloudinary.com/dque3vywj/image/upload/v1462400418/LTF_bw_ka5oni.png"],
  ["FitnessSF", "http://res.cloudinary.com/dque3vywj/image/upload/v1462399978/IuiLGnsj_xqc9f3.png"],
  ["Crunch Fitness", "https://www.crunch.com/images/crunch-gyms-splash.png"],
  ["LA Fitness", "http://res.cloudinary.com/dque3vywj/image/upload/v1462400032/A5tfdj3f_ipza9q.png"],
  ["24 Hour Fitness", "http://res.cloudinary.com/dque3vywj/image/upload/v1462399924/24-hour-fitness-logo_gyjhgb.png"],
  ["Gold's Gym", "http://www.gabriellereece.com/wp-content/uploads/2013/07/imgGolds-Logo.gif"],
  ["YMCA", "https://ymcali.org/assets/img/long-island-ymca-logo.png"],
  ["Planet Fitness", "http://www.planetfitness.com/sites/all/themes/planetfitness/logo.png"],
  ["Equinox", "http://res.cloudinary.com/dque3vywj/image/upload/v1462399852/equinox-gym-fitness-review-logo_diyoz3.png"]
];
gyms_by_city = [
  [0,1,2,4,6,7,8].shuffle,
  [0,2,3,5,6,7,8].shuffle,
  [0,3,4,6,7,8].shuffle,
  [2,3,6,7,8].shuffle
]

gym_addresses = [
  {
    "Lifetime Fitness" => "1000 Van Ness, 1000 Van Ness Ave, San Francisco, CA 94109",
    "FitnessSF" => "1001 Brannan St, San Francisco, CA 94103",
    "Crunch Fitness" => "345 Spear St, San Francisco, CA 94105",
    "24 Hour Fitness" => "45 Montgomery St, San Francisco, CA 94101",
    "YMCA" => "169 Steuart St, San Francisco, CA 94105",
    "Planet Fitness" => "350 Sansome St, San Francisco, CA 94104",
    "Equinox" => "301 Pine St, San Francisco, CA 94101"
  },
  {
    "Lifetime Fitness" => "60 E 42nd St, New York, NY 10017",
    "Crunch Fitness" => "222 E 34th St, New York, NY 10016",
    "LA Fitness" => "400 5th Ave, New York, NY 10118",
    "Gold's Gym" => "250 W 54th St, New York, NY 10019",
    "YMCA" => "5 W 63rd St, New York, NY 10023",
    "Planet Fitness" => "423 W 55th St, New York, NY 10019",
    "Equinox" => "100 Tenth Avenue, New York, NY 10011"
  },
  {
    "Lifetime Fitness" => "11150 W Olympic Blvd, Los Angeles, CA 90064",
    "24 Hour Fitness" => "2929 31st St, Santa Monica, CA 90405",
    "LA Fitness" => "3827 Overland Ave, Culver City, CA 90232",
    "Planet Fitness" => "3632 Maplewood Ave Los Angeles, CA 90066",
    "YMCA" => "4500 Sepulveda Blvd, Culver City, CA 90230",
    "Equinox" => "201 Santa Monica Blvd, Santa Monica, CA 90401"
  },
  {
    "Crunch Fitness" => "399 Boylston St, Boston, MA 02116",
    "LA Fitness" => "14 Bromfield St, Boston, MA 02108",
    "YMCA" => "8 Oak St W, Boston, MA 02116",
    "Planet Fitness" => "19 N Square, Boston, MA 02113",
    "Equinox" => "4 Avery St, Boston, MA 02111"
  }
]

4.times do |i|
  gyms_by_city[i].each do |index|

    gym_name = gymURLs[index][0]
    logo_url = gymURLs[index][1]
    gym_address = gym_addresses[i][gym_name]

    Gym.create!({
      name: gym_name,
      logo_url: logo_url,
      home_city_id: i+1,
      address: gym_address
    })
  end
end

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
