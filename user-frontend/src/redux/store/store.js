import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers/reducer'
import { socketMiddleWare } from '../middleswares/socket_io';

const middleware = [socketMiddleWare];

const store = createStore(
    reducer,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)


export default store;