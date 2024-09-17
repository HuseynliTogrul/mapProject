import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCountryContent = createAsyncThunk(
    'restCountry/fetchCountryContent',
    async () => {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await response.json();
        return data
    })


const restCountrySlice = createSlice({
    name: 'restCountry',
    initialState: {
        infoData: []
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCountryContent.fulfilled, (state, action) => {
                state.infoData = action.payload;
            })
    }
})

export default restCountrySlice.reducer;