export const getOtherPlayer = currentPlayer => {
    if (currentPlayer === undefined) {
        return;
    }
    return currentPlayer === 'X' ? 'O' : 'X'
}