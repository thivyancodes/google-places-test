import React from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import Autocomplete from '../Autocomplete/Autocomplete';
import { styles } from './styles';
const Map = () => {
  const latLng = useSelector((state: RootState) => state.places.latLng);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCCltIl-hwigBQeuolY_2jTDYL4LBhRmZA',
    libraries: ['places']
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <GoogleMap zoom={7} center={latLng} mapContainerStyle={styles.containerStyle}>
        {latLng && <MarkerF position={latLng} />}
        <Autocomplete />
      </GoogleMap>
    </div>
  );
};

export default Map;
