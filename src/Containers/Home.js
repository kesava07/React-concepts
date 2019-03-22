import React, { Component } from 'react';
import originlaImage from '../images/ny_original.jpg';
import Header from '../Components/Header';

export default class Home extends Component {
    state = {
        pieces: [],
        shuffled: [],
        solved: []
    };

    componentDidMount() {
        const pieces = [...Array(40)]
            .map((_, i) => ({
                img: `ny_${('0' + (i + 1)).substr(-2)}.jpg`,
                order: i,
                board: "shuffled"
            }));
        this.setState({
            pieces,
            shuffled: this.shufflePieces(pieces),
            solved: [...Array(40)]
        })
    }

    shufflePieces(pieces) {
        const shuffled = [...pieces];

        for (let i = shuffled.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    handleDragStart(e, order) {
        e.dataTransfer.setData('text/plain', order);
    }

    handleDrop(e, index, targetName) {
        let target = this.state[targetName];
        if (target[index]) return;

        const pieceOrder = e.dataTransfer.getData('text');
        const pieceData = this.state.pieces.find(p => p.order === +pieceOrder);
        const origin = this.state[pieceData.board];

        if (targetName === pieceData.board) target = origin;
        origin[origin.indexOf(pieceData)] = undefined;
        target[index] = pieceData;
        pieceData.board = targetName;
        this.setState({ [pieceData.board]: origin, [targetName]: target })
    }

    renderPieceContainer(piece, index, boardName) {
        return (
            <li
                key={index}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => this.handleDrop(e, index, boardName)}>
                >
                {
                    piece && <img
                        draggable
                        onDragStart={(e) => this.handleDragStart(e, piece.order)}
                        src={require(`../images/${piece.img}`)
                        }
                        alt="logo"
                    />
                }
            </li>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="jigsaw">
                    <ul className="jigsaw__shuffled-board">
                        {
                            this.state.shuffled.map((piece, i) =>
                                this.renderPieceContainer(piece, i, 'shuffled'))
                        }
                    </ul>
                    <ol className="jigsaw__solved-board" style={{ backgroundImage: `url(${originlaImage})` }}>
                        {
                            this.state.solved.map((piece, i) =>
                                this.renderPieceContainer(piece, i, 'solved'))
                        }
                    </ol>
                </div>
            </React.Fragment>
        )
    }
}
