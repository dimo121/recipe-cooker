import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { ingredientSlice } from '../slices/ingredients';

export const Pantry: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');

    const dispatch = useAppDispatch();

    const ingredientsState = useAppSelector((state) => state.ingredients);

    const onAddItem = () => {
        const quantityNum = parseInt(quantity);

        const newObject = Object.assign({}, ingredientsState.ingredients);

        newObject[name] = quantityNum;

        dispatch(
            ingredientSlice.actions.addIngredient({
                name,
                quantity: quantityNum,
            })
        );

        localStorage.setItem('ingredients', JSON.stringify(newObject));

        setName('');
        setQuantity('');
    };

    const onRemoveItem = (e: any) => {
        const buttonElement = e.currentTarget;
        const nameElement = buttonElement.previousElementSibling
            .previousElementSibling as HTMLInputElement;

        const searchName = nameElement!.innerHTML;

        const newObject = Object.assign({}, ingredientsState.ingredients);

        delete newObject[searchName];

        dispatch(ingredientSlice.actions.removeIngredient(searchName));

        localStorage.setItem('ingredients', JSON.stringify(newObject));
    };

    return (
        <div>
            <div className="center flex-center" style={{ margin: '1em 0' }}>
                <h1 className="title-underline">Pantry</h1>
            </div>
            <div className="pantry-list">
                <div className="pantry-list__items center">
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
                                        onClick={onRemoveItem}
                                    >
                                        Remove
                                    </button>
                                </div>
                            );
                        }
                    )}
                </div>
                <div className="pantry-input center">
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
            <div className="flex-center center">
                <button
                    className="btn btn-primary btn-lg custom--btn pantry--btn"
                    onClick={onAddItem}
                >
                    Add Item
                </button>
            </div>
        </div>
    );
};
