import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    //In Progress States
    const [inProgress, setProgressStatus] = useState<boolean>(false);

    const startQuiz = () => {
        if (attempts > 0) {
            setProgressStatus(true);
            setAttempts(attempts - 1);
        }
    };

    const stopQuiz = () => {
        setProgressStatus(false);
    };

    const mulligan = () => {
        setAttempts(attempts + 1);
    };

    return (
        <div>
            <span>{attempts}</span>
            <div>
                <Button
                    onClick={startQuiz}
                    disabled={inProgress || attempts === 0}
                >
                    Start Quiz
                </Button>
            </div>

            <div>
                <Button onClick={stopQuiz} disabled={!inProgress}>
                    Stop Quiz
                </Button>
            </div>

            <div>
                <Button onClick={mulligan} disabled={inProgress}>
                    Mulligan
                </Button>
            </div>
        </div>
    );
}
