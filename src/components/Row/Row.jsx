import React from 'react';
import { Cell, CellFin } from '../Cell/Cell'
import './Row.css'

export function Row({ isFirst, value, onMoveMade }) {
    return (
        <div className="row">
            {
                value.map(
                    (cellValue, i) => <Cell
                        key={i}
                        withLeftBorder={i === 0}
                        withTopBorder={isFirst}
                        onClick={() => onMoveMade(i)}
                    >
                        {cellValue}
                    </Cell>
                )
            }
        </div>
    );
}






















export function RowFin({
    withTopBorder,
    value,
    onChange
}) {
    return (
        <div className="row">
            {value
                .map((val, i) =>
                    <CellFin
                        onChange={() => onChange(i)}
                        key={i}
                        withTopBorder={withTopBorder}
                        withLeftBorder={i === 0}
                    >
                        {val}
                    </CellFin>
                )}
        </div>
    );
}