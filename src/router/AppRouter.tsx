
import React from 'react';
import '../styles/styles.css';

import history from '../utils/history';
import { Route, Router, Switch }  from 'react-router-dom';

import { Cooker } from '../components/Cooker';
import { Pantry } from '../components/Pantry';
import Recipes from '../components/Recipes'; 
import { Footer } from '../components/Footer';

const AppRouter:React.FC = () => {
  return (
        <Router history={history}>
          <div className='main-container'>
            <Switch>
              <Route exact path='/' component={Cooker}/>
              <Route exact path='/pantry' component={Pantry}/>
              <Route exact path='/recipes' component={Recipes}/>
            </Switch>
            <Footer />
          </div>
        </Router>
  );
}

export default AppRouter;

