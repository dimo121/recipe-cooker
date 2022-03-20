import React from 'react';
import { IngComp } from './IngComp';
import { HistoryItem } from '../types/TypeDefs';

interface IHistoryCompProps {
    item: HistoryItem;
}

export const HistoryComp: React.FC<IHistoryCompProps> = (props) => {
    const { recipeName, timeCooked, ingredientsUsed } = props.item;

    return (
        <div className="card history--card">
            <p className="card-title card-header">Recipe: {recipeName}</p>
            <p className="card-text">Time cooked: {timeCooked}</p>
            <h3>Ingredients used:</h3>
            <div className="ingredients-table">
                <label htmlFor="ing3">Name: </label>
                <label htmlFor="ing4">Quantity: </label>
                {Object.keys(ingredientsUsed).map((keyName, idx) => {
                    return (
                        <IngComp
                            key={idx}
                            ingredient={{
                                name: keyName,
                                quantity: ingredientsUsed[keyName],
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
