import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import '../src/App.css'
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
   ubicaciones: []
  }
  componentDidMount() {
    axios.get(`http://172.30.15.5:3015/api/mapaapi`)
      .then(res => {
        const ubicaciones = res.data;
        this.setState({ ubicaciones });})  
  }
icon = new Icon({
   iconUrl: "https://cdn-icons-png.flaticon.com/512/6395/6395324.png",
   iconSize: [23, 23]
 });
render(){ 
    console.log(this.state.ubicaciones.length)
    if (this.state.ubicaciones.length != 0 && this.state.ubicaciones.length != undefined  ) {
      return (
      
        <div id="MapContainer">
          
        <Map center={[-27.380384, -55.918672]} zoom={14}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/> 
          
          {this.state.ubicaciones.map (person =>
            <Marker position={[person.latitud, person.longitud]} icon={this.icon}>
            <Popup>{person.descripcionEstadoVehiculo} 
              <p>Linea:{person.abreviaturaLinea}</p>
              <p>Chofer: {person.apellidoChofer} {person.nombreChofer}</p>
              <p>Codigo de Equipo: {person.codigoEquipo}</p>
              </Popup>      
           </Marker>)}
          </Map> 
          </div>
          
        );
    }else{
      return (
      
        <div id="MapContainer">
          
        <Map center={[-27.380384, -55.918672]} zoom={14}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/> 
          </Map> 
          </div>
          
        );
    }
    

}
}
setInterval('window.location.reload()' ,10000);

