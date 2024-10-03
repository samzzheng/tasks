import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function Counter(): React.JSX.Element {
    const [value, setValue] = useState<number>(0);

    return (
        <div>
            <div>
                <Button
                    onClick={() => {
                        setValue(value + 1);
                    }}
                >
                    Add One
                </Button>
            </div>
            <div>Value: {value}</div>
        </div>
    );
}
