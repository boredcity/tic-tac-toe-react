import { getOtherPlayer } from './getOtherPlayer'

// "бэкенд" хранит информацию и высчитывает, есть ли победитель.
export const fakeApi = {
    getField() {
        return new Promise(
            res => {
                const fieldString = localStorage.getItem('field');
                const field = fieldString && JSON.parse(fieldString);
                const player = localStorage.getItem('player');
                const winner = field && _checkFieldForWinCondition(field) && player
                setTimeout(() => res({ field, player, winner }), 500)
            }
        )
    },

    saveField({ field, player }, shouldCheckResult) {
        return new Promise(
            res => {
                localStorage.setItem('field', JSON.stringify(field));
                localStorage.setItem('player', player);
                let winner;
                if (shouldCheckResult) {
                    winner = _checkFieldForWinCondition(field)
                        ? getOtherPlayer(player) // player whose turn it should be now lost
                        : undefined;
                }

                setTimeout(() => res({ winner }), 300)
            }
        )
    }
}

// FIXME: check diagonals, optimize, remove duplicate code, support draw
const _checkFieldForWinCondition = (field) => {
    let winLength = field.length > 5 ? 5 : field.length;

    for (let i = 0; i < field.length; i++) {
        const row = field[i];
        const rowString = row.join('');
        if (
            rowString.includes('X'.repeat(winLength)) ||
            rowString.includes('O'.repeat(winLength))
        ) {
            return true;
        }
    }

    for (let i = 0; i < field.length; i++) {
        const col = field.map(row => row[i]);
        const colString = col.join('');
        if (
            colString.includes('X'.repeat(winLength)) ||
            colString.includes('O'.repeat(winLength))
        ) {
            return true;
        }
    }

    return false;
}