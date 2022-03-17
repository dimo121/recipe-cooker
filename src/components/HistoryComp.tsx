import React, { useEffect, useState } from 'react';
import { IngComp } from './IngComp';
import { HistoryItem } from '../types/TypeDefs';

interface IHistoryCompProps {
    item: HistoryItem;
}

export const HistoryComp:React.FC<IHistoryCompProps> = (props) => {

    const { recipeName, timeCooked, ingredientsUsed } = props.item;

    const [ingredientsArray,setIngredients] = useState<any[]>([]);

    useEffect(() => {
        const array = Array.from(ingredientsUsed);
        setIngredients(array);
    },[ingredientsUsed]);

    return (
        <div className="history-item">
            <p>Recipe: {recipeName}</p>
            <p>Time cooked: {timeCooked}</p>
            <h4>Ingredients used:</h4>
            {
                ingredientsArray.map((ing:[string,number], idx:number) =>
                    <IngComp key={idx} ingredient={{...ing}} />   
                )
            }
        </div>
    );
}

