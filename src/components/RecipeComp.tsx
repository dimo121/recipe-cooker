import React, { useEffect, useState } from 'react';
//import { newIngredient } from '../types/TypeDefs';
//import { IngComp } from '../components/IngComp';

interface IRecipeProps {
    recipe: {
        name: string,
        method: string,
        list: Map<string,number>
    }
}

export const RecipeComp:React.FC<IRecipeProps> = (props) => {

    const { name, list, method } = props.recipe;

    const [ingredientsArray,setIngredients] = useState<any[]>([]);

    useEffect(() => {
        const array = Array.from(list);
        setIngredients(array);
    },[list]);

    //console.log(ingredientsArray);

    return (
        <div className="recipe-ind">
            <p>Name : {name}</p>
            <p>Method : {method}</p>
            <p>Ingredients :</p>
            <ul id='recipe-ind__list'>
                {
                    ingredientsArray.map((item,idx) => 
                    <li key={idx}>
                        <p>Name : {item.name} Quantity : {item.quantity}</p>
                    </li>)
                }
            </ul>
            <button>Cook Recipe</button>
            <button>Delete Recipe</button>
        </div>
    );
}