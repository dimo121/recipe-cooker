import React from 'react';
import { Ingredient } from '../types/TypeDefs';

interface IngCompProps {
    ingredient : Ingredient
}

export const IngComp:React.FC<IngCompProps> = (props) => {
    
    const { name, quantity } = props.ingredient;
     
    return (
        <div className="ingredient">
            <p>{name}</p>
            <p>Quantity: {quantity}</p>   
        </div>
    );
}

