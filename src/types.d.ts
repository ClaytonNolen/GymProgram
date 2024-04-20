export type TEvents = {
    workoutName: string;
    exercises: string[];
    sets: number[];
    reps: number[];
    weight: number[];
    workoutDate: string;
    workoutNotes: string;
    currentUser: User;
};

type Member = {
    memberName: string;
    memberLastName: string;
    memberEmail: string;
    memberpgoto: string;
    memberOutcome: string;
}