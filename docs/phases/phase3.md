# Phase 3: Gyms (2 days)

## Rails
### Models
* Gym

### Controllers
* Api::GymsController (index, show)

### Views
* gyms/index.json.jbuilder
* gyms/show.json.jbuilder

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
