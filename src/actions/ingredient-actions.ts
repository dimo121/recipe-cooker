import { createAction, nanoid } from '@reduxjs/toolkit';
import { Ingredient } from '../types/TypeDefs';

export const addIngredient = createAction('addIngredient', function prepare(name: string, quantity: number) {
    return {
        payload: {
            name,
            quantity,
            id: nanoid()
        }
    }
});

export const removeIngredient = createAction<number>('removeIngredient');

export const increaseQuantity = createAction<number>('increaseQuantity');

export const decreaseQuantity = createAction<number>('decreaseQuantity');

export const setIngredients = createAction<Ingredient[]>('setIngredients');