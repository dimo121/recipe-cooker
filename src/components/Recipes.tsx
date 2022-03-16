import React, { useEffect, useState } from 'react';
import { Ingredient, Recipe } from '../types/TypeDefs';
import { recipeSlice } from '../slices/recipes';
import { RecipeComp } from '../components/RecipeComp';
import { useAppDispatch } from '../store/store';
import { nanoid } from '@reduxjs/toolkit';


const Recipes:React.FC = () => {

    const [name,setName] = useState<string>('testing');
    const [method,setMethod] = useState<string>('Add sugar on top');
    const [ingredientsCollection, setIngredients] = useState<Ingredient[]>([
        {id:1,name:'banana',quantity:2},
        {id:2,name:'fudge sauce',quantity:1},
        {id:3,name:'sugar',quantity:1}
    ]);
    const [recipesCollection, setRecipes] = useState<Recipe[]>([]);

    const dispatch = useAppDispatch();


    useEffect(() => {

        const recipesFromLocalStorage:Recipe[] = JSON.parse(localStorage.getItem('recipes') as string);

        if(recipesFromLocalStorage){
            dispatch(recipeSlice.actions.setRecipes(recipesFromLocalStorage));
            setRecipes(recipesFromLocalStorage);
        }

    },[]);

    useEffect(() => {
        if(recipesCollection)
            localStorage.setItem('recipes', JSON.stringify(recipesCollection));
    },[recipesCollection]);

    
    const OnAddRecipe = () => {
        
        const newRecipe = {  
            id: nanoid(),
            name,
            list:ingredientsCollection,
            method
        };

        dispatch(recipeSlice.actions.createRecipe(newRecipe));

        setRecipes([ ...recipesCollection, newRecipe]);   

    }

    return (
        <div>
            <div className="">
                <h1>Recipes list:</h1>
                {recipesCollection?.map((item) => 
                    <RecipeComp recipe={{...item}}/>
                )}
                <h2>Add new recipe:</h2>
                <label htmlFor='name'>Name : </label>
                <br/>
                <input type='text' id='name' name='name'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                ></input>
                <br/>
                <label htmlFor='method'>Method: </label>
                <br/>
                <input type='text' id='method' name='method'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMethod(e.target.value)}
                ></input>
                <br/>
                <br/>
                <label htmlFor='name'>Ingredients: </label>
                <br/>
                <div className='ingredients-table'>
                    <span>
                        <div>
                            <label htmlFor='ing1'>Name: </label>
                            <br />
                            <input type='text' id='ing1' name='ing1'
                            ></input>
                        </div>
                    </span>
                    <span>
                        <div>
                            <label htmlFor='ing2'>Quantity: </label>
                            <br />
                            <input type='text' id='ing2' name='ing2'
                            ></input>
                        </div>
                    </span>
                </div>
                <br/>
                <br/>
                <button onClick={() => setIngredients([]
                )}>Reset Ingredients</button>
                <button onClick={OnAddRecipe}>Add Recipe</button>
            </div>
        </div>
    );
}

export default Recipes;