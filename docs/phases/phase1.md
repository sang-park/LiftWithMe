# Phase 1: User Authentication, Note Model and JSON API

## Rails
### Models
* User
* Gym
* Workout

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* Api::GymSesssionController (create, destroy, index, show, update)
* Api::GymController (show)

### Views
* users/new.html.erb
* session/new.html.erb
* api/gym/show.json.jbuilder
* api/gym/:gym_id/gym_sessions/index.json.jbuilder
* api/gym/:gym_id/gym_sessions/show.json.jbuilder

## Flux
### Views (React Components)

### Stores

### Actions

### ApiUtil

## Gems/Libraries
* BCrypt (Gem)
