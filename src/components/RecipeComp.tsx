import React from 'react';
import { Ingredient } from '../types/TypeDefs';
import { IngComp } from '../components/IngComp';

interface IRecipeProps {
    recipe: {
        name: string,
        method: string,
        list: Map<string,number>
    }
}

export const RecipeComp:React.FC<IRecipeProps> = (props) => {

    const { name, list, method } = props.recipe;

    return (
        <div className="recipe-ind">
            <p>Name : {name}</p>
            <p>Method : {method}</p>
            <p>Ingredients :</p>
            <ul>
            {
                list.forEach((value,key) => { 
                    return <li><IngComp ingredient={{name:key, quantity:value}} /></li>
                })
            }
            </ul>
            <button>Cook Recipe</button>
            <button>Delete Recipe</button>
        </div>
    );
}