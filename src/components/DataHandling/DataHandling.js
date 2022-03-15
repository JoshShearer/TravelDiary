
import axios from 'axios';

axios.defaults.baseURL = "https://react-traveldiary.web.app/";


function getDataFromDb(entries, setEntries) {
  // while(!updateComplete){
    axios
      .get("http://localhost:5001/api/getData")
      .then(res => {
        const data = [...res.data.data]
        if(JSON.stringify(entries) !== JSON.stringify(data)){
          setEntries([...res.data.data]);
        }
        
        console.log("Get Data", [...res.data.data]);
      })
      .catch(err => console.log("axios error", err));
  // }
};


function putDataToDB(newData, dbEntryData) {
  let currentIds = dbEntryData.map(data => data.id);
  let idToBeAdded = 0;
  while (currentIds.includes(idToBeAdded)) {
    ++idToBeAdded;
  }
  const newEntry = {
    id: idToBeAdded,
    title: newData.title,
    info: newData.info,
    img: newData.images,
    imgType: newData.imageType, 
    date: newData.date,
    time: newData.time,
    gps: newData.gps,
    location: newData.location
  };
  // this.props.newData({dataState:[...dataState, newEntry]});?
  console.log(newEntry)
  axios
    .post("http://localhost:5001/api/putData", newEntry)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

function deleteFromDB(idToDelete, dbEntryData) {
  parseInt(idToDelete);
  let objectToDelete = null;
  dbEntryData.forEach(dat => {
    if (dat.id === idToDelete) {
      objectToDelete = dat._id;
      console.log("delete",objectToDelete)
    }
  });

  axios.delete("http://localhost:5001/api/deleteData", {
    data: {
      id: objectToDelete
    }
  });
};

function updateDB (idToUpdate, newData)  {
  let objIdToUpdate = null;
  parseInt(idToUpdate);
  newData.forEach(dat => {
    if (dat.id === idToUpdate) {
      objIdToUpdate = dat._id;
    }
  });

  axios.post("http://localhost:5001/api/updateData", {
    id: objIdToUpdate,
    update: { title: newData.title }
  });
}
export default function DataHandling(newEntry, data, op){
    
  const [entries, setEntries] = data

    switch(op) {
  
      case 'Put':
        putDataToDB(newEntry, entries);
        // getDataFromDb(entries, setEntries);
        break;
      
      case 'Get':
        getDataFromDb(entries, setEntries);
        break;
  
      case 'Update':
        updateDB(newEntry.id, newEntry);
        // getDataFromDb(entries, setEntries);
        break;
  
      case 'Delete':
        deleteFromDB(newEntry.id, entries);
        // getDataFromDb(entries, setEntries);
        setEntries([])
        break;
  
      default:
    
      };  
    
}

