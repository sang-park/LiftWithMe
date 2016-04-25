# GymBuddy

[Heroku link][heroku]

[heroku]: http://www.gymbuddy.com

## Minimum Viable Product

GymBuddy's overall design was inspired by Tea With Strangers, an app that allows you to meet, drink tea, and have meaningful conversations with strangers. GymBuddy is a web application that will be built using Ruby on Rails and React.js. The finished product will meet the following minimum critera:

- [ ] Sign-up, sign-in, and a demo sign-in feature
- [ ] Smooth, bug-free navigation
- [ ] Populating the website with seeding data
- [ ] 'Hosting' a gym session, signing up for a session, profile look-up
- [ ] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README

## Product Goals and Priorities

GymBuddy will allow users to do the following:

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] Create, edit, and delete a gym session (MVP)
- [ ] Able to look at all possible sessions (MVP)
- [ ] Sign up for a gym session (MVP)
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

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Gym Session Model, API, and basic APIUtil (1.5 days)

**Objective:** Gym sessions can be created, read, edited and destroyed through
the API.

- [ ] create `Gym` model
- [ ] create `GymSessions` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for notes (`GymSessionsController`)
- [ ] jBuilder views for notes
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** GymSessions can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each note component, building out the flux loop as needed.
  - [ ] `GymSessionsIndex`
  - [ ] `GymSessionForm`

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Muscle Tagging (1 day)

**Objective:** GymSessions can be categorized with muscles by tagging.

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

### Bonus Features (TBD)
- [ ] Search through gym sessions by time
- [ ] Pagination / infinite scroll for gym sessions
- [ ] Friend system with other users
- [ ] Search users by how much they lift
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
