import { createSlice } from "@reduxjs/toolkit";

let initialState={strValue:''}

const slice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.strValue = action.payload;
            console.log('state.strValue', state.strValue)
        },
    }
});

export default slice.reducer;
export const {setToken}=slice.actions;

                    