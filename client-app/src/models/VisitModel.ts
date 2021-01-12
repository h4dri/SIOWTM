export interface IVisit{
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    attendees: OneAttendee[];
}

interface OneAttendee{
    userName: string;
    displayName: string;
    isDoctor: boolean;
}

export interface NewVisit{
    title: string;
    description: string;
    category: string;
    date: Date;
    docName: string;
}

export interface UpdateVisitModel{
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    docName: string;
}