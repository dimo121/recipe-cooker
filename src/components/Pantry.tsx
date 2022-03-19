import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { ingredientSlice } from '../slices/ingredients';

export const Pantry: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');

    const dispatch = useAppDispatch();

    const ingredientsState = useAppSelector((state) => state.ingredients);

    useEffect(() => {}, [dispatch]);

    const onAddItem = () => {
        const quantityNum = parseInt(quantity);

        dispatch(
            ingredientSlice.actions.addIngredient({
                name,
                quantity: quantityNum,
            })
        );

        const newObject = Object.assign({}, ingredientsState.ingredients);

        newObject[name] = quantityNum;

        localStorage.setItem('ingredients', JSON.stringify(newObject));
    };

    const onRemoveItem = (e: any) => {
        const buttonElement = e.currentTarget;
        const nameElement = buttonElement.previousElementSibling
            .previousElementSibling as HTMLInputElement;

        const searchName = nameElement!.innerHTML;

        dispatch(ingredientSlice.actions.removeIngredient(searchName));

        const newObject = Object.assign({}, ingredientsState.ingredients);

        delete newObject[searchName];

        localStorage.setItem('ingredients', JSON.stringify(newObject));
    };

    return (
        <div>
            <div className="center" style={{ margin: '1em 0' }}>
                <h1>Pantry</h1>
            </div>
            <div className="pantry-list">
                <div className="pantry-list__items">
                    {Object.keys(ingredientsState.ingredients).map(
                        (keyName, idx) => {
                            return (
                                <div className="pantry-list__item" key={idx}>
                                    <p>{keyName}</p>
                                    <p>
                                        {ingredientsState.ingredients[keyName]}
                                    </p>
                                    <button
                                        className="btn btn-outline-secondary btn-lg"
                                        style={{ width: '6em' }}
                                        onClick={onRemoveItem}
                                    >
                                        Remove
                                    </button>
                                </div>
                            );
                        }
                    )}
                </div>
                <div className="center">
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                    ></input>
                    <input
                        type="text"
                        value={quantity}
                        placeholder="Quantity"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setQuantity(e.target.value)
                        }
                    ></input>
                </div>
            </div>
            <br />
            <br />
            <div className="center">
                <button
                    className="btn btn-primary btn-lg pantry--btn"
                    onClick={onAddItem}
                >
                    Add Item
                </button>
            </div>
        </div>
    );
};
