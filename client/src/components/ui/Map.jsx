import React from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";

const CustomMap = () => {
  const [markerLocation, setMarkerLocation] = React.useState({
    lat: 51.509865,
    lng: -0.118092,
  });

  return (
    <Map
      initialCenter={markerLocation}
      zoom={12}
      style={{ width: "100%", height: "300px" }}
    >
      <Marker position={markerLocation} />
    </Map>
  );
};

export default CustomMap;