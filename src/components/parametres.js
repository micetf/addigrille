import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InputNumber from "rc-input-number";

import { changeParametre } from "../actions/";
import { createGrille } from "../actions/";
import { setVisibilityCorrection } from "../actions/";
import Svg, { REFRESH } from "./Svg";

class Parametres extends Component {
    constructor(props) {
        super(props);
        this.props.createGrille(this.props.parametres);
        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
        this.refreshAddiGrille = this.refreshAddiGrille.bind(this);
    }
    componentDidUpdate(prevProps) {
        const parametres = this.props.parametres;
        const prevParametres = prevProps.parametres;
        const recreate = Object.keys(parametres).some((parametre) => {
            return prevParametres[parametre] !== parametres[parametre];
        });
        if (recreate) {
            this.props.createGrille(parametres);
        }
    }
    toggleCheckboxChange() {
        this.props.setVisibilityCorrection();
    }
    refreshAddiGrille() {
        this.props.createGrille(this.props.parametres);
    }
    render() {
        const on = this.props.correction ? "on" : "";
        return (
            <div className="card-header text-white  bg-secondary">
                <div className="text-center row">
                    <div className="col">
                        <div className="alert-info py-1">
                            Nombre de lignes{" "}
                            <InputNumber
                                min={2}
                                max={10}
                                value={this.props.parametres.lignes}
                                style={{ width: 50 }}
                                onChange={(n) =>
                                    this.props.changeParametre({ lignes: n })
                                }
                                parser={(input) =>
                                    Math.round(input) ||
                                    this.props.parametres.lignes
                                }
                                defaultValue={2}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="alert-info py-1">
                            Nombre de colonnes{" "}
                            <InputNumber
                                min={2}
                                max={10}
                                value={this.props.parametres.colonnes}
                                style={{ width: 50 }}
                                parser={(input) =>
                                    Math.round(input) ||
                                    this.props.parametres.colonnes
                                }
                                onChange={(n) =>
                                    this.props.changeParametre({ colonnes: n })
                                }
                                defaultValue={2}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <div className="text-center row">
                    <div className="col">
                        <div className="alert-info py-1">
                            Valeur maximale des nombres à additionner{" "}
                            <InputNumber
                                min={1}
                                max={1000}
                                value={this.props.parametres.ordre}
                                style={{ width: 100 }}
                                parser={(input) =>
                                    Math.round(input) ||
                                    this.props.parametres.ordre
                                }
                                onChange={(n) =>
                                    this.props.changeParametre({ ordre: n })
                                }
                                defaultValue={10}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="alert-info py-1">
                            Nombre de décimales{" "}
                            <InputNumber
                                min={0}
                                max={2}
                                value={this.props.parametres.decimaux}
                                style={{ width: 50 }}
                                parser={(input) =>
                                    Math.round(input) ||
                                    this.props.parametres.decimaux
                                }
                                onChange={(n) =>
                                    this.props.changeParametre({
                                        decimaux: n,
                                    })
                                }
                                defaultValue={0}
                            />
                        </div>
                    </div>
                </div>

                <br />
                <div className="text-center row">
                    <div className="col">
                        <div className="alert-success">
                            <span className="switch-label">Correction </span>
                            <span
                                onClick={this.toggleCheckboxChange}
                                className={`text-left switch ${on}`}
                            >
                                <span className="switch switch-toggle"></span>
                            </span>
                        </div>
                    </div>
                    <div className="col">
                        <button
                            className="btn btn-primary"
                            onClick={this.refreshAddiGrille}
                        >
                            <Svg src={REFRESH} /> Changer de grille
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        parametres: state.parametres,
        correction: state.correction,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            changeParametre: changeParametre,
            setVisibilityCorrection: setVisibilityCorrection,
            createGrille: createGrille,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Parametres);
