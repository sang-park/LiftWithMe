# Phase 3: Muscle and Muscle Tags (1 days)

## Rails
### Models
* Muscle
* MuscleTag

### Controllers
* Api::MuscleTagController (create, destroy, index, show)

### Views
* muscles/index.json.jbuilder => index of all muscle groups
* muscles/show.json.jbuilder => should index all gym sessions

## Flux
### Views (React Components)
* MuscleIndex

### Stores
* Muscle

### Actions
* ApiActions.receiveAllMuscleTags -> triggered by ApiUtil
* ApiActions.receiveSingleMuscleTag
* ApiActions.deleteMuscleTag
* MuscleTagActions.fetchAllMuscleTags -> triggers ApiUtil
* MuscleTagActions.fetchSingleMuscleTag
* MuscleTagActions.createMuscleTag
* MuscleTagActions.editMuscleTag
* MuscleTagActions.destroyMuscleTag

### ApiUtil
* ApiUtil.fetchAllMuscleTags
* ApiUtil.fetchSingleMuscleTag
* ApiUtil.createMuscleTag
* ApiUtil.editMuscleTag
* ApiUtil.destroyMuscleTag

## Gems/Libraries
