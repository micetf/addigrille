import * as types from '../actions/actions-types';

const cellule = (ordre, puissance) => {
    return Math.floor(Math.random() * (ordre - 1) * puissance) / puissance;
}
const creerLigne = (colonnes, ordre, puissance) => {
    const ligne = [];
    for (let c = 0; c < colonnes; c ++) {
        ligne.push(cellule(ordre, puissance));
    }
    return ligne;
}
const addigrille = ({lignes, colonnes, ordre, decimaux}) => {
    const puissance = Math.pow(10, decimaux);
    const addi = {
        grille: [],
        sommes: {
            lignes: [],
            colonnes: []
        },
        total: 0
    }
    for (let l = 0; l < lignes; l++) {
        const ligne = creerLigne(colonnes, ordre, puissance);
        const somme = Math.round(ligne.reduce((s, v) => s + v * puissance, 0)) / puissance;

        addi.sommes.lignes[l] = somme;

        addi.total = Math.round((addi.total + somme) * puissance) / puissance;

        ligne.map((v, c) => {
            const somme = addi.sommes.colonnes[c] || 0;
            addi.sommes.colonnes[c] = Math.round((somme + v) * puissance) / puissance;
        });
        addi.grille.push(ligne);
    }
    return addi;
}

export default (state = [], action) => {
    switch (action.type) {
        case types.CREATE_GRILLE:
            return addigrille(action.payload);
    }
    return state;
}
