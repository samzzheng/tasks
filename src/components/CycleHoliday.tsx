import React, { useState } from "react";
import { Button } from "react-bootstrap";

/*
🎄- Christmas
🧧 - CNY
🇺🇸 - Fourth of July
🎃 - Halloween
🍀 - Saint Patties

🎄🧧 🇺🇸🎃🍀
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
            <button
                onClick={() =>
                    setCurrentHoliday(nextAlphabeticalHoliday(currentHoliday))
                }
            >
                Advance by Alphabet
            </button>
            <button
                onClick={() =>
                    setCurrentHoliday(nextYearlyHoliday(currentHoliday))
                }
            >
                Advance by Year
            </button>
        </div>
    );
}
