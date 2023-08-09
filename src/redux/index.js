import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunks from 'redux-thunk'
import user from './reducers/user'



let state = combineReducers({
    user
})

let store = createStore(state, applyMiddleware(thunks))

export default store