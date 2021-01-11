import { createContext } from "react";
import { configure, observable } from 'mobx';
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";
import VisitsStore from "./VisitsStore";

configure({ enforceActions: 'always' });

export class RooteStore {
    userStore: UserStore;
    visitsStore: VisitsStore;
    commonStore: CommonStore;
    
    constructor(){
        this.userStore = new UserStore(this);
        this.visitsStore = new VisitsStore(this);
        this.commonStore = new CommonStore(this);
    }
}

export const RootStoreContext = createContext(new RooteStore());