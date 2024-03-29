import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import sagas from '../Sagas/rootSaga'
import questionReducer from "../Components/Question/QuestionSlice";
import authReducer from "../Components/Auth/AuthSlice";
const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    question: questionReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: reducer,
    middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware],
  });
  
sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof store.getState>