// This file creates new variable types that our used in other files of our code.
// For more information on the help we recieved for the front-end and back-end, please see the README.
export type TEvents = {
    workoutName: string;
    exercises: string[];
    sets: number[];
    reps: number[];
    weight: number[];
    workoutDate: string;
    workoutNotes: string;
    userID: string;
};

type Member = {
    memberName: string;
    memberLastName: string;
    memberEmail: string;
    memberpgoto: string;
    memberOutcome: string;
}