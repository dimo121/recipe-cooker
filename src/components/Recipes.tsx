import React, { useEffect, useState } from 'react';
import { Recipe } from '../types/TypeDefs';
import { recipeSlice } from '../slices/recipes';
import { RecipeComp } from '../components/RecipeComp';
import { useAppDispatch } from '../store/store';
import { nanoid } from '@reduxjs/toolkit';

const Recipes:React.FC = () => {

    const [name,setName] = useState<string>('testing');
    const [method,setMethod] = useState<string>('Add sugar on top');
    const [ingredientsCollection, setIngredients] = useState<Map<string,number>>(new Map());
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


    useEffect(() => {
        console.log('Map from useEffect ',ingredientsCollection);
    },[ingredientsCollection])


    const OnAddRecipe = () => {
        
        const newRecipe = {  
            id: nanoid(),
            name,
            list:ingredientsCollection,
            method
        };

        dispatch(recipeSlice.actions.createRecipe(newRecipe));

        setRecipes([ ...recipesCollection, newRecipe]);   
        setName('');
        setMethod('');

    }


    const handleMapChange = (e:any) => {

        const num = parseInt(e.target.id);

        console.log('Id: ',num);

        console.log('Map on handler entry:', ingredientsCollection);

        if(num%2 === 0){
            const element = document.getElementById(`${num-1}`)! as HTMLInputElement; 
            //find name of value being changed from previous element
            const name = element.value;
            
            setIngredients(new Map(ingredientsCollection.set(name,parseInt(e.target.value))));

        }else{
            const element = document.getElementById(e.target.id)! as HTMLInputElement;
            //find key name
            const oldName = element.getAttribute('oldname');

            element.setAttribute('oldName', e.target.value);
            //find corresponding value
            const corresElement = document.getElementById(`${num+1}`)! as HTMLInputElement 

            let value:number = parseInt(corresElement.value)

            if(oldName) ingredientsCollection.delete(oldName);

            const newCollection = new Map(ingredientsCollection.set(e.target.value,value));
            
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
        nameElement.addEventListener('input', handleMapChange, false);

        const quantityElement = document.createElement('input');
        quantityElement.setAttribute('type','text');
        quantityElement.setAttribute('id',quantityId); 
        quantityElement.addEventListener('input', handleMapChange, false);

        table.appendChild(nameElement);
        table.appendChild(quantityElement);
    }


    return (
        <div>
            <div className="">
                <h1>Recipes list:</h1>
                {recipesCollection?.map((item,idx) => 
                    <RecipeComp key={idx} recipe={{...item}}/>
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
                <input type='text' id='method' name='method' value={method}
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
                        onChange={handleMapChange}
                    ></input>
                    <input type='text' id='2'  
                        onChange={handleMapChange}
                    ></input>
                    <input type='text' id='3'  
                        onChange={handleMapChange}
                    ></input>
                    <input type='text' id='4'  
                        onChange={handleMapChange}
                    ></input>
                    <input type='text' id='5'  
                        onChange={handleMapChange}
                    ></input>
                    <input type='text' id='6'  
                        onChange={handleMapChange}
                    ></input>
                    <input type='text' id='7'  
                        onChange={handleMapChange}
                    ></input>
                    <input type='text' id='8'  
                        onChange={handleMapChange}
                    ></input>
                    <input type='text' id='9'  
                        onChange={handleMapChange}
                    ></input>
                    <input type='text' id='10'  
                        onChange={handleMapChange}
                    ></input>
                </div>
                <button onClick={onAddIngredient}>Add Ingredient</button>
                <br/>
                <br/>
                <button onClick={OnAddRecipe}>Add Recipe</button>
            </div>
        </div>
    );
}

export default Recipes;