import { createAction, nanoid } from '@reduxjs/toolkit';
import { Ingredient } from '../types/TypeDefs';
import { Recipe } from '../types/TypeDefs'; 

export const createRecipe = createAction('removeRecipe', function prepare(name: string, list:Ingredient[], method: string) {
    return {
        payload: {
            id: nanoid(),
            name,
            list,
            method
        }
    }
})

export const deleteRecipe = createAction<number>('deleteRecipe');

export const setRecipes = createAction<Recipe[]>('setRecipes');