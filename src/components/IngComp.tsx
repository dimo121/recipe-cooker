import React from 'react';

import { newIngredient } from '../types/TypeDefs';

interface IngCompProps {
    ingredient: newIngredient;
}

export const IngComp: React.FC<IngCompProps> = (props) => {
    const { name, quantity } = props.ingredient;

    return (
        <>
            <p>{name}</p>
            <p>{quantity}</p>
        </>
    );
};
