import React, { useEffect, useState } from 'react';
import { Ingredient, Recipe } from '../types/TypeDefs';
import { createRecipe } from '../actions/recipe-actions';
import { RecipeComp } from '../components/RecipeComp';

export const Recipes:React.FC = () => {
    
    useEffect(() => {

    setRecipes(JSON.parse(localStorage.getItem('recipes') as string ) as Recipe[]);

    },[]);

    const [name,setName] = useState<string>('testing');
    const [method,setMethod] = useState<string>('Add sugar on top');
    const [ingredientsCollection, setIngredients] = useState<Ingredient[]>([
        {id:1,name:'banana',quantity:2},
        {id:2,name:'fudge sauce',quantity:1},
        {id:3,name:'sugar',quantity:1}
    ]);
    const [recipesCollection, setRecipes] = useState<Recipe[]>([]);

    const onAddRecipe = () => {
        console.log('Adding recipe');
        createRecipe(
            name,
            ingredientsCollection,
            method,
        );
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
                <label htmlFor='name'>Method: </label>
                <br/>
                <input type='text' id='method' name='method'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMethod(e.target.value)}
                ></input>
                <br/>
                <br/>
                <label htmlFor='name'>Ingredients: </label>
                <br/>
                <div className='ingredients-table'>
                    <input type='text' id='ing1' name='ing1'
                    ></input>
                    <input type='text' id='ing2' name='ing2'
                    ></input>
                </div>
                <br/>
                <br/>
                <button onClick={() => setIngredients([
                    {id:1,name:'banana',quantity:2},
                    {id:2,name:'fudge sauce',quantity:1},
                    {id:3,name:'sugar',quantity:1}]
                )}>Reset Ingredients</button>
                <button onClick={onAddRecipe}>Add Recipe</button>
                <button>Remove Recipe</button>
            </div>
        </div>
    );
}