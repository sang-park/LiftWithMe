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


## GymSession Cycles

### GymSession API Request Actions

* `fetchAllGymSessions`
  0. invoked from `GymSessionIndex` `didMount`/`willReceiveProps`
  0. `GET /api/gym_sessions` is called.
  0. `receiveAllGymSessions` is set as the callback.

* `createGymSession`
  0. invoked from new note button `onClick`
  0. `POST /api/gym_sessions` is called.
  0. `receiveSingleGymSession` is set as the callback.

* `fetchSingleGymSession`
  0. invoked from `GymSessionDetail` `didMount`/`willReceiveProps`
  0. `GET /api/gym_sessions/:id` is called.
  0. `receiveSingleGymSession` is set as the callback.

* `updateGymSession`
  0. invoked from `GymSessionForm` `onSubmit`
  0. `POST /api/gym_sessions` is called.
  0. `receiveSingleGymSession` is set as the callback.

* `destroyGymSession`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/gym_sessions/:id` is called.
  0. `removeGymSession` is set as the callback.

### GymSession API Response Actions

* `receiveAllGymSessions`
  0. invoked from an API callback.
  0. `GymSessions` store updates `_gymSessions` and emits change.

* `receiveSingleGymSession`
  0. invoked from an API callback.
  0. `GymSession` store updates `_gymSessions[id]` and emits change.

* `removeGymSession`
  0. invoked from an API callback.
  0. `GymSession` store removes `_gymSessions[id]` and emits change.

### Store Listeners

* `GymSessionsIndex` component listens to `GymSession` store.
* `GymSessionDetail` component listens to `GymSession` store.
