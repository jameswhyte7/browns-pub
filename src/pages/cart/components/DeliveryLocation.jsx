import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";

// const libraries = ["places"];
const apiKey = "AIzaSyBDv58a4HaZFQWuHSuMLdGtmOsy4pYoXeg";

function DeliveryLocation() {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [center, setCenter] = useState({
    lat: 5.6218178,
    lng: -0.0637624,
  });

  const onPlacesChanged = () => {
    const places = map.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    setCenter(place.geometry.location.toJSON());
    setMarkerPosition(place.geometry.location.toJSON());
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <input
        type="text"
        placeholder="Search for location"
        onChange={onPlacesChanged}
      />
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={17}
        center={center}
      >
        <MarkerF position={center} title="Cafe KNK" />
      </GoogleMap>
    </LoadScript>
  );
}

export default DeliveryLocation;
