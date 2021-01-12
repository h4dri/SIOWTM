import { action, observable } from "mobx";
import agent from "../api/agent";
import { RooteStore } from "./RootStore";

export default class DoctorsStore{
    rootStore: RooteStore;
    constructor(rootStore: RooteStore){
        this.rootStore = rootStore;
    }

    @observable doctors: String[] = [];
    @observable isLoading = false;

    @action loadDoctors = async () => {
        this.isLoading = true;
        try{
            this.doctors = await agent.Doctors.list()
            this.isLoading = false;
        } catch (error) {
            console.log(error);
            this.isLoading = false;
        }
    }
}