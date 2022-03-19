import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { Recipe } from '../types/TypeDefs';
import { useAppDispatch, useAppSelector } from '../store/store';
import { historySlice } from '../slices/history';
import { ingredientSlice } from '../slices/ingredients';
import { recipeSlice } from '../slices/recipes';
import { nanoid } from '@reduxjs/toolkit';
//import { IngComp } from '../components/IngComp';

interface IRecipeProps {
    recipe: Recipe;
    setError: Dispatch<SetStateAction<string>>;
}

export const RecipeComp: React.FC<IRecipeProps> = (props) => {
    const { id, name, list, method } = props.recipe;

    const availableIngredients = useAppSelector((state) => state.ingredients);

    const dispatch = useAppDispatch();

    useEffect(() => {}, []);

    //check if enough ingredients are in the pantry, otherwise send error back to Recipes component
    const onRecipeCook = () => {
        const newPantryIngredients = Object.assign(
            {},
            availableIngredients.ingredients
        );

        let flag = 0;

        Object.keys(list).map((keyName) => {
            if (!newPantryIngredients.hasOwnProperty(keyName)) {
                flag = 1;
            } else if (newPantryIngredients[keyName] >= list[keyName]) {
                newPantryIngredients[keyName] -= list[keyName];

                dispatch(
                    ingredientSlice.actions.decreaseQuantity({
                        name: keyName,
                        quantity: list[keyName],
                    })
                );
            } else {
                flag = 1;
            }
        });

        const date = new Date();

        if (flag === 0) {
            const newHistoryItem = {
                id: nanoid(),
                recipeName: name,
                timeCooked: date.toLocaleString(),
                ingredientsUsed: list,
            };

            dispatch(historySlice.actions.createHistory(newHistoryItem));

            if (localStorage.getItem('history') !== null) {
                const currentHistory = JSON.parse(
                    localStorage.getItem('history') as string
                );
                const newCollection = [...currentHistory, newHistoryItem];
                localStorage.setItem('history', JSON.stringify(newCollection));
            } else {
                localStorage.setItem(
                    'history',
                    JSON.stringify([newHistoryItem])
                );
            }

            localStorage.setItem(
                'ingredients',
                JSON.stringify(newPantryIngredients)
            );
        } else {
            props.setError('Not enough ingredients to cook this recipe.');
        }
    };

    const onDeleteRecipe = () => {
        dispatch(recipeSlice.actions.deleteRecipe(id));

        const currentRecipes = JSON.parse(
            localStorage.getItem('recipes') as string
        );

        const newRecipes = currentRecipes.filter(
            (recipe: Recipe) => recipe.id !== id
        );

        localStorage.setItem('recipes', JSON.stringify(newRecipes));
    };

    return (
        <div className="card recipe--card">
            <p className="card-title card-header">{name}</p>
            <p className="card-text">{method}</p>
            <h3>Ingredients :</h3>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(list).map((keyName, idx) => (
                        <tr key={idx}>
                            <th scope="row">{idx + 1}</th>
                            <td>{keyName}</td>
                            <td>{list[keyName]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={onRecipeCook}>
                Cook Recipe
            </button>
            <button className="btn btn-primary" onClick={onDeleteRecipe}>
                Delete Recipe
            </button>
        </div>
    );
};
