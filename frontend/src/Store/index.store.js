import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducer/index.reducer";
import sagas from "./saga/index.saga"; 

const REDUCERS = combineReducers(reducers);

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState = {}) {
    const STORE = createStore(
        REDUCERS,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );

    STORE.runSaga = sagaMiddleware.run
    STORE.runSaga(sagas)

    return STORE;
}
