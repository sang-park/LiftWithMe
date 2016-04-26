# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users`
- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Notes

- `GET /api/gym_sessions`
  - Workout index/search
  - Takes in tag as a query string
- `POST /api/gym_sessions`
- `GET /api/gym_sessions/:id`
- `PATCH /api/gym_sessions/:id`
- `DELETE /api/gym_sessions/:id`

### Tags

- Tags will correspond to the muscle group
- `GET /api/tags`
  - includes query param for typeahead suggestions
