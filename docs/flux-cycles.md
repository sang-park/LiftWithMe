# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## Workout Cycles

### Workout API Request Actions

* `fetchAllWorkouts`
  0. invoked from `WorkoutIndex` `didMount`/`willReceiveProps`
  0. `GET /api/gym_sessions` is called.
  0. `receiveAllWorkouts` is set as the callback.

* `createWorkout`
  0. invoked from new note button `onClick`
  0. `POST /api/gym_sessions` is called.
  0. `receiveSingleWorkout` is set as the callback.

* `fetchSingleWorkout`
  0. invoked from `WorkoutDetail` `didMount`/`willReceiveProps`
  0. `GET /api/gym_sessions/:id` is called.
  0. `receiveSingleWorkout` is set as the callback.

* `updateWorkout`
  0. invoked from `WorkoutForm` `onSubmit`
  0. `POST /api/gym_sessions` is called.
  0. `receiveSingleWorkout` is set as the callback.

* `destroyWorkout`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/gym_sessions/:id` is called.
  0. `removeWorkout` is set as the callback.

### Workout API Response Actions

* `receiveAllWorkouts`
  0. invoked from an API callback.
  0. `Workouts` store updates `_Workouts` and emits change.

* `receiveSingleWorkout`
  0. invoked from an API callback.
  0. `Workout` store updates `_Workouts[id]` and emits change.

* `removeWorkout`
  0. invoked from an API callback.
  0. `Workout` store removes `_Workouts[id]` and emits change.

### Store Listeners

* `WorkoutsIndex` component listens to `Workout` store.
* `WorkoutDetail` component listens to `Workout` store.
