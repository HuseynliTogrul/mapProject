import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountryDetail = createAsyncThunk(
    'country/fetchCountryDetail',
    async (countryName) => {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        return data;
    }
);

const countrySlice = createSlice({
    name: 'country',
    initialState: {
        infoData: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCountryDetail.fulfilled, (state, action) => {
                state.infoData = action.payload
            })
    }
});

export default countrySlice.reducer;