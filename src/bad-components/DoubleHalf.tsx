import React, { useState } from "react";
import { Button } from "react-bootstrap";

function Doubler({ onDouble }: { onDouble: () => void }): React.JSX.Element {
    return <Button onClick={onDouble}>Double</Button>;
}

function Halver({ onHalve }: { onHalve: () => void }): React.JSX.Element {
    return <Button onClick={onHalve}>Halve</Button>;
}

export function DoubleHalf(): React.JSX.Element {
    const [dhValue, setDhValue] = useState<number>(10);

    const handleDouble = () => {
        setDhValue((prevValue) => prevValue * 2);
    };

    const handleHalve = () => {
        setDhValue((prevValue) => prevValue * 0.5);
    };

    return (
        <div>
            <h3>Double Half</h3>
            <div>
                The current value is: <span>{dhValue}</span>
            </div>
            <Doubler onDouble={handleDouble} />
            <Halver onHalve={handleHalve} />
        </div>
    );
}
