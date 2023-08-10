# SETUP INSTRUCTION

### Navigate into the project folder and run the installation, then start the development server
```
npm install
npm run dev
```

### Instructions and Notes
I completed all the core deliverables except for the logic that prevents downtime date clashes on a particular telescope. The current version prevents the user from creating a downtime on ANY telescope, if the date range specified falls into a date range already blacked out by another downtime.

I utilized an in-memory data structure to save the downtime data across page navigation. The global state logic is specified in `global-state.tsx`.

I ran out of time but some of my past projects implement a filtering/search feature and I welcome you to browse the logic as it is similar.

I would love to discuss approaches for visualization if you decide to move forward with my candidacy.

Thank you for your time,
Alex Galev