import { configureStore } from '@reduxjs/toolkit';
import countryReducer from "./slices/countrySlice";
import restCountryReducer from "./slices/restCountrySlice";
// import borderCountryReducer from "./slices/borderCountrySlice"

export const store = configureStore({
    reducer: {
        country: countryReducer,
        restCountry: restCountryReducer,
        // borderCountry: borderCountryReducer,
    },
}) 