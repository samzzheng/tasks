import React, { useState } from "react";
import { Button } from "react-bootstrap";

export const COLORS = ["red", "blue", "green"];
const DEFAULT_COLOR_INDEX = 0;

function ChangeColor({
    onChange,
}: {
    onChange: () => void;
}): React.JSX.Element {
    return <Button onClick={onChange}>Next Color</Button>;
}

function ColorPreview({ color }: { color: string }): React.JSX.Element {
    return (
        <div
            data-testid="colored-box"
            style={{
                width: "50px",
                height: "50px",
                backgroundColor: color,
                display: "inline-block",
                verticalAlign: "bottom",
                marginLeft: "5px",
            }}
        ></div>
    );
}

export function ColoredBox(): React.JSX.Element {
    const [colorIndex, setColorIndex] = useState<number>(DEFAULT_COLOR_INDEX);
    const currentColor = COLORS[colorIndex];

    return (
        <div>
            <h3>Colored Box</h3>
            <span>The current color is: {currentColor}</span>
            <div>
                <ChangeColor
                    onChange={() =>
                        setColorIndex((colorIndex + 1) % COLORS.length)
                    }
                />
                <ColorPreview color={currentColor} />
            </div>
        </div>
    );
}
