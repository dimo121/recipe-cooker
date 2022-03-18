import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store'; 
import { ingredientSlice } from '../slices/ingredients';
//import { Ingredients } from '../types/TypeDefs';

export const Pantry:React.FC = () => {

    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');

    const dispatch = useAppDispatch();

    const ingredientsState = useAppSelector((state) => state.ingredients);

    useEffect(() => {

        if(localStorage.getItem('ingredients') !== null){
            const localObject = JSON.parse(localStorage.getItem('ingredients') as string);

            dispatch(ingredientSlice.actions.setIngredients(localObject));
        }

    },[]);


    const onAddItem = () => {

        const quantityNum = parseInt(quantity);

        dispatch(ingredientSlice.actions.addIngredient({name, quantity:quantityNum}));

        const newObject = Object.assign({},ingredientsState.ingredients);

        newObject[name] = quantityNum;

        localStorage.setItem('ingredients', JSON.stringify(newObject));

    }

    const onRemoveItem = (e:any) => {
        const buttonElement = e.currentTarget;
        const nameElement = buttonElement.previousElementSibling.previousElementSibling as HTMLInputElement;

        const searchName = nameElement!.innerHTML;

        dispatch(ingredientSlice.actions.removeIngredient(searchName));

        const newObject = Object.assign({},ingredientsState.ingredients);

        delete newObject[searchName];

        localStorage.setItem('ingredients', JSON.stringify(newObject));

    }

    return (
        <div>
            <h1>Pantry items:</h1>
            <div id='pantry-list'>
            </div>
            { Object.keys(ingredientsState.ingredients).map((keyName, idx) => {
                return (
                <div className='pantry-items' key={idx}>
                    <p>{keyName}</p>
                    <p>{ingredientsState.ingredients[keyName]}</p>
                    <button onClick={onRemoveItem}>Remove item</button>
                </div>
                )
                })
            }
            <input type='text' value={name} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}></input>
            <input type='text' value={quantity} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}></input>
            <br />
            <br />
            <button onClick={onAddItem}>Add Item</button>
        </div>
    );
}