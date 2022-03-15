// // if (process.env.NODE_ENV !== 'production'){
// //     require('dotenv').load()
// // }

const express = require('express')
const router = express.Router()
const mongoose = require ('mongoose');
const bodyParser  = require ('body-parser');
const cors = require('cors');
const logger = require("morgan");
const DiarySchema = require('./diary')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const path = require("path");

//initialize http server
const app = express();
app.use(cors());
// app.options("*", cors());
const API_PORT = process.env.PORT || 5001;
// const router = express.Router();

//Set up the mongoDB connection
const dbRoute = 'mongodb+srv://joshshear:6408*_sel@cluster0-7x2dt.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true,
                            // useFindAndModify: false,
                            // useCreateIndex: true,
                            useUnifiedTopology: true
                            });

let db = mongoose.connection;

db.once('open',() => {console.log('connected to the database'); })

//checks if the connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

if(process.env.NODE_ENV === 'production'){
  //set the static folder
  app.use(express.static('TRAVEL-DIARY/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'TRAVEL-DIARY', 'build', 'index.html'));
  });
}


// All entries Route
router.get("/", (req, res) => {
  res.json({ message: "HELLOW WORLDUUHHHH" });
});

router.get("/getData", (req, res) => {
  DiarySchema.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// Create DairySchema Route
router.post('/putData', async (req, res) => {
  const diarySchema = new DiarySchema({
    id: req.body.id,
    title: req.body.title,
    info: req.body.info,
    images: req.body.images,
    imageTypes: req.body.imageType,
    date: req.body.date,
    time: req.body.time,
    gps: req.body.gps,
    location: req.body.location
  })
  saveImage (diarySchema, req.body.images)

  try {
    const newEntry = await diarySchema.save()
    // res.redirect(`entries/${newEntry.id}`)
    res.redirect('/')
  } catch {
    renderNewEntry(res, diarySchema, true)
  }
})

//Delete Entire Entry
 router.delete('/deleteData', (req, res) => {
        const id = req.body.id;
        
        DiarySchema.findByIdAndDelete(id, err => {
            if (err) return res.send(err);
            return res.json({ success: true });
        });
    });

async function renderNewEntry(res, diarySchema, hasError = false) {
  try {
    const params = {
     DiarySchema: diarySchema
    }
    if (hasError) params.errorMessage = 'Error Creating diarySchema'
    res.render('/putData', params)
  } catch {
    res.redirect('/')
  }
}

function saveImage (DiarySchema, imagesEncoded) {
  if (imagesEncoded == null) return

  imagesEncoded.map((imageEncoded, index) => {
    const image = JSON.parse(imageEncoded);
    if (image != null && imageMimeTypes.includes(image.type)) {
      DiarySchema.image[index] = new Buffer.from(image.data, 'base64');
      DiarySchema.imageType[index] = image.type;
  }})}

  // if (process.env.NODE_ENV === 'production') {
  //   // Serve any static files
  //   app.use(express.static(path.join(__dirname, 'client/build')));
      
  //   // Handle React routing, return all requests to React app
  //   app.get('*', function(req, res) {
  //     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  //   });
  // }
//append /api for our http requests
app.use('/api', router);

//launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

module.exports = router







