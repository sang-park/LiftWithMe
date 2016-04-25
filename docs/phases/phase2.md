# Phase 2: Flux Architecture and GymSession CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* GymShow
* GymSessionsIndex
* GymSessionsForm

### Stores
* GymSessions

### Actions
* ApiActions.receiveAllGymSessions -> triggered by ApiUtil
* ApiActions.receiveSingleGymSession
* ApiActions.deleteGymSession
* GymSessionActions.fetchAllGymSessions -> triggers ApiUtil
* GymSessionActions.fetchSingleGymSession
* GymSessionActions.createGymSession
* GymSessionActions.editGymSession
* GymSessionActions.destroyGymSession

### ApiUtil
* ApiUtil.fetchAllGymSessions
* ApiUtil.fetchSingleGymSession
* ApiUtil.createGymSession
* ApiUtil.editGymSession
* ApiUtil.destroyGymSession

## Gems/Libraries
* Flux Dispatcher (npm)
