# TravelDiary

With this tool you can capture your thoughts while you are enjoying your travels.  Go back later to review details about the locations as well as your experiences.

## Demo

https://react-travel-diary.herokuapp.com/

## Requirements

The server is in the /src directory.  The client will be served via the /client directory.  Each has it's own project.json that will need to be installed.  Each directory will need its own .env file to identify:

In the server directory:

* MONGODB_URI='Your MongoDB Atlas access link'
* NODE_ENV='production or development mode'

In the client directory:

* REACT_APP_GOOGLEMAPS_API='Your google maps API Key'
* NODE_ENV="production or development mode"

## Available Scripts

    "build": "npm run build --prefix client",
    "start": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently -n 'server,client' -c 'red,green'  \"nodemon server.js\" \"npm run client\""
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run client`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console. 
It will not run the backend

### `npm run dev`

Runs the app in the development mode.\
Will open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The backend will connect to  [http://localhost:5000](http://localhost:5000) and connect the backend to mongoDB and execute api calls for Getting and Posting Data.


## Front End Menu

* Home Tab =>  Allows you to see your current location or modify the location prior to your Journal Entry.
* Add Entry Tab => Allows you to input a title and your thoughts/experiences at the selected Location.  When you tap the Enter button you will be routed back to the Entries Page to view your journal entires.
* Route Tab =>  Allows you to see all your entries on the maps.  Select the Marker to see more information about that location.
* Entries Tab =>  A collection of all of your entries.  You can edit the entry title, your thoughts and the address of the location. 

## Browser Note

You may need to allow location services via the browser.  This app will request geolocation permission from the browser.  If permission is denied it will load the default location and you can navigate via the map to your current position. 