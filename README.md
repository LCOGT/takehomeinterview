# Take Home Interview Project

### Goal
Create a web application using a JavaScript/Typescript framework to track and visualize observatory maintenance time windows.

### Estimated time for completion:
2-4 Hours

### Instructions
To give you some context to the problem, LCO operates a network of _telescopes_ spread out geographically throughout the world at locations we call _sites_. Occasionally, we have to take a telescope down for maintenance activities during which they are not operational. We refer to these periods as _downtimes_.

We would like you to create a web application that allows a user to perform CRUD (create, read, update, delete) operations on downtimes for a telescope at a site. Additionally, we’d like you to visualize these downtimes in a timeline.

You are free to use any JavaScript/Typescript framework (React, Vue, etc) you are familiar with. You may also use any libraries.

You don’t have to worry about persisting any data (e.g. Postgres, SQLite, etc). You can just use in-memory data structures or Browser Storage APIs (e.g. sessionStorage, localStorage) if that makes it easier.

Using generative AI assistants is highly discouraged, but if you do please include any prompts and cite relevant resources.

The deliverable product should be the source code to a runnable web application with all the requirements met. You do not need to provide any downtime data with the deliverable.

So we know how to run your solution, place any setup instructions in a file called SETUP.

Using Github, you should fork this repository ([Github: how to fork a repository](https://help.github.com/articles/fork-a-repo/)) and add the code you have written to it. When you are done, open a pull request. It will then be reviewed by the LCO software team.


## Requirements

#### Downtimes

* Each downtime is defined by a site, telescope, start date-time, end date-time and a reason field. An internal ID should also be generated to uniquely identify a downtime.
* Site & telescope fields should be case-insensitive (upper or lower, you choose) text fields.
* Reason field should be limited to 255 characters.
* Start & end date-times should be specified in Coordinated Universal Time (UTC).
* Two downtime windows cannot overlap for a particular telescope at a site


#### UI

You are free to organize the user-interface as you see fit as long as it has the following components:
* A form to add new downtimes as described above.
  * It should validate inputs and reject invalid entries.
* A component that lists _all_ downtimes sorted by the start date in descending order. 
  * Every item should display the downtime _ID_, _Site_, _Telescope_, _Start_, _End_.
  * Should be expandable to show the downtime _Reason_.
  * Be able to edit and save the _Reason_.
  * Be able to delete the downtime entry.
  * Bonus: the ability to filter/search by _site_ or _telescope_
* Bonus: A timeline component to visualize all downtimes. (Hint: use https://visjs.github.io/vis-timeline/docs/timeline/)
