import { configureStore } from '@reduxjs/toolkit';
import countryReducer from "./slices/countrySlice";
import restCountryReducer from "./slices/restCountrySlice";

export const store = configureStore({
    reducer: {
        country: countryReducer,
        restCountry: restCountryReducer,
    },
}) 
