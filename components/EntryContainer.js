import React, { Component } from 'react';
import MapContainer from "../Components/GPSCollection";

export default class DataContainer extends Component {
  render(){
    // const { id, title, text, gps, imgs } = this.props.entry;
  return (
      <table className="Entries">
        <tbody class="row">
        <tr>
          <td class="column" className="Entries">
            <textarea cols="20" name="comments" rows="5">This will be a small placed map</textarea>
          </td>
          <td class="column">
            <p>This will show the journal entry information.  I want to see what the system will do with the extra text</p>
          </td>
          </tr>
        </tbody>
        <img src="../img/me.jpg" alt="trip photos" align="left"/>
      </table>
    );
  }
}

