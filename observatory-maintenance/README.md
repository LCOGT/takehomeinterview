## Requirements

#### Downtimes

[X]_ Each downtime is defined by a site, telescope, start date-time, end date-time and a reason field. An internal ID should also be generated to uniquely identify a downtime.
[X]_ Site & telescope fields should be case-insensitive (upper or lower, you choose) text fields.
[X]_ Reason field should be limited to 255 characters.
[X]_ Start & end date-times should be specified in Coordinated Universal Time (UTC).
[X]\* Two downtime windows cannot overlap for a particular telescope at a site

#### UI

You are free to organize the user-interface as you see fit as long as it has the following components:
[X]\* A form to add new downtimes as described above.

- It should validate inputs and reject invalid entries.
  []\* A component that lists _all_ downtimes sorted by the start date in descending order.
- Every item should display the downtime _ID_, _Site_, _Telescope_, _Start_, _End_.
- Should be expandable to show the downtime _Reason_.
- Be able to edit and save the _Reason_.
- Be able to delete the downtime entry.
- Bonus: the ability to filter/search by _site_ or _telescope_
  []\* Bonus: A timeline component to visualize all downtimes. (Hint: use https://visjs.github.io/vis-timeline/docs/timeline/)
