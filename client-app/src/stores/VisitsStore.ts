import { throws } from "assert";
import { action, observable } from "mobx";
import agent from "../api/agent";
import { IVisit, NewVisit, UpdateVisitModel } from "../models/VisitModel";
import { RooteStore } from "./RootStore";

export default class VisitsStore {
    rootStore: RooteStore;
    constructor(rootStore: RooteStore){
        this.rootStore = rootStore;
    }
    
    @observable visits: IVisit[] = [];
    @observable endedVisits: IVisit[] = [];
    @observable isLoading = false;
    @observable closeVisit: IVisit | undefined;

    @action loadVisits = async () => {
        this.isLoading = true;
        try{
            const visits = await agent.Visits.list()
            visits.forEach(visit => {
                visit.isEnded ? this.endedVisits.push(visit) : this.visits.push(visit)
            })
            this.visits.forEach(visit => {
                if(this.closeVisit === undefined) this.closeVisit = visit
                else if(this.closeVisit.date > visit.date) this.closeVisit = visit
            })
            this.isLoading = false;
        } catch (error) {
            console.log(error);
            this.isLoading = false;
        }
    }

    @action deleteVisit = async (id: string) => {
        try{
            await agent.Visits.delete(id);
        } catch (error) {
            console.log(error)
        }
    }

    @action createVisit = async (value: NewVisit) => {
        try{
            await agent.Visits.create(value);
        } catch (error) {
            console.log(error)
        }
    }

    @action updateVisit = async (value: UpdateVisitModel) => {
        try{
            await agent.Visits.update(value)
            this.rootStore.userStore.user!.isDoctor === true ? window.open("/doctorPanel", "_self") : window.open("/customerPanel", "_self")
        } catch (error) {
            console.log(error)
        }
    }
}