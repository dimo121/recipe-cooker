import React, { useState } from 'react';
import { Ingredients } from '../types/TypeDefs';
import { recipeSlice } from '../slices/recipes';
import { RecipeComp } from '../components/RecipeComp';
import { useAppDispatch, useAppSelector } from '../store/store';
import { nanoid } from '@reduxjs/toolkit';

const Recipes: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [method, setMethod] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [ingredientsCollection, setIngredients] = useState<Ingredients>({});
    //const [recipesDisplay, setRecipes] = useState<Recipe[]>([]);

    const dispatch = useAppDispatch();

    const recipesState = useAppSelector((state) => state.recipes);

    const availableIngredients = useAppSelector((state) => state.ingredients);

    const updateIngredients = (e: any) => {
        const num = parseInt(e.target.id);

        if (num % 2 === 0) {
            const element = document.getElementById(
                `${num - 1}`
            )! as HTMLInputElement;
            //find name of value being changed from previous element
            const name = element.value;

            const newCollection = Object.assign({}, ingredientsCollection);

            newCollection[name] = parseInt(e.target.value);

            setIngredients(newCollection);
        } else {
            const element = document.getElementById(
                e.target.id
            )! as HTMLInputElement;
            //find key name
            const oldName = element.getAttribute('oldname');
            //assign oldName attribute for next iteration
            element.setAttribute('oldName', e.target.value);
            //find corresponding value
            const corresElement = document.getElementById(
                `${num + 1}`
            )! as HTMLInputElement;

            let corresValue: number = parseInt(corresElement.value);

            const newCollection = Object.assign({}, ingredientsCollection);

            if (oldName) delete newCollection[oldName];

            newCollection[e.target.value] = corresValue;

            setIngredients(newCollection);
        }
    };

    const onAddIngredient = () => {
        const table = document.getElementById('ing-table')!;
        const previousId = parseInt(table.lastElementChild!.id);

        const nameId = `${previousId + 1}`;
        const quantityId = `${previousId + 2}`;

        const nameElement = document.createElement('input');
        nameElement.setAttribute('type', 'text');
        nameElement.setAttribute('id', nameId);
        nameElement.addEventListener('input', updateIngredients, false);

        const quantityElement = document.createElement('input');
        quantityElement.setAttribute('type', 'text');
        quantityElement.setAttribute('id', quantityId);
        quantityElement.addEventListener('input', updateIngredients, false);

        table.appendChild(nameElement);
        table.appendChild(quantityElement);
    };

    const OnAddRecipe = () => {
        const newRecipe = {
            id: nanoid(),
            name,
            list: ingredientsCollection,
            method,
        };

        const newCollection = [...recipesState.recipes, newRecipe];

        dispatch(recipeSlice.actions.createRecipe(newRecipe));

        localStorage.setItem('recipes', JSON.stringify(newCollection));

        setIngredients({});
    };

    return (
        <div>
            <div className="center flex-center" style={{ marginTop: '1em' }}>
                <h1 className="title-underline">Recipes</h1>
            </div>
            <div>
                {recipesState.recipes &&
                    recipesState.recipes.map((item, idx) => (
                        <div className="card-wrapper" key={idx}>
                            <RecipeComp
                                recipe={{ ...item }}
                                setError={setError}
                            />
                        </div>
                    ))}
            </div>
            <div className="center flex-center">
                <p>{error}</p>
            </div>
            <br />
            <div className="container">
                <div className="center flex-center">
                    <h1 className="title-underline">Available ingredients</h1>
                </div>
                <div>
                    <table className="table table-sm recipes--table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(availableIngredients.ingredients).map(
                                (keyName, idx) => (
                                    <tr key={idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td>{keyName}</td>
                                        <td>
                                            {
                                                availableIngredients
                                                    .ingredients[keyName]
                                            }
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex-center" style={{ marginTop: '8em' }}>
                <form className="row container">
                    <div className="col-12">
                        <div
                            className="center flex-center"
                            style={{ marginBottom: '1em' }}
                        >
                            <h1 className="title-underline">Add new recipe</h1>
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="name" className="form-label">
                            Name :
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="..."
                            className="form-control g-10"
                            style={{ fontSize: '1em' }}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div className="col-12">
                        <label htmlFor="method" className="form-label">
                            Method :
                        </label>
                        <textarea
                            style={{ height: '5em', fontSize: '1em' }}
                            id="method"
                            name="method"
                            placeholder="Instructions..."
                            className="form-control"
                            onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                            ) => setMethod(e.target.value)}
                        ></textarea>
                    </div>
                </form>
            </div>
            <div className="center">
                <h2>Ingredients </h2>
            </div>
            <div>
                <div
                    className="ingredients-table center flex-center"
                    id="ing-table"
                >
                    <label htmlFor="ing1">Name: </label>
                    <label htmlFor="ing2">Quantity: </label>
                    <input
                        type="text"
                        id="1"
                        onChange={updateIngredients}
                    ></input>
                    <input
                        type="text"
                        id="2"
                        onChange={updateIngredients}
                    ></input>
                    <input
                        type="text"
                        id="3"
                        onChange={updateIngredients}
                    ></input>
                    <input
                        type="text"
                        id="4"
                        onChange={updateIngredients}
                    ></input>
                    <input
                        type="text"
                        id="5"
                        onChange={updateIngredients}
                    ></input>
                    <input
                        type="text"
                        id="6"
                        onChange={updateIngredients}
                    ></input>
                    <input
                        type="text"
                        id="7"
                        onChange={updateIngredients}
                    ></input>
                    <input
                        type="text"
                        id="8"
                        onChange={updateIngredients}
                    ></input>
                    <input
                        type="text"
                        id="9"
                        onChange={updateIngredients}
                    ></input>
                    <input
                        type="text"
                        id="10"
                        onChange={updateIngredients}
                    ></input>
                </div>
            </div>
            <div className="center">
                <button
                    style={{
                        margin: '-1em 0 2em 0',
                        height: '2em',
                        width: '2em',
                        fontSize: '1em',
                    }}
                    className="btn btn-primary "
                    onClick={onAddIngredient}
                >
                    +
                </button>
            </div>
            <div className="center" style={{ marginBottom: '5em' }}>
                <button
                    className="btn btn-primary btn-lg custom--btn"
                    onClick={OnAddRecipe}
                >
                    Add Recipe
                </button>
            </div>
        </div>
    );
};

export default Recipes;
