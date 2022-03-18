import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CookingHistory, HistoryItem } from '../types/TypeDefs';

type historyState ={ 
    history: CookingHistory
}

const initialState:historyState = { history: [] };

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        createHistory: (state,action:PayloadAction<HistoryItem>) => {
            const { id, recipeName, timeCooked, ingredientsUsed} = action.payload;
            state.history.push({ id,recipeName,timeCooked,ingredientsUsed });
        },
        setHistory: (state,action:PayloadAction<CookingHistory>) => {
            state.history = action.payload;
        }
    }
})

export default historySlice.reducer;