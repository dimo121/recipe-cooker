import { Recipe } from '../types/TypeDefs';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRecipesState {
    recipes: Recipe[];
}

const initialState = { recipes: [] } as IRecipesState;

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        createRecipe: (state, action: PayloadAction<Recipe>) => {
            const { id, name, list, method } = action.payload;
            state.recipes.push({ id, name, list, method });
        },
        deleteRecipe: (state, action: PayloadAction<string>) => {
            state.recipes = state.recipes.filter(
                (recipe) => recipe.id !== action.payload
            );
        },
        setRecipes: (state, action: PayloadAction<Recipe[]>) => {
            state.recipes = action.payload;
        },
    },
});

export default recipeSlice.reducer;
