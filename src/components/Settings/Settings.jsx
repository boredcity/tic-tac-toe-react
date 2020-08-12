import React from 'react';
import './Settings.css'

export class Settings extends React.Component {
    onChangeInput = (e) => {
        const { value } = e.target;
        this.props.onChangeBoardSize(
            Math.max(3, // не меньше 3
                Math.min(
                    15, // не больше 15
                    +value
                )
            )
        );
    }

    render() {
        return <label className="settings">
            board size:{' '}
            <input
                className="settings__input"
                type="number"
                disabled={this.props.isDisabled}
                onChange={this.onChangeInput}
            />
        </label>
    }
}





























export class SettingsFin extends React.Component {
    constructor({ fieldSize }) {
        super();
        this.state = {
            size: fieldSize || ''
        }
    }

    // getDerivedStateFromProps
    componentDidUpdate(prevProps, prevState) {
        if (this.props.fieldSize !== prevState.size) {
            this.setState({
                size: this.props.fieldSize
            })
        }
    }

    onChange = e => {
        const newSize = +e.target.value;
        this.setState({ size: newSize })
        
        const isValid = this.isValidSize(newSize);
        
        if (isValid) {
            this.props.setNewSize(newSize);
        }

        this.setState({ hasError: !isValid});
    }

    isValidSize(size) {
        return size >= 3 && size <= 15;
    }

    render() {
        const { isDisabled } = this.props;
        const { size, hasError } = this.state;

        return <label className="settings">
            board size:{' '}
            <input
                className={`settings__input ${
                    hasError
                        ? 'settings__input_with-error'
                        : ''
                    }`}
                type="number"
                value={size || ''}
                placeholder="loading"
                disabled={isDisabled}
                onChange={this.onChange}
            />
        </label>
    } 
}





























export function CellFin({
    value,
    onChange,
    withTopBorder,
    withLeftBorder
}) {
    return <div
        className={`cell ${
            !value ? 'cell_empty': ''
        } ${
            withTopBorder ? 'cell_with-top-border' : ''
        } ${
            withLeftBorder ? 'cell_with-left-border' : ''
        }`}
        onClick={e => !value && onChange()}
    >
        {value}
    </div>
}