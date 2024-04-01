import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Input, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { setAddress, fetchLatLngByAddress } from '../../state/places/placesSlice';
import { styles } from './styles';

const Autocomplete = () => {
  const dispatch = useDispatch<AppDispatch>();
  const address = useSelector((state: RootState) => state.places.address);

  const handleSelect = async (value: any) => {
    dispatch(fetchLatLngByAddress(value));
    dispatch(setAddress(value));
  };
  return (
    <div
      style={{
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center'
      }}>
      <PlacesAutocomplete
        value={address}
        onChange={(value) => dispatch(setAddress(value))}
        onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps }) => {
          const listData = suggestions.map(function (item) {
            return item['description'];
          });

          return (
            <>
              <Input style={styles.input} {...getInputProps({ placeholder: 'Type address...' })} />
              {suggestions.length > 0 && (
                <List
                  size="small"
                  style={styles.list}
                  bordered
                  dataSource={listData}
                  renderItem={(item) => (
                    <List.Item
                      {...getSuggestionItemProps(
                        suggestions[suggestions.findIndex((x) => x.description === item)]
                      )}
                      style={{
                        backgroundColor: suggestions[
                          suggestions.findIndex((x) => x.description === item)
                        ].active
                          ? 'grey'
                          : 'white'
                      }}>
                      {item}
                    </List.Item>
                  )}
                />
              )}
            </>
          );
        }}
      </PlacesAutocomplete>
    </div>
  );
};

export default Autocomplete;
