import React from 'react';
import { Ingredient } from '../types/TypeDefs';
import { IngComp } from '../components/IngComp';

interface IRecipeProps {
    recipe: {
        name: string,
        method: string,
        list: Ingredient[]
    }
}

export const IndividualRecipe:React.FC<IRecipeProps> = (props) => {

    const { name, list, method } = props.recipe;

    return (
        <div className="recipe-ind">
            <p>{name}</p>
            <p>{method}</p>
            <p>Ingredients :</p>
            <ul>
                {list.map((ing:Ingredient) => <li><IngComp ingredient={{...ing}} /></li>)}
            </ul>
            <button>Cook Recipe</button>
        </div>
    );
}