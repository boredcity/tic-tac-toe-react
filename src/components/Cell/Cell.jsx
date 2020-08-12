import React from 'react';
import './Cell.css'
import PropTypes from 'prop-types';

export function Cell({
    withTopBorder,
    withLeftBorder,
    onClick,
    children
}) {
    return <div
        onClick={onClick}
        className={`cell ${
            !children ? 'cell_empty': ''
        } ${
            withTopBorder ? 'cell_with-top-border' : ''
        } ${
            withLeftBorder ? 'cell_with-left-border' : ''
        }`}
    >
        {children}
    </div>
}




























export function CellFin({
    children,
    onChange,
    withTopBorder,
    withLeftBorder
}) {
    return <div
        className={`cell ${
            !children ? 'cell_empty': ''
        } ${
            withTopBorder ? 'cell_with-top-border' : ''
        } ${
            withLeftBorder ? 'cell_with-left-border' : ''
        }`}
        onClick={e => !children && onChange()}
    >
        {children}
    </div>
}

CellFin.propTypes = {
    children: function(props, propName, componentName) {
        const prop = props[propName];
        if (prop !== 'X' && prop !== 'O' && prop !== null) {
          return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Validation failed.'
          );
        }
    },
    onChange: PropTypes.func.isRequired,
    withTopBorder: PropTypes.bool,
    withLeftBorder: PropTypes.bool
}
