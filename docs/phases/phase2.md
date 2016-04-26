# Phase 2: Gyms (2 days)

## Rails
### Models
* Gym
* Workouts
* Exercises

### Controllers
* Api::GymsController (index, show)
* Api::ExercisesController (index)
* Api::WorkoutsController (index, show, new, create, delete, edit, update)

### Views
* gyms/index.json.jbuilder
* gyms/show.json.jbuilder
* workouts/index.json.jbuilder
* workouts/new.json.jbuilder
* workouts/edit.json.jbuilder
* workouts/show.json.jbuilder
* exercises/index.json.jbuilder

## Flux
### Views (React Components)
* GymsIndex

### Stores
* Gym

### Actions
* ApiActions.receiveAllGyms -> triggered by ApiUtil
* ApiActions.receiveSingleGym
* ApiActions.deleteGym
* GymActions.fetchAllGyms -> triggers ApiUtil
* GymActions.fetchSingleGym
* GymActions.createGym
* GymActions.editGym
* GymActions.destroyGym

### ApiUtil
* ApiUtil.fetchAllGyms
* ApiUtil.fetchSingleGym
* ApiUtil.createGym
* ApiUtil.editGym
* ApiUtil.destroyGym

## Gems/Libraries
