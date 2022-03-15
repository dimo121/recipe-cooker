import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../reducers/ingredients';
import recipesReducer from '../reducers/recipes';

export const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        ingredients: ingredientsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch