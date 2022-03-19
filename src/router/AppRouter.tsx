import React, { useEffect } from 'react';
import '../styles/styles.css';

import history from '../utils/history';
import { Route, Router, Switch } from 'react-router-dom';
import { Recipe } from '../types/TypeDefs';
import { Cooker } from '../components/Cooker';
import { Pantry } from '../components/Pantry';
import Recipes from '../components/Recipes';
import { Header } from '../components/Header';
import { useAppDispatch } from '../store/store';
import { historySlice } from '../slices/history';
import { ingredientSlice } from '../slices/ingredients';
import { recipeSlice } from '../slices/recipes';

const AppRouter: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('history') !== null) {
            const historyFromLocalStorage = JSON.parse(
                localStorage.getItem('history') as string
            );
            dispatch(historySlice.actions.setHistory(historyFromLocalStorage));
        }

        if (localStorage.getItem('recipes') !== null) {
            const recipesFromLocalStorage: Recipe[] = JSON.parse(
                localStorage.getItem('recipes') as string
            );

            dispatch(recipeSlice.actions.setRecipes(recipesFromLocalStorage));
        }

        if (localStorage.getItem('ingredients') !== null) {
            const ingredientsFromLocalStorage = JSON.parse(
                localStorage.getItem('ingredients') as string
            );

            dispatch(
                ingredientSlice.actions.setIngredients(
                    ingredientsFromLocalStorage
                )
            );
        }
    }, []);

    return (
        <Router history={history}>
            <div className="main-container">
                <Header />
                <Switch>
                    <Route exact path="/" component={Cooker} />
                    <Route exact path="/pantry" component={Pantry} />
                    <Route exact path="/recipes" component={Recipes} />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
