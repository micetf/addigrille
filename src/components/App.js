import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Navbar from "./Navbar";
import Contact from "./Navbar/Contact";
import Paypal from "./Navbar/Paypal";
import Tools from "./Navbar/Tools";

import Parametres from "./parametres";
import Plateau from "./plateau";

class App extends Component {
    render() {
        const path = "https://micetf.fr";
        const tool = "Addi-Grille";

        return (
            <>
                <Navbar
                    path={path}
                    tool={tool}
                    right={[
                        <Paypal />,
                        <Tools path={path} />,
                        <Contact tool={tool} />,
                    ]}
                />
                <div className="card w-75 mx-auto">
                    <Parametres />
                    <Plateau />
                </div>
            </>
        );
    }
}

export default App;
