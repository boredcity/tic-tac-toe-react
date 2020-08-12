import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Row, RowFin } from '../Row/Row'
import { Settings, SettingsFin } from '../Settings/Settings'
import { fakeApi } from '../../utils/api';
import { range } from '../../utils/range';
import { getOtherPlayer } from '../../utils/getOtherPlayer';

export function App() {
    const [board, setBoard] = useState()
    const [currentPlayer, setCurrentPlayer] = useState('X');

    useEffect(() => {
        fakeApi.getField().then(
            ({ field, player }) => {
                if (field) {
                    setBoard(field);
                } else {
                    // если "бэкенд" ничего не вернул
                    setBoard([
                        [null, null, null],
                        [null, null, null],
                        [null, null, null]
                    ])
                }
                if (player) {
                    setCurrentPlayer(player)
                }
            }
        )
    }, [setBoard, setCurrentPlayer]);

    const onMoveMade = (rowIndex, cellIndex) => {
        const isCellEmpty = board[rowIndex][cellIndex] === null;
        if (!isCellEmpty) {
            return;
        }
        const newBoard = [ ...board ];
        newBoard[rowIndex] = board[rowIndex].map((val, i) => {
            return i === cellIndex
                ? currentPlayer
                : val
        })

        setBoard(newBoard)
        const newPlayer = getOtherPlayer(currentPlayer);

        // передаем данные "бэкенду"
        fakeApi.saveField({ field: newBoard, player: newPlayer })

        setCurrentPlayer(newPlayer)
    }

    const onChangeBoardSize = useCallback((newSize) => {
        const emptyBoard = range(newSize)
            .map(v => range(newSize));

        setBoard(emptyBoard)

        // передаем данные "бэкенду"
        fakeApi.saveField({ field: emptyBoard, player: 'X' })
    }, [])

    return <div className="app">
        <Settings
            onChangeBoardSize={onChangeBoardSize}
            isDisabled={!board}
        />
        <div className="app__base">
            {board === undefined
                ? '⏳'
                : board.map(
                    (v, i) => <Row
                        key={i}
                        isFirst={i === 0}
                        value={board[i]}
                        onMoveMade={(cellIndex) => onMoveMade(i, cellIndex)}
                    />
                )
            }
        </div>
    </div>
}



















export function AppFin() {
    const [field, setField] = useState();
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(false);

    const setNewSize = useCallback(newSize => {
        const newField = Array.from({length: newSize })
            .map(() => Array.from({ length: newSize })
                .fill(null));
        setField(newField);
        setCurrentPlayer('X');
        setWinner(undefined);
        fakeApi.saveField({ field: newField, player: 'X' })
    }, [])

    useEffect(() => {
        fakeApi.getField().then(
            ({ field, player, winner }) => {
                if (field) {
                    setField(field);
                    setCurrentPlayer(player || 'X')
                    setWinner(winner);
                } else {
                    setNewSize(3);
                }
            }
        )
    }, [setNewSize]);

    const renderRow = (row, i) =>
        <RowFin
            key={i}
            value={row}
            onChange={(cellIndex) => {
                const newField = field.slice();
                newField[i][cellIndex] = currentPlayer;
                const nextPlayer = getOtherPlayer(currentPlayer);
                setField(newField);
                fakeApi.saveField({
                    field: newField,
                    player: nextPlayer
                }, true)
                    .then(({ winner }) => {
                        if (winner) {
                            setWinner(winner)
                        } else {
                            setCurrentPlayer(nextPlayer)
                        }
                    })
                setCurrentPlayer(undefined);
            }}
            withTopBorder={i === 0}
        />

    let fieldMarkup = '⏳';

    if (winner) {
        fieldMarkup = <div>
            Game Won by {winner}!{' '}
            <button onClick={() => {
                setNewSize(field.length);
            }}>restart</button>
        </div>
    } else if (field) {
        fieldMarkup = <div
            className={`app__base ${currentPlayer === undefined ? `app__base_loading` : ''}`}
        >
            {field.map(renderRow)}
        </div>
    }

    return (
        <div className="app">
            <SettingsFin
                isDisabled={!field || !currentPlayer}
                fieldSize={field && field.length}
                setNewSize={setNewSize}
            />
            {fieldMarkup}
        </div>
    );
}
