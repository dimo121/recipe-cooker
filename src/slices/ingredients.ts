import { Ingredients } from '../types/TypeDefs';
import { newIngredient } from '../types/TypeDefs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ingredientsState {
    ingredients: Ingredients;
}

const initialState = { ingredients: {} } as ingredientsState;

export const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<newIngredient>) => {
            const { name, quantity } = action.payload;
            const newState = Object.assign({}, state.ingredients);
            newState[name] = quantity;

            state.ingredients = newState;
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            delete state.ingredients[action.payload];
        },
        increaseQuantity: (state, action: PayloadAction<newIngredient>) => {
            const { name, quantity } = action.payload;
            state.ingredients[name] += quantity;
        },
        decreaseQuantity: (state, action: PayloadAction<newIngredient>) => {
            const { name, quantity } = action.payload;

            const currentQuantity: number = state.ingredients[name];

            if (currentQuantity > quantity) {
                state.ingredients[name] -= quantity;
            } else if (currentQuantity === quantity) {
                delete state.ingredients[name];
            }
        },
        setIngredients: (state, action: PayloadAction<Ingredients>) => {
            state.ingredients = action.payload;
        },
    },
});

export default ingredientSlice.reducer;
