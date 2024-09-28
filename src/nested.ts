import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const published: Question[] = questions.filter(
        (question: Question) => question.published,
    );
    return published;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const nonEmpty: Question[] = questions.filter(
        (question: Question) =>
            question.body !== "" ||
            question.expected !== "" ||
            question.options.length > 0,
    );

    return nonEmpty;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    return questions.find((question) => question.id === id) || null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter((question) => question.id !== id);
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.map((question) => question.name);
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    return questions.reduce((total, question) => total + question.points, 0);
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    return questions.reduce((total, question) => {
        return question.published ? total + question.points : total;
    }, 0);
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    // Create the header row
    let csv = "id,name,options,points,published\n";

    // Add each question's data as a row in the CSV string
    csv += questions
        .map((question) => {
            const optionsCount = question.options ? question.options.length : 0;
            return `${question.id},${question.name},${optionsCount},${question.points},${question.published}`;
        })
        .join("\n");

    return csv;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    return questions.map((question) => ({
        questionId: question.id,
        text: "",
        submitted: false,
        correct: false,
    }));
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    return questions.map((question) => ({
        ...question, // Copy all existing properties
        published: true, // Override the published property to true
    }));
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    if (questions.length === 0) return true; // If no questions, return true by default

    const firstType = questions[0].type; // Get the type of the first question
    return questions.every((question) => question.type === firstType);
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
// export function addNewQuestion(
//     questions: Question[],
//     id: number,
//     name: string,
//     type: QuestionType,
// ): Question[] {
//     const newQuestion: Question[] = [];
//     return newQuestion;
// }
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    // Create a new question object based on the parameters
    const newQuestion: Question = {
        id,
        name,
        body: "", // Assuming body is empty for a new question
        type,
        options: type === "multiple_choice_question" ? [] : [], // Initialize options based on the type
        expected: "", // Assuming expected is empty for a new question
        points: 1, // Assuming default points is 1
        published: false, // New questions are not published by default
    };

    // Return the existing questions along with the new question
    return [...questions, newQuestion];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    return questions.map((question) => {
        // If the question's id matches the targetId, create a new question with the updated name
        if (question.id === targetId) {
            return { ...question, name: newName };
        }
        // Otherwise, return the question unchanged
        return question;
    });
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    return questions.map((question) => {
        // Check if the current question's id matches the targetId
        if (question.id === targetId) {
            // Create a new question with the updated type
            return {
                ...question,
                type: newQuestionType,
                // Set options to an empty array if the new type is not multiple choice
                options:
                    newQuestionType !== "multiple_choice_question" ?
                        []
                    :   question.options,
            };
        }
        // Return the question unchanged if the id does not match
        return question;
    });
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */

export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    return questions.map((question) => {
        // Check if this question is the one we want to edit
        if (question.id === targetId) {
            // Create a new options array based on the condition
            const updatedOptions = [...question.options];
            if (targetOptionIndex === -1) {
                // If index is -1, add the new option to the end
                updatedOptions.push(newOption);
            } else {
                // Replace the option at the specified index if it's valid
                updatedOptions[targetOptionIndex] = newOption;
            }
            // Return a new question with the updated options
            return {
                ...question,
                options: updatedOptions,
            };
        }
        // Return the question unchanged if the id does not match
        return question;
    });
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    const duplicated: Question[] = [];

    for (const question of questions) {
        duplicated.push(question); // Add the original question to the new array

        // If this question is the one we want to duplicate
        if (question.id === targetId) {
            // Create a duplicate question
            const newQuestion: Question = {
                ...question,
                id: newId, // Assign the new ID
                name: `Copy of ${question.name}`, // Modify the name to indicate it's a copy
            };
            duplicated.push(newQuestion); // Add the duplicate immediately after the original
        }
    }

    return duplicated; // Return the new array with duplicates
}
