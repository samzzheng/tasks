import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Helper function to "roll" a die.
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    const [leftDie, setLeftDieState] = useState<number>(2);
    const [rightDie, setRightDieState] = useState<number>(5);
    const [gamesStatus, setGameStatus] = useState<string>("");

    const updateGameStatus = (newLeftDie: number, newRightDie: number) => {
        if (newLeftDie === 1 && newRightDie === 1) {
            setGameStatus("Lose");
        } else if (newLeftDie === newRightDie) {
            setGameStatus("Win");
        } else {
            setGameStatus(""); // Clear the status if neither win nor lose
        }
    };

    const rollLeft = () => {
        const newLeftDie = d6();
        setLeftDieState(newLeftDie);
        updateGameStatus(newLeftDie, rightDie);
    };

    const rollRight = () => {
        const newRightDie = d6();
        setRightDieState(newRightDie);
        updateGameStatus(leftDie, newRightDie);
    };

    return (
        <div>
            <span data-testid="left-die">
                <div>{leftDie}</div>
                <div>
                    <Button onClick={rollLeft}>Roll Left</Button>
                </div>
            </span>
            <span data-testid="right-die">
                <div>{rightDie}</div>
                <div>
                    <Button onClick={rollRight}>Roll Right</Button>
                </div>
            </span>
            <div>{gamesStatus}</div>
            Two Dice
        </div>
    );
}
