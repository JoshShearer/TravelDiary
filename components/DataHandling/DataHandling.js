import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.baseURL = "https://react-traveldiary.web.app/"
 export default class DataHandling extends Component{
  constructor(props) {
    super(props);

    this.state = {
        dataState: [],
        intervalIsSet: false,
        Interval: 0
    }
  }    

    getDataFromDb(){
        axios
          .get("http://localhost:5001/api/getData")
          .then(res => {
            this.props.EData([...res.data.data]);
          })
          .catch(err => console.log("axios error", err));
      };
    

    putDataToDB(entryData) {
        let currentIds = entryData.map(data => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
          ++idToBeAdded;
        }
        const newEntry = {
          id: idToBeAdded,
          title: this.props.newData.title,
          info: this.props.newData.info,
          img: this.props.newData.images,
          imgType: this.props.newData.imageType, 
          date: this.props.newData.date,
          time: this.props.newData.time,
          gps: this.props.newData.gps,
          location: this.props.newData.location
        };
        // this.props.newData({dataState:[...dataState, newEntry]});?
        console.log(newEntry)
        axios
          .post("http://localhost:5001/api/putData", newEntry)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      };

    deleteFromDB(idToDelete) {
        parseInt(idToDelete);
        let objectToDelete = null;
        this.props.entryData.forEach(dat => {
          if (dat.id === idToDelete) {
            objectToDelete = dat._id;
            console.log(objectToDelete)
          }
        });
    
        axios.delete("http://localhost:5001/api/deleteData", {
          data: {
            id: objectToDelete
          }
        });
      };
    
    updateDB = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        parseInt(idToUpdate);
        this.props.upData.forEach(dat => {
          if (dat.id === idToUpdate) {
            objIdToUpdate = dat._id;
          }
        });
    
        axios.post("http://localhost:5001/api/updateData", {
          id: objIdToUpdate,
          update: { title: updateToApply }
        });
      }

    checkSwitch = (operation) => {

      switch(operation) {
    
        case 'Put':
          this.putDataToDB(this.props.entryData);
          break;
        
        case 'Get':
          this.getDataFromDb();
          break;
    
        case 'Update':
          this.updateDB();
          break;
    
        case 'Delete':
          this.deleteFromDB(this.props.idToDelete);
          break;
    
        default:
      
        }
    
    }


      render(){
        this.checkSwitch(this.props.op)
        return(
          <div></div>
        )
      }
    }