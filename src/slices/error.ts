import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type errorState ={ 
    error:string
}

const initialState:errorState = { error:'' };

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        createError: (state,action:PayloadAction<string>) => {
            state.error = action.payload;
        },
        deleteError: (state) => {
            state.error = ''
        }
    }
})

export default errorSlice.reducer;