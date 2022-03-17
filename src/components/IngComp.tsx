import React from 'react';
//import { newIngredient } from '../types/TypeDefs';

interface IngCompProps {
    ingredient : any
}

export const IngComp:React.FC<IngCompProps> = (props) => {

    return (
        <div className="ingredient">
            <p>Name: {props.ingredient[0]}</p>
            <p>Quantity: {props.ingredient[1]}</p>   
        </div>
    );
}

