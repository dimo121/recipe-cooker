import React, { useEffect, useState } from 'react';
import { Ingredients, Recipe } from '../types/TypeDefs';
import { recipeSlice } from '../slices/recipes';
import { RecipeComp } from '../components/RecipeComp';
import { useAppDispatch, useAppSelector } from '../store/store';
import { nanoid } from '@reduxjs/toolkit';

const Recipes:React.FC = () => {

    const [name,setName] = useState<string>('testing');
    const [method,setMethod] = useState<string>('Add sugar on top');
    const [error,setError] = useState<string>('');
    const [ingredientsCollection,setIngredients] = useState<Ingredients>({})
    const [recipesDisplay,setRecipes] = useState<Recipe[]>([]);

    const dispatch = useAppDispatch();

    const recipesState = useAppSelector(state => state.recipes);

    useEffect(() => {

        const recipesFromLocalStorage:Recipe[] = JSON.parse(localStorage.getItem('recipes') as string);

        if(recipesFromLocalStorage){
            dispatch(recipeSlice.actions.setRecipes(recipesFromLocalStorage));
        }

    },[]);


    useEffect(() => {
        setRecipes(recipesState.recipes);
    },[recipesState])


    const updateIngredients = (e:any) => {

        const num = parseInt(e.target.id);

        console.log('Id: ',num);

        console.log('Object on handler entry:', ingredientsCollection);

        if(num%2 === 0){
            const element = document.getElementById(`${num-1}`)! as HTMLInputElement; 
            //find name of value being changed from previous element
            const name = element.value;
            
            const newCollection = Object.assign({},ingredientsCollection);

            newCollection[name] = parseInt(e.target.value);
            
            setIngredients(newCollection);

        }else{
            const element = document.getElementById(e.target.id)! as HTMLInputElement;
            //find key name
            const oldName = element.getAttribute('oldname');
            //assign oldName attribute for next iteration
            element.setAttribute('oldName', e.target.value);
            //find corresponding value
            const corresElement = document.getElementById(`${num+1}`)! as HTMLInputElement 

            let corresValue:number = parseInt(corresElement.value)

            const newCollection = Object.assign({}, ingredientsCollection);

            if(oldName) delete newCollection[oldName];

            newCollection[e.target.value] = corresValue;

            setIngredients(newCollection);
            
        }

    }


    const onAddIngredient = () => {
        const table = document.getElementById('ing-table')!;
        const previousId = parseInt(table.lastElementChild!.id)
        
        const nameId = `${previousId+1}`;
        const quantityId = `${previousId+2}`;
    
        const nameElement = document.createElement('input');
        nameElement.setAttribute('type','text');
        nameElement.setAttribute('id',nameId); 
        nameElement.addEventListener('input', updateIngredients, false);

        const quantityElement = document.createElement('input');
        quantityElement.setAttribute('type','text');
        quantityElement.setAttribute('id',quantityId); 
        quantityElement.addEventListener('input', updateIngredients, false);

        table.appendChild(nameElement);
        table.appendChild(quantityElement);
    }

    const OnAddRecipe = () => {
        
        const newRecipe = {  
            id: nanoid(),
            name,
            list:ingredientsCollection,
            method
        };

        dispatch(recipeSlice.actions.createRecipe(newRecipe));

        const newCollection = [...recipesState.recipes,newRecipe];

        localStorage.setItem('recipes', JSON.stringify(newCollection));
    }

    return (
        <div>
            <div className="">
                <h1>Recipes list:</h1>
                {recipesDisplay && recipesDisplay.map((item,idx) => 
                    <RecipeComp key={idx} recipe={{...item}} setError={setError} />
                )}
                <h2>Add new recipe:</h2>
                <label htmlFor='name'>Name : </label>
                <br/>
                <input type='text' id='name' name='name' value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                ></input>
                <br/>
                <label htmlFor='method'>Method: </label>
                <br/>
                <input style={{ width:'80%', height:'5em'}} type='text' id='method' name='method' value={method}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMethod(e.target.value)}
                ></input>
                <br/>
                <br/>
                <h2>Ingredients: </h2>
                <br/>
                <div className='ingredients-table' id='ing-table'>
                    <label htmlFor='ing1'>Name: </label>
                    <label htmlFor='ing2'>Quantity: </label>
                    <input type='text' id='1'  
                        onChange={updateIngredients}
                    ></input>
                    <input type='text' id='2'  
                        onChange={updateIngredients}
                    ></input>
                    <input type='text' id='3'  
                        onChange={updateIngredients}
                    ></input>
                    <input type='text' id='4'  
                        onChange={updateIngredients}
                    ></input>
                    <input type='text' id='5'  
                        onChange={updateIngredients}
                    ></input>
                    <input type='text' id='6'  
                        onChange={updateIngredients}
                    ></input>
                    <input type='text' id='7'  
                        onChange={updateIngredients}
                    ></input>
                    <input type='text' id='8'  
                        onChange={updateIngredients}
                    ></input>
                    <input type='text' id='9'  
                        onChange={updateIngredients}
                    ></input>
                    <input type='text' id='10'  
                        onChange={updateIngredients}
                    ></input>
                </div>
                <button onClick={onAddIngredient}>Add Ingredient</button>
                <br/>
                <br/>
                <button onClick={OnAddRecipe}>Add Recipe</button>
                <p>{error}</p>
            </div>
        </div>
    );
}

export default Recipes;