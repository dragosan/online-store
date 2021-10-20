import React, { Component } from "react"
import GoogleMapReact from "google-map-react"

const AnyReactComponent = ({ text }) => <div>{text}</div>

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 30.04,
      lng: 31.23,
    },
    zoom: 14,
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD1_Jyzy8-cRsnflfN_xEzGjMl5AjT7xhU" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={30.04442} lng={31.235712} text="here" />
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map
