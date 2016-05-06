# LiftWithMe

Do you ever feel like a plastic bag? Drifting through the gym, wanting to max out again? Well look no further!

LiftWithMe is a web application for finding people to work out with! LWM uses Rails backend, PostgreSQL database, and React.js with a Flux architectural framework frontend.

[LiftWithMe][link]
[link]: http://liftwithme.herokuapp.com

## Welcome View

![Welcome Page][front page]

[front page]: docs/screenshots/front_page.png

## Overview

With LiftWithMe, the users have the ability to search for their local gym, and post their work outs. Other users are able to look at these work outs and pair up with the work out you want to be a part of.

### Users
- Users can either sign up and make their own account, or try out the website with a demo account. The demo account has pre-loaded data for the user to interact with. 

### Cities
- In the city index page, the user is able to see the cities and choose the city they reside in.  
- In the city view page, users can see the list of gyms in the city on the left. They are accompanied by their logos, which also directs the users to the location of the gym in the map.

![City Index Page][city index]

[city index]: docs/screenshots/city_index.png

### Gyms
- The gym show page allows the users to browse through all the work outs that are posted to that gym. The user can also create new workouts, or go back to the city to choose a different gym.

![Gym Map][gym map]

[gym map]: docs/screenshots/gym_map.png

### Work Outs
- The work out pops out to the user in a modal.
- The modal will allow the users to pair up with other users for a work out or get redirected to view other user's profile.
- If the users click on their own work out, it will be accompanied by edit and destroy buttons.

## Future Plans
I plan on continuing to work on LiftWithMe to implement new features. The future of LiftWithMe is as follows:

### Search
Search can make navigation through any website easier. I plan to implement search so that the users can find other users by weight, or search work outs by the exercises involved.

### Friends
After a work out, the user might want to work out with the same buddy again. The friend system will allow the user to keep in touch, and be updated on each other's work outs. It can also work as a source of motivation when your friend is making good progress.

### Muscle Tagging
When sorting through the work outs, it would be convenient to be able to sort them by the muscles being worked out. Most people who consistently go to gyms divide up their work outs by muscle groups. This feature will allow for a faster and easier pairing.
