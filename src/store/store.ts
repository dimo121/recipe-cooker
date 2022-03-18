import { configureStore } from '@reduxjs/toolkit';
import ingredientsSliceReducer from '../slices/ingredients';
import recipesSliceReducer from '../slices/recipes';
import historySliceReducer from '../slices/history';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


export const store = configureStore({
    reducer: {
        recipes: recipesSliceReducer,
        ingredients: ingredientsSliceReducer,
        history: historySliceReducer
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;