import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export const fetchLatLngByAddress = createAsyncThunk(
  'places/fetchLatLngByAddress',
  async (address: string) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    return latLng;
  }
);
interface PlacesState {
  value: number;
  address: any;
  latLng: {
    lat: number;
    lng: number;
  };
}

const initialState: PlacesState = {
  value: 0,
  address: '',
  latLng: {
    lat: 4.210484,
    lng: 101.975766
  }
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLatLngByAddress.fulfilled, (state, action) => {
      state.latLng = action.payload;
    });
  }
});

export const { setAddress } = placesSlice.actions;

export default placesSlice.reducer;
