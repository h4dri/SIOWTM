import { action, observable } from "mobx";
import agent from "../api/agent";
import { RooteStore } from "./RootStore";

export default class CategoriesStore{
    rootStore: RooteStore;
    constructor(rootStore: RooteStore){
        this.rootStore = rootStore;
    }

    @observable categories: String[] = [];
    @observable isLoading = false;

    @action loadCategories = async () => {
        this.isLoading = true;
        try{
            this.categories = await agent.Categories.list()
            this.isLoading = false;
        } catch (error) {
            console.log(error);
            this.isLoading = false;
        }
    }
}