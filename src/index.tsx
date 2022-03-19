import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './router/AppRouter';

import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);
