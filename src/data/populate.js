// import mongoose from 'mongoose';
// import Diary from './Components/diary';

const entries = [
    {
        id:1,
        title: "This is my test data for loading into react",
        img: "img/me.jpg",
        info: "This is a dummy entry for the data demonstration purposes as I develop my application",
        date: "07/24/2018",
        time: "01:00",
        gps: {lat: 36.174305, lng: -115.154568},
        location: { neighborhood: "1",
                    city: "2",
                    state: "3",
                    country: "4",
                    county: '5',
                    address:"test"}
    },
    {
        id:2,
        title: "What a productive day",
        img: "img/me.jpg",
        info: "Very productive and interesting day today.  I really like the progress that I have been able to make",
        date: "07/25/2018",
        time: "02:00",
        gps: {lat: 36.174305, lng: -114.154568},
        location: { neighborhood: "1",
                    city: "2",
                    state: "3",
                    country: "4",
                    county: '5',
                    address:"test"}
    },
    {
        id:3,
        title: "Beautiful Beaches",
        img: "img/me.jpg",
        info: "Had a great day snorkeling and enjoying the local Belgium",
        date: "07/26/2018",
        time: "12:00",
        gps: {lat: 36.174305, lng: -113.154568},
        location: { neighborhood: "1",
                    city: "2",
                    state: "3",
                    country: "4",
                    county: '5',
                    address:"test"}
    },
    {
        id:4,
        title: "Lobster Delight",
        img: "img/me.jpg",
        info: "Had the best tasting lobster of all time on the boat today",
        date: "07/27/2018",
        time: "13:00",
        gps: {lat: 35.174305, lng: -112.154568},
        location: { neighborhood: "1",
                    city: "2",
                    state: "3",
                    country: "4",
                    county: '5',
                    address:"test"}
    },
    {
        id:5,
        title: "Big swells",
        img: "img/me.jpg",
        info: "What an amazing time!  Half the boat was sea sick.  I was able to enjoy every moment of the trip without getting sick.  It was an awesome experience.",
        date: "07/28/2018",
        time: "15:00",
        gps: {lat: 36.174305, lng: -111.154568},
        location: { neighborhood: "1",
                    city: "2",
                    state: "3",
                    country: "4",
                    county: '5',
                    address:"test"}
    },
];

//Connect to MongoDB
// mongoose.connect('mongodb://localhost/data');
export default function dummyEntries(){
//Go through each Entry
// entries.map(data => {
    // const entry = new Diary(data);
    // entry.save();
 return entries;}
