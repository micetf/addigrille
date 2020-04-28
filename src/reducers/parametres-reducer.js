import * as types from '../actions/actions-types';

export default (state = {lignes: 3, colonnes: 3, ordre: 10, decimaux: 0, correction: false}, action) => {
    switch (action.type) {
        case types.CHANGE_PARAMETRE:
            return {
                ...state,
                ...action.payload
            }
        case types.SET_FOCUS:
            return {
                ...state,
                correction: false
            }
    }
    return state;
}
