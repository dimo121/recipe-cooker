import { Ingredient } from "../types/TypeDefs";

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ingredientsState {
    ingredients: Ingredient[]
}

const initialState = { ingredients:[] } as ingredientsState;

const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addIngredient: (state,action:PayloadAction<Ingredient>) => {
            const { id,name,quantity } = action.payload;
            state.ingredients.push({id,name,quantity});
        },
        removeIngredient: (state, action: PayloadAction<number>) => {
            state.ingredients.filter(item => item.id !== action.payload);
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            state.ingredients.map((item) => {
                if(item.id === action.payload){
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            } else {
                return item
            }})
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            state.ingredients.map((ingredient) => {
                if(ingredient.id === action.payload){
                    if(ingredient.quantity > 1){
                        return {
                            ...ingredient,
                            quantity: ingredient.quantity - 1
                        }
                    } else {
                        return null
                    }
                } else {
                    return ingredient
                }
            })
        },
        setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
            state.ingredients = action.payload
        }
    }
})

export default ingredientSlice.reducer;
