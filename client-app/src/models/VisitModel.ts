export interface IVisit{
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    attendees: [];
}

export interface NewVisit{
    title: string;
    description: string;
    category: string;
    date: Date;
    docName: string;
}