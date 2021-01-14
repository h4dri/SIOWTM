import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { action, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IVisit, NewComment, NewVisit, UpdateVisitModel } from "../models/VisitModel";
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
    @observable.ref hubConnection: HubConnection | null = null;
    @observable visit: IVisit | null = null;

    @action createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat', {
                accessTokenFactory: () => this.rootStore.commonStore.token!
            })
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection
            .start()
            .then(() => console.log(this.hubConnection!.state))
            .catch(error => console.log(error));

        this.hubConnection.on(`ReceiveComment`, comment => {
            runInAction(() => {
                this.visit!.comments.push(comment);
                console.log("Store: ", this.visit?.comments.length)
            })
        })
    }

    @action stopHubConnection = () => {
        this.hubConnection!.stop();
    }

    @action addComment = async (values: NewComment) => {
        values.visitId = this.visit!.id;
        try{
            await this.hubConnection!.invoke(`SendComment`, values)
        } catch (error) {
            console.log(error)
        }
    }

    @action loadOneVisit = async (id: string) => {
        try{
            this.visit = await agent.Visits.details(id)
        } catch (error) { 
            console.log(error)
        }
    }

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
                .then(() => {
                    window.open(`/visit/${value.id}`, "_self")
                })
        } catch (error) {
            console.log(error)
        }
    }
}