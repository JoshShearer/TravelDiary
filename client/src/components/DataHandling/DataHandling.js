
import axios from 'axios';

axios.defaults.baseURL = "https://react-travel-diary.herokuapp.com";
// const configs = {
//   development: {
//     SERVER_URI: 'http://localhost:5001',
//   },
//   production: {
//     SERVER_URI: process.env.HEROKU_URI,
//   },
// };
// const config = configs[process.env.NODE_ENV]
// console.log("Heroku_URI ", process.env.HEROKU_URI)
// console.log("config URL ", config.SERVER_URI);

// const API_PORT = process.env.PORT || 5001
export async function getDataFromDb() { return new Promise((resolve,reject) => {

    axios
      .get("/api/getData")
      .then(res => {
        const data = [...res.data.data]
          if(data){return resolve(data)}else{return reject("error getting data")}
                  
        // console.log("Get Data", [...res.data.data]);
      })
      .catch(err => {console.log("axios error", err); return reject(err);});
  // }
})};


export async function putDataToDB(itemToUpdate, dbEntryData) { return new Promise((resolve, reject) => {
  let currentIds = dbEntryData.map(data => data.id);
  let idToBeAdded = 0;
  while (currentIds.includes(idToBeAdded)) {
    ++idToBeAdded;
  }
  const newEntry = {
    id: idToBeAdded,
    title: itemToUpdate.title,
    info: itemToUpdate.info,
    img: itemToUpdate.images,
    imgType: itemToUpdate.imageType, 
    date: itemToUpdate.date,
    time: itemToUpdate.time,
    gps: itemToUpdate.gps,
    location: itemToUpdate.location
  };

  console.log("new Entry",newEntry)
  axios
    .post("/api/putData", newEntry)
    .then(res =>( console.log("new Data success", res), resolve(res)))
    .catch(err => (console.log("itemToUpdateError", err), reject(err)));
  })
};

export async function deleteFromDB(idToDelete, dbEntryData) {  return new Promise((resolve, reject) => {
  parseInt(idToDelete);
  let objectToDelete = null;
  dbEntryData.forEach(dat => {
    if (dat.id === idToDelete) {
      objectToDelete = dat._id;
      console.log("delete",objectToDelete)
    }
  });
  try{
  axios.delete("/api/deleteData", { 
    data: {
      id: objectToDelete
    }
  })
  return resolve("delete Success")
}catch(e){return reject(e)};
})};

export async function updateDB(itemToUpdate, entryData) { return new Promise((resolve, reject) => {
  let objItemToUpdate = null;
  parseInt(itemToUpdate.id);
  entryData.forEach(dat => {
    if (dat.id === itemToUpdate.id) {
      objItemToUpdate = dat._id;
    }
  });
  try{
  axios.post("/api/updateData", {
    id: objItemToUpdate,
    update: { title: itemToUpdate.title,
              info: itemToUpdate.info,
              location : {address:itemToUpdate.address} }
  })
  return resolve("update Success")
}catch(e){return reject(e)};
})};



