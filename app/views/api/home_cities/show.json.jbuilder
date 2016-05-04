json.extract! @home_city, :name
json.gyms do
  json.array! @home_city.gyms do |gym|
    json.name gym.name
    json.id gym.id
    json.logo_url gym.logo_url
    json.address gym.address
  end
end
