import { Ingredients } from "../types/TypeDefs";
import { newIngredient } from "../types/TypeDefs";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ingredientsState {
    ingredients: Ingredients
}

const initialState = { ingredients: new Map() } as ingredientsState;

const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addIngredient: (state,action:PayloadAction<newIngredient>) => {
            const { name,quantity } = action.payload;
            state.ingredients.set(name,quantity);
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.ingredients.delete(action.payload);
        },
        increaseQuantity: (state, action: PayloadAction<newIngredient>) => {
            const { name, quantity } = action.payload;

            const newQuantity:number = state.ingredients.get(name)! + quantity
            state.ingredients.set(name,newQuantity);
        
        },
        decreaseQuantity: (state, action: PayloadAction<newIngredient>) => {
            
            const { name, quantity } = action.payload;

            const currentQuantity:number = state.ingredients.get(name)!;

            if(currentQuantity > quantity){
                const newQuantity:number = currentQuantity - quantity;
                state.ingredients.set(name,newQuantity);
            }else if (currentQuantity === quantity){
                state.ingredients.delete(name);
            }
        },
        setIngredients: (state, action: PayloadAction<Ingredients>) => {
            state.ingredients = action.payload
        }
    }
})

export default ingredientSlice.reducer;
