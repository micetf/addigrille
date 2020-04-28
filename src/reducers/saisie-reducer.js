import * as types from '../actions/actions-types';

const somme = (state = [], action) => {
    return [
        ...state.slice(0, action.payload.index),
        action.payload.value,
        ...state.slice(action.payload.index + 1)
    ]
}
const sommes = (state = { lignes: [], colonnes: []}, action) => {
    return {
        ...state,
        [action.payload.sens]: somme(state[action.payload.sens], action)
    }
}
const total = (state = { lignes: null, colonnes: null}, action) => {
    return {
        ...state,
        [action.payload.sens]: action.payload.value
    }
}

export default (state = {}, action) => {
    switch (action.type) {
        case types.CREATE_GRILLE:
            return {
                sommes: {
                    lignes: new Array(action.payload.lignes),
                    colonnes: new Array(action.payload.colonnes)
                },
                total: {
                    lignes: null,
                    colonnes: null
                },
                focus: null
            }
        case types.ADD_SOMME:
            return {
                ...state,
                sommes: sommes(state.sommes, action),
                focus: action.payload
            };
        case types.ADD_TOTAL:
            return {
                ...state,
                total: total(state.total, action),
                focus: action.payload
            };
        case types.SET_FOCUS:
            return {
                ...state,
                focus: action.payload
            };
        case types.CHANGE_PARAMETRE:
            return {
                ...state,
                focus: null
            };
    }
    return state;
}
