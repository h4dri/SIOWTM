export interface AppointmentModel{
    id: string;
    title: string;
    description: string;
    startDate: Date;
    location: string;
    doctor: string;
    patient: string;
    isShow: boolean;
}