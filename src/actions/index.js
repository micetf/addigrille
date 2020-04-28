import * as types from './actions-types';

export const changeParametre = (parametre) => {
    return {
        type: types.CHANGE_PARAMETRE,
        payload: parametre
    }
}

export const setVisibilityCorrection = () => {
    return {
        type: types.SET_VISIBILITY_CORRECTION
    }
}

export const createGrille = (parametres) => {
    return {
        type: types.CREATE_GRILLE,
        payload: parametres
    }
}

export const addSomme = (focus) => {
    return {
        type: types.ADD_SOMME,
        payload: focus
    }
}

export const addTotal = (focus) => {
    return {
        type: types.ADD_TOTAL,
        payload: focus
    }
}

export const focusSaisie = (focus) => {
    return {
        type: types.SET_FOCUS,
        payload: focus
    }
}
