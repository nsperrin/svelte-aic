import React from 'react';

function CounterButton(props) {
    const {onClick, buttonText} = props;

    return (
        <button onClick={onClick}>{buttonText}</button>
    )
}

export default CounterButton;