import { combineReducers } from 'redux';
import parametres from './parametres-reducer'
import addi from './addi-reducer'
import saisie from './saisie-reducer'
import correction from './correction-reducer'

const rootReducer = combineReducers({
  parametres: parametres,
  addi: addi,
  saisie: saisie,
  correction: correction
});

export default rootReducer;
