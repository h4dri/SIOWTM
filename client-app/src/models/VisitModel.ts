export interface IVisit{
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    isEnded: boolean;
    attendees: OneAttendee[];
    comments: IComment[];
}

export interface IComment{
    id: string;
    createAt: Date;
    body: string;
    userName: string;
    displayName: string;
    image?: string;
}

export interface NewComment{
    visitId?: string;
    createAt: Date;
    body: string;
    userName: string;
    displayName: string;
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
    isEnded?: boolean;
}