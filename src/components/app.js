import React, { Component } from 'react';
import Parametres from './parametres';
import Plateau from './plateau';

class App extends Component {
    render() {
        return (
            <div>
                <Parametres />
                <Plateau />
            </div>
        );
    }
}

export default App;
