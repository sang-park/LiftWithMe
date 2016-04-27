
User.create!({username: "sang",password: "123123"})
User.create!({username: "sang2",password: "123123"})
User.create!({username: "sang3",password: "123123"})
User.create!({username: "sang4",password: "123123"})

HomeCity.create!({name: "San Francisco"})
HomeCity.create!({name: "New York"})
HomeCity.create!({name: "Los Angeles"})
HomeCity.create!({name: "Boston"})

Gym.create!({name: "Crunch", home_city_id: 1})
Gym.create!({name: "LA Fitness", home_city_id: 1})
Gym.create!({name: "24 Hour", home_city_id: 1})
Gym.create!({name: "Golds Gym", home_city_id: 1})

Exercise.create!({name: "Bench"})
Exercise.create!({name: "Squat"})
Exercise.create!({name: "Deadlift"})
Exercise.create!({name: "Pullups"})
Exercise.create!({name: "Shoulder Press"})
