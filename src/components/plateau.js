import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { focusSaisie } from "../actions/";
import { addSomme } from "../actions/";
import { addTotal } from "../actions/";

class Plateau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: {
                w: 630,
                h: 540,
                marge: 20,
            },
        };
        this.mapping = {
            sommes: {
                lignes: [],
                colonnes: [],
            },
            total: {
                lignes: {},
                colonnes: {},
            },
        };
        this.drawGrille = this.drawGrille.bind(this);
        this.onCanvasClick = this.onCanvasClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
    }

    drawGrille() {
        const ctx = this.refs.canvas.getContext("2d");
        const { w, h, marge } = this.state.canvas;
        const { lignes, colonnes } = this.props.parametres;
        const correction = this.props.correction;
        const addi = this.props.addi;
        const wCell = Math.round((w - 2 * marge) / (colonnes + 4));
        const hCell = Math.round((h - 2 * marge) / (lignes + 2));
        const taille = Math.floor(wCell / 4);

        const writeNumber = (v, x, y, d = 0, correction = null) => {
            if (correction === false) {
                return;
            }
            ctx.fillStyle = ctx.strokeStyle;
            ctx.font = taille + "px sans sherif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(
                v.toString().replace(/\./, ","),
                x + wCell / 2,
                y + hCell / 2 + d
            );
        };
        const drawArrow = (x, y, sens) => {
            ctx.beginPath();
            ctx.moveTo(x, y);
            switch (sens) {
                case "T":
                    ctx.lineTo(x, y - hCell);
                    ctx.moveTo(x - 10, y - hCell + 10);
                    ctx.lineTo(x, y - hCell);
                    ctx.moveTo(x + 10, y - hCell + 10);
                    ctx.lineTo(x, y - hCell);
                    break;
                case "B":
                    ctx.lineTo(x, y + hCell);
                    ctx.moveTo(x - 10, y + hCell - 10);
                    ctx.lineTo(x, y + hCell);
                    ctx.moveTo(x + 10, y + hCell - 10);
                    ctx.lineTo(x, y + hCell);
                    break;
                case "L":
                    ctx.lineTo(x - wCell, y);
                    ctx.moveTo(x - wCell + 10, y - 10);
                    ctx.lineTo(x - wCell, y);
                    ctx.moveTo(x - wCell + 10, y + 10);
                    ctx.lineTo(x - wCell, y);
                    break;
                case "R":
                    ctx.lineTo(x + wCell, y);
                    ctx.moveTo(x + wCell - 10, y - 10);
                    ctx.lineTo(x + wCell, y);
                    ctx.moveTo(x + wCell - 10, y + 10);
                    ctx.lineTo(x + wCell, y);
                    break;
            }
            ctx.stroke();
            ctx.closePath();
        };
        const drawTotalColonnes = (_) => {
            const x = marge;
            const y = marge + hCell * (lignes + 1);
            const focus = this.props.saisie.focus;
            if (focus && focus.stage === "total" && focus.sens === "colonnes") {
                ctx.fillStyle = "#ffc0cb";
                ctx.fillRect(x, y, wCell, hCell);
            }
            1;
            ctx.strokeStyle = "red";
            drawArrow(x + wCell * 2, y + hCell / 2, "L");
            ctx.strokeRect(x, y, wCell, hCell);
            writeNumber(this.props.saisie.total.colonnes || "", x, y);
            writeNumber(addi.total, x, y, hCell / 4, correction);

            this.mapping.total.colonnes = { x, y, wCell, hCell };
        };
        const drawTotalLignes = (_) => {
            const x = marge + wCell * (colonnes + 3);
            const y = marge + hCell * (lignes + 1);
            const focus = this.props.saisie.focus;
            if (focus && focus.stage === "total" && focus.sens === "lignes") {
                ctx.fillStyle = "#ffc0cb";
                ctx.fillRect(x, y, wCell, hCell);
            }
            1;
            ctx.strokeStyle = "red";
            drawArrow(x + wCell / 2, y - hCell, "B");
            ctx.strokeRect(x, y, wCell, hCell);
            writeNumber(this.props.saisie.total.lignes || "", x, y);
            writeNumber(addi.total, x, y, hCell / 4, correction);

            this.mapping.total.lignes = { x, y, wCell, hCell };
        };

        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#4A96AD";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeRect(0, 0, w, h);
        addi.grille.forEach((colonnes, l) => {
            colonnes.forEach((valeur, c) => {
                const x = marge + (c + 2) * wCell;
                const y = marge + l * hCell;
                ctx.strokeStyle = "blue";
                ctx.strokeRect(x, y, wCell, hCell);
                writeNumber(valeur, x, y);
            });
        });
        addi.sommes.lignes.forEach((valeur, l) => {
            const x = marge + (colonnes + 3) * wCell;
            const y = marge + l * hCell;
            const focus = this.props.saisie.focus;
            if (
                focus &&
                focus.stage === "sommes" &&
                focus.sens === "lignes" &&
                focus.index === l
            ) {
                ctx.fillStyle = "#ffc0cb";
                ctx.fillRect(x, y, wCell, hCell);
            }
            1;
            ctx.strokeStyle = "green";
            drawArrow(x - wCell, y + hCell / 2, "R");
            ctx.strokeRect(x, y, wCell, hCell);
            writeNumber(this.props.saisie.sommes.lignes[l] || "", x, y);
            writeNumber(valeur, x, y, hCell / 4, correction);

            this.mapping.sommes.lignes[l] = { x, y, wCell, hCell };
        });
        addi.sommes.colonnes.forEach((valeur, c) => {
            const x = marge + (c + 2) * wCell;
            const y = marge + (lignes + 1) * hCell;
            const focus = this.props.saisie.focus;
            if (
                focus &&
                focus.stage === "sommes" &&
                focus.sens === "colonnes" &&
                focus.index === c
            ) {
                ctx.fillStyle = "#ffc0cb";
                ctx.fillRect(x, y, wCell, hCell);
            }
            1;
            ctx.strokeStyle = "green";
            drawArrow(x + wCell / 2, y - hCell, "B");
            ctx.strokeRect(x, y, wCell, hCell);
            writeNumber(this.props.saisie.sommes.colonnes[c] || "", x, y);
            writeNumber(valeur, x, y, hCell / 4, correction);

            this.mapping.sommes.colonnes[c] = { x, y, wCell, hCell };
        });

        drawTotalLignes();
        drawTotalColonnes();
    }
    onCanvasClick(e) {
        if (this.props.correction) {
            return false;
        }
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        const is = (stage, sens) => {
            if (stage === "total") {
                const coord = this.mapping[stage][sens];
                if (x < coord.x || x > coord.x + coord.wCell) return null;
                if (y < coord.y || y > coord.y + coord.hCell) return null;
                return { stage, sens };
            }
            return this.mapping[stage][sens].reduce((trouve, coord, index) => {
                if (x < coord.x || x > coord.x + coord.wCell) return trouve;
                if (y < coord.y || y > coord.y + coord.hCell) return trouve;
                return { stage, sens, index };
            }, null);
        };
        const focus =
            is("sommes", "lignes") ||
            is("sommes", "colonnes") ||
            is("total", "lignes") ||
            is("total", "colonnes");
        this.props.focusSaisie(focus);
    }

    componentDidMount() {
        this.drawGrille();
    }
    componentDidUpdate() {
        this.drawGrille();
        if (this.props.saisie.focus) {
            this.refs.saisie.focus();
        }
    }

    onInputChange(e) {
        const value = e.target.value;
        const focus = this.props.saisie.focus;
        if (focus.stage === "sommes") {
            this.props.addSomme({ ...focus, value });
        } else if (focus.stage === "total") {
            this.props.addTotal({ ...focus, value });
        }
    }
    onInputBlur() {
        this.props.focusSaisie({});
    }

    render() {
        const input = this.props.saisie.focus
            ? this.props.saisie.focus.value || ""
            : "";

        return (
            <div className="card-body text-center bg-dark">
                <canvas
                    ref="canvas"
                    onClick={this.onCanvasClick}
                    width={this.state.canvas.w}
                    height={this.state.canvas.h}
                ></canvas>
                <input
                    className="sr-only"
                    value={input}
                    onBlur={this.onInputBlur}
                    onChange={this.onInputChange}
                    ref="saisie"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        parametres: state.parametres,
        addi: state.addi,
        saisie: state.saisie,
        correction: state.correction,
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            focusSaisie: focusSaisie,
            addSomme: addSomme,
            addTotal: addTotal,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Plateau);
