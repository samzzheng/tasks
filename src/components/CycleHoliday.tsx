import React, { useState } from "react";
import { Button } from "react-bootstrap"; // This import is necessary since you're using Button

/*
🎄 - Christmas
🧧 - Chinese New Year (CNY)
🇺🇸 - Fourth of July
🎃 - Halloween
🍀 - Saint Patrick's Day
*/

type Holiday = "🎄" | "🧧" | "🇺🇸" | "🎃" | "🍀";

export function CycleHoliday(): React.JSX.Element {
    const alphabeticalOrder: Holiday[] = ["🎄", "🎃", "🍀", "🇺🇸", "🧧"];
    const yearlyOrder: Holiday[] = ["🍀", "🇺🇸", "🎃", "🧧", "🎄"];
    const [currentHoliday, setCurrentHoliday] = useState<Holiday>("🎄");

    // Function to get the next holiday alphabetically
    const nextAlphabeticalHoliday = (holiday: Holiday): Holiday => {
        const currentIndex = alphabeticalOrder.indexOf(holiday);
        return alphabeticalOrder[(currentIndex + 1) % alphabeticalOrder.length];
    };

    // Function to get the next holiday by time of the year
    const nextYearlyHoliday = (holiday: Holiday): Holiday => {
        const currentIndex = yearlyOrder.indexOf(holiday);
        return yearlyOrder[(currentIndex + 1) % yearlyOrder.length];
    };

    return (
        <div>
            <h3>Holiday Cycle</h3>
            <p>Holiday: {currentHoliday}</p>
            <Button
                onClick={() => {
                    setCurrentHoliday(nextAlphabeticalHoliday(currentHoliday));
                }}
            >
                Advance by Alphabet
            </Button>
            <Button
                onClick={() => {
                    setCurrentHoliday(nextYearlyHoliday(currentHoliday));
                }}
            >
                Advance by Year
            </Button>
        </div>
    );
}
