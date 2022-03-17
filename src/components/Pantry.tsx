import React, { useEffect, useState } from 'react';

export const Pantry:React.FC = () => {

    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [ingredientsCollection, setIngredients] = useState<Map<string,number>>(new Map());
    const [ingredientsDisplay, setDisplay] = useState<[string,number][]>([]);

    useEffect(() => {

        const ingredientsFromLocalStorage:Map<string,number> = JSON.parse(localStorage.getItem('ingredients') as string);

        setIngredients(ingredientsFromLocalStorage);

    },[]);

    useEffect(() => {
        if(ingredientsCollection) { 
            setDisplay(Array.from(ingredientsCollection));
        }
    },[ingredientsCollection])

    useEffect(() => {
        if(ingredientsDisplay) localStorage.setItem('ingredients', JSON.stringify(ingredientsDisplay));
    },[ingredientsDisplay]);

    const onAddItem = () => {
        
    }

    return (
        <div>
            <h1>Pantry items:</h1>
            <div className='pantry-items' id='pantry-list'>
            </div>
            { ingredientsDisplay.map((item) => {
                const element = document.getElementById('pantry-list')!;
                const name = document.createElement('p');
                name.innerHTML = item[0];
                const quantity = document.createElement('p');
                quantity.innerHTML = item[1].toString();
                const removeButton = document.createElement('button');
                removeButton.innerHTML = 'Remove item';
                element.appendChild(name);
                element.appendChild(quantity);
                element.appendChild(removeButton);
                return 0;
                })
            }
            <input type='text' value={name} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}></input>
            <input type='text' value={quantity} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}></input>
            <button onClick={onAddItem}>Add Item</button>
        </div>
    );
}