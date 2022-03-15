import { Recipe } from "../types/TypeDefs";

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface recipesState {
    recipes: Recipe[]
}

const initialState = { recipes:[] } as recipesState;

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        createRecipe: (state,action:PayloadAction<Recipe>) => {
            const { id,name,list,method } = action.payload;
            state.recipes.push({id,name,list,method});
        },
        deleteRecipe: (state,action:PayloadAction<number>) => {
            state.recipes.filter(recipe => recipe.id !== action.payload);
        },
        setRecipes: (state,action:PayloadAction<Recipe[]>) => {
            state.recipes = action.payload
        }
    }
});

export default recipeSlice.reducer;