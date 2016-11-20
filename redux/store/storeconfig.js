import { applyMiddleware, compose, createStore } from 'redux'
import reducer from '../reducers/reducer.js'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

let finalCreateStore = compose (
    applyMiddleware(thunk),
    applyMiddleware(logger())
)(createStore)

export default function configureStore(initialState = { todos: [] }) {
    return finalCreateStore(reducer, initialState)
}
