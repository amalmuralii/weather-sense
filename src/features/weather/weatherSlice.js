import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://api.weatherapi.com/v1/";
const API_KEY = "122be9810a064bcba4145907242008";
const OPENCAGE_API_URL = "https://api.opencagedata.com/geocode/v1/json";
const OPENCAGE_API_KEY = "dd9a267e40f345d5b8b03e383ab9e443";

const initialState = {
  weatherData: {},
  status: "idle",
  error: null,
  location: "",
  locationAPIError: null,
  weatherAPIError: null,
  searchLocationData: {
    searchData: [],
    error: null,
    status: "idle",
  },
};

// Thunk to fetch current weather data
export const fetchCurrentWeatherData = createAsyncThunk(
  "weather/fetchCurrentWeatherData",
  async (location, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=no`
      );
      return response.data;
    } catch (err) {
      console.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchLocationsData = createAsyncThunk(
  "weather/fetchLocationsData",
  async (searchLocationInput, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/search.json?key=${API_KEY}&q=${searchLocationInput}&aqi=no`
      );
      return response.data;
    } catch (err) {
      console.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchLocation = createAsyncThunk(
  "weather/fetchLocation",
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${OPENCAGE_API_URL}?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
      );
      if (response.data.results.length > 0) {
        const locationData = response.data.results[0];
        const locationName = locationData.components.city;
        return locationName;
      } else {
        return rejectWithValue("No location found");
      }
    } catch (err) {
      console.error(err.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setLocationsData: (state, action) => {
      state.setLocationsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeatherData.pending, (state) => {
        state.status = "loading";
        state.weatherAPIError = null;
      })
      .addCase(fetchCurrentWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weatherData = action.payload;
      })
      .addCase(fetchCurrentWeatherData.rejected, (state, action) => {
        console.error("Weather API Error:", action.payload);
        state.status = "failed";
        state.error = action.payload || "Failed to fetch weather data";
      })
      .addCase(fetchLocation.pending, (state) => {
        state.status = "loading";
        state.locationAPIError = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.location = action.payload;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        console.error("Location API Error:", action.payload);
        state.status = "failed";
        state.error = action.payload || "Failed to fetch weather data";
      })
      .addCase(fetchLocationsData.pending, (state) => {
        state.searchLocationData.status = "loading";
        state.searchLocationData.error = null;
      })
      .addCase(fetchLocationsData.fulfilled, (state, action) => {
        state.searchLocationData.status = "succeeded";
        state.searchLocationData.searchData = action.payload;
      })
      .addCase(fetchLocationsData.rejected, (state, action) => {
        console.error("Location API Error:", action.payload);
        state.searchLocationData.status = "failed";
        state.searchLocationData.error =
          action.payload || "Failed to fetch weather data";
      });
  },
});

// Selectors
export const selectWeatherData = (state) => state.weather.weatherData;
export const getWeatherStatus = (state) => state.weather.status;
export const getWeatherError = (state) => state.weather.weatherAPIError;
export const selectLocation = (state) => state.weather.location;
export const getWeatherLocationError = (state) =>
  state.weather.locationAPIError;
export const getAllLocationData = (state) =>
  state.weather.searchLocationData.searchData;

// Export actions (if you plan to use them)
export const { setWeatherData, setLocationsData } = weatherSlice.actions;

// Export the reducer
export default weatherSlice.reducer;
