# Phase 3: Flux Architecture and Workout CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* HomeCityIndex
* HomeCityShow => GymIndex
* GymShow => WorkoutsIndex
* WorkoutsForm

### Stores
* Workouts

### Actions
* ApiActions.receiveAllWorkouts -> triggered by ApiUtil
* ApiActions.receiveSingleWorkout
* ApiActions.deleteWorkout
* WorkoutActions.fetchAllWorkouts -> triggers ApiUtil
* WorkoutActions.fetchSingleWorkout
* WorkoutActions.createWorkout
* WorkoutActions.editWorkout
* WorkoutActions.destroyWorkout

### ApiUtil
* ApiUtil.fetchAllWorkouts
* ApiUtil.fetchSingleWorkout
* ApiUtil.createWorkout
* ApiUtil.editWorkout
* ApiUtil.destroyWorkout

## Gems/Libraries
* Flux Dispatcher (npm)
