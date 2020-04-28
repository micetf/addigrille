import * as types from '../actions/actions-types';

export default (state = false, action) => {
    switch (action.type) {
        case types.SET_VISIBILITY_CORRECTION:
            return !state;
        case types.CREATE_GRILLE:
            return false;
    }
    return state;
}
