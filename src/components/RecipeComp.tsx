import React, { useEffect, Dispatch,SetStateAction } from 'react';
import { Ingredients } from '../types/TypeDefs';
import { useAppDispatch, useAppSelector } from '../store/store';
import { historySlice } from '../slices/history';
import { ingredientSlice } from '../slices/ingredients';
import { nanoid } from '@reduxjs/toolkit';
//import { IngComp } from '../components/IngComp';

interface IRecipeProps {
    recipe: {
        name: string,
        method: string,
        list: Ingredients
    },
    setError: Dispatch<SetStateAction<string>>;
}

export const RecipeComp:React.FC<IRecipeProps> = (props) => {

    const { name, list, method } = props.recipe;

    const availableIngredients = useAppSelector(state => state.ingredients);

    const dispatch = useAppDispatch();

    useEffect(() => {
       
    },[]);

    //check if enough ingredients are in the pantry, otherwise send error back to Recipes component
    const onRecipeCook = () => {

        const newPantryIngredients = Object.assign({},availableIngredients.ingredients);

        let flag = 0;

        Object.keys(list).map((keyName) => {
            if(!newPantryIngredients.hasOwnProperty(keyName)){
                flag = 1;
            } else if(newPantryIngredients[keyName] >= list[keyName]){
                                
                newPantryIngredients[keyName] -=  list[keyName];;
                
                dispatch(ingredientSlice.actions.decreaseQuantity({
                    name:keyName,
                    quantity:list[keyName]
                }));
            } else {
                flag = 1;
            }
        })

        const date = new Date();

        if(flag===0){

            const newHistoryItem = {
                id: nanoid(),
                recipeName:name,
                timeCooked: date.toLocaleString(),
                ingredientsUsed: list
            }

            dispatch(historySlice.actions.createHistory(newHistoryItem));

            if(localStorage.getItem('history') !== null){
                const currentHistory = JSON.parse(localStorage.getItem('history') as string)
                const newCollection = [...currentHistory, newHistoryItem];
                localStorage.setItem('history', JSON.stringify(newCollection));
            }else{
                localStorage.setItem('history', JSON.stringify([newHistoryItem]))
            }

            localStorage.setItem('ingredients', JSON.stringify(newPantryIngredients));
        }else{
            props.setError('Not enough ingredients to cook this recipe.');
        }
    }

    const onDeleteRecipe = () => {

    }

    return (
        <div className="recipe-component">
            <p>Name : {name}</p>
            <p>Method : {method}</p>
            <p>Ingredients :</p>
            <ul id='recipe-ing__list'>
                {
                    Object.keys(list).map((keyName,idx) => 
                    <li key={idx}>
                        <p>Name : {keyName} Quantity : {list[keyName]}</p>
                    </li>)
                }
            </ul>
            <button onClick={onRecipeCook}>Cook Recipe</button>
            <button onClick={onDeleteRecipe}>Delete Recipe</button>
        </div>
    );
}