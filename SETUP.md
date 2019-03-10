Environment requirement: 
- Node.js (preferably v8.0+)
- npm (preferably v4.0+)


1.  Clone this repository
    
    `git clone https://github.com/Ara-yjx/takehomeinterview.git .`

2.  Install backend

    `$ cd ./backend`
    
    `$ npm i`

3.  Launch backend

    `$ PORT=3000 npm start`

    (On Windows, use `$ npm start` instead)

4.  In another process, install frontend

    `$ cd ./frontend`

    `$ npm i`

5.  Launch frontend
    
    - Option 1: run as development server (default port: 8080) 

      `$ PORT=8080 npm run serve`
    
      (On Windows, use `$ npm run serve` instead)


    - Option 2: build production static website

      `$ npm run build`

      The static website is in `dist/` directory. We can publish it with any http website tool, such as node http-server

      `$ cd ./dist && npm i http-server -g && http-server ./ -p 8080`

      (might require admin authority)

    Then visit `http://localhost:8080/` (or your custom port)

