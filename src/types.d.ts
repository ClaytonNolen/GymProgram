export type TEvents = {
    // gymName: string;
    // gymDescription: string; 
    // gymDate: string; 
    // guestName: string; 
    // guestPhoto: string; 
    // guestDesignation: string; 
    // hostName: string; 
    // hostPhoto: string; 
    // hostemail: string; 
    // members: Member[];

    gymName: string;
    gymDescription: string; 
    gymDate: string; 
    guestName: string; 
    guestPhoto: string; 
    guestDesignation: string; 
    hostName: string; 
    hostPhoto: string; 
    hostemail: string; 
    members: Member[];
    maxCapacity: number;
 
};

type Member = {
    memberName: string; 
    memberLastName: string; 
    memberEmail: string; 
    memberpgoto: string; 
    memberOutcome: string;
}