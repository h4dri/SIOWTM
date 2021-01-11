import { action, observable } from "mobx";
import { RooteStore } from "./RootStore";

export default class CommonStore{
    rootStore: RooteStore;
    constructor(rootStore: RooteStore) {
        this.rootStore = rootStore
    }

    @observable token: string | null = null;
    @observable appLoaded = false;

    @action setToken = (token: string | null) => {
        window.localStorage.setItem('jwt', token!);
        this.token = token;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}