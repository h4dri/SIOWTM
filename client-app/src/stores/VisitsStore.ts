import { action, observable } from "mobx";
import agent from "../api/agent";
import { IVisit } from "../models/VisitModel";
import { RooteStore } from "./RootStore";

export default class VisitsStore {
    rootStore: RooteStore;
    constructor(rootStore: RooteStore){
        this.rootStore = rootStore;
    }
    
    @observable visits: IVisit[] = [];
    @observable isLoading = false;

    @action loadVisits = async () => {
        this.isLoading = true;
        try{
            const visits = await agent.Visits.list()
            visits.forEach(visit =>{
                this.visits.push(visit)
            })
            this.isLoading = false;
        } catch (error) {
            console.log(error);
            this.isLoading = false;
        }
    }
}