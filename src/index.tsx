import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './router/AppRouter';

import { Provider } from 'react-redux';
import { store } from './store/store';

//add dummy data to localStorage
localStorage.setItem(
    'ingredients',
    '{"Strawberries":47,"Red sauce":50,"pasta":50,"Juice":48,"Onions":50,"Bananas":20,"Brown lentils":483,"Red onion":47,"Bay leaves":44,"Garlic clove":42,"Olive oil":50,"Water ":40,"Olive oil ":44,"Beef mince":90,"Pork mince":93,"Sugar":95,"Tomato paste":45}'
);

const item = JSON.parse(
    '[{"id":"NB4LK3LljXg-49RPFNM0X","name":"Lentil soup","list":{"Brown lentils":17,"Water ":5,"Red onion":1,"Garlic clove":2,"Bay leaves":2,"Olive oil ":1},"method":"1)    To prepare this Greek lentil soup recipe, start by washing the lentils thoroughly and let them soak in water for about 2 hours. If you like, you can skip this process by adding them into a deep pan along with some water and place over high heat. As soon as they come to the boil, drain them into a colander.2)   Place a pan over medium-low heat and add the lentils, the water (warmed), the chopped onions, the chopped garlic and the bay leaves. Simmer with the lid on for about 25 minutes.3)    Pour in the olive oil and the red wine vinegar, and season well with salt and pepper. If you prefer your Greek lentil soup to be ‘reddened’, then add 1 tablespoon of tomato paste.4) Boil the lentil soup for another 15 minutes, until it thickens and check out if they are done; keep in my mind that different kinds of lentils cook at different times.5)    Serve this delicious Greek lentil soup with a splash of red wine vinegar and a drizzle of olive oil. Top with some crumbled feta cheese and enjoy!"},{"id":"R43LAv_Q5inXBH0rauWzt","name":"Lasagna","list":{"Olive oil ":5,"Garlic clove":4,"Beef mince":10,"Pork mince":7,"Sugar":5,"Tomato paste":5},"method":"    Heat oil in a large pot over medium heat, then add in the onion and carrots and cook for 8-10 minutes, or until softened. Add in the garlic and sauté for about 1 minute, until fragrant.Add beef and pork (if using) and cook while breaking it up with the end of your spoon, until browned.Pour in the Passata, crushed tomatoes, tomato paste, crushed bouillon and dried herbs. Mix well to combine and bring to a gentle simmer. Season with desired amount of salt and pepper (I use about 3/4 teaspoon each) and sugar if needed. Cover and cook for about 20-30 minutes, occasionally mixing, until the sauce has thickened slightly and meat is tender. Adjust salt, pepper and dried herbs to your taste."}]'
);

const stringItem = JSON.stringify(item);

localStorage.setItem('recipes', stringItem);

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);
