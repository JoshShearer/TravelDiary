import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
}

export class CurrentLocation extends React.Component{
    constructor(props){
        super(props);

        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google){
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }
    recenterMap(){
        const map = this.map;
        const current = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }
    loadMap(){
        if (this.props && this.props.google){
            //This will chaeck to see if google is available
            const {google} = this.props
            const maps = google.maps;
            const mapRef = this.refs.map;

            //reference to the actual COM element
            const node = ReactDOM.findDOMNode(mapRef);

            let{zoom} = this.props;
            const{lat, lng} = this.state.currentLocation;
            const center = new maps.Lating(lat,lng);
            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom
                }
            );
            //maps.Map() is constructor that instantiates the map
            this.map = new maps.Map(node, mapConfig);
        }
    }
    componentDidMount(){
        if (this.props.centerAroundCurrentLocation){
            if (navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                });
            }));
        }
        this.loadMap();
    }
    renderChildren(){
        const { children } = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapsCenter: this.state.currentLocation
            });
        });
    }
    render() {
        const style = Object.assign({}, mapStyles.map);
        return (
            <div>
                <div style={style} ref="map">
                    Loading map...
                </div>
                {this.renderChildren()}
            </div>
        );
    }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
    zoom: 14, 
    initialCenter: {lat: 36.174305, lng: -115.154568},
    centerAroundCurrentLocation: false,
    visible: true
};