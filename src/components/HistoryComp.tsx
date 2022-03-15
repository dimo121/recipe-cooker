import React from 'react';
import { IngComp } from './IngComp';
import { HistoryItem, Ingredient } from '../types/TypeDefs';

interface IHistoryCompProps {
    item: HistoryItem;
}

export const HistoryComp:React.FC<IHistoryCompProps> = (props) => {

    const { recipeName, timeCooked, ingredientsUsed } = props.item;
     
    return (
        <div className="history-item">
            <p>Recipe: {recipeName}</p>
            <p>Time cooked: {timeCooked}</p>
            <h4>Ingredients used:</h4>
            {
                ingredientsUsed.map((ing:Ingredient, idx:number) =>
                    <IngComp key={idx} ingredient={{...ing}} />   
                )
            }
        </div>
    );
}

