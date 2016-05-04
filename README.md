# LiftWithMe

[Heroku link][heroku]

[heroku]: http://liftwithme.herokuapp.com

## Minimum Viable Product

LiftWithMe's overall design was inspired by Tea With Strangers, an app that allows you to meet, drink tea, and have meaningful conversations with strangers. LiftWithMe is a web application that will be built using Ruby on Rails and React.js. The finished product will meet the following minimum critera:

- [x] Sign-up, sign-in, and a demo sign-in feature
- [ ] Smooth, bug-free navigation
- [x] Populating the website with seeding data
- [x] 'Hosting' a gym session, signing up for a session, profile look-up
- [x] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README

## Product Goals and Priorities

LiftWithMe will allow users to do the following:

- [x] Create an account (MVP)
- [x] Log in / Log out, including as a Guest/Demo User (MVP)
- [x] Create, edit, and delete a gym session (MVP)
- [x] Able to look at all possible sessions (MVP)
- [x] Sign up for a gym session (MVP)
- [ ] Profile look ups (MVP)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin

### Phase 2: Workouts Model, API, and basic APIUtil (1.5 days)

**Objective:** Workouts can be created, read, edited and destroyed through
the API.

- [x] create `Gym` model
- [x] create `Workouts` model
- [x] seed the database with a small amount of test data
- [x] CRUD API for notes (`WorkoutsController`)
- [x] jBuilder views for workouts
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Workouts can be created, read, edited and destroyed with the
user interface.

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- [x] implement each component, building out the flux loop as needed.
- [x] `WorkoutsIndex`
- [x] `WorkoutForm`

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [x] create a basic style guide
- [x] position elements on the page
- [x] add basic colors & styles

### Phase 5: Muscle Tagging (1 day)

**Objective:** Workouts can be categorized with muscles by tagging.

- [ ] create `Muscle` model and join table (`MuscleTags`)
- build out API, Flux loop, and components for:
  - [ ] adding gym sessions requires a muscle group
  - [ ] viewing gym sessions by muscle groups
  - [ ] fetching muscles for a gym session
  - [ ] adding muscles to gym session
- Use CSS to style new views

### Phase 6: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.
- [ ] At login failure, display error, keep the login modal up

### Bonus Features (TBD)
- [ ] Search through workouts by time
- [ ] Friend system with other users
- [ ] Search users by how much they lift
- [ ] Save Workouts like a playlist
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
