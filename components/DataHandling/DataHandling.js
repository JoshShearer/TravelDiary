import React, { Component } from 'react';
import axios from 'axios';

 export default class DataHandling extends Component{
  constructor(props) {
    super(props);

    this.state = {
        dataState: [],
        intervalIsSet: false,
        Interval: 0
    }
  }
    // componentDidMount() {
    // this.getDataFromDb();
    // if (!this.state.intervalIsSet) {
    //     let interval = this.setState({Interval: 2000});
    //     this.setState({intervalIsSet:interval});
    // }
    // return function unmounting() {
    //     if (this.state.intervalIsSet) {
    //     clearInterval(this.state.intervalIsSet);
    //     this.setState({intervalIsSet:null});
    //     console.log("unmounting now");
    //     }
    //    };
    // };
    

    getDataFromDb(){
        axios
          .get("http://localhost:3001/api/getData")
          .then(res => {
            this.props.EData([...res.data.data]);
          })
          .catch(err => console.log("axios error", err));
      };
    

    putDataToDB() {
        let currentIds = this.props.entryData.map(data => data.id);
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
          .post("http://localhost:3001/api/putData", newEntry)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      };

    deleteFromDB = idToDelete => {
        parseInt(idToDelete);
        let objectToDelete = null;
        this.props.delData.forEach(dat => {
          if (dat.id === idToDelete) {
            objectToDelete = dat.id;
          }
        });
    
        axios.delete("http://localhost:3001/api/deleteData", {
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
    
        axios.post("http://localhost:3001/api/updateData", {
          id: objIdToUpdate,
          update: { title: updateToApply }
        });
      }

    checkSwitch = (operation) => {

      switch(operation) {
    
        case 'Put':
          this.putDataToDB();
          break;
        
        case 'Get':
          this.getDataFromDb();
          break;
    
        case 'Update':
          this.updateDB();
          break;
    
        case 'Delete':
          this.deleteFromDB();
          break;
    
        default:
          // Alert.alert("NUMBER NOT FOUND");
      
        }
    
    }


      render(){
        // this.getDataFromDb()
        this.checkSwitch(this.props.op)
        return(
          <div></div>
        )
      }
    }