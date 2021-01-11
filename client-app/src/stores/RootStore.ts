import { createContext } from "react";
import { configure } from 'mobx';
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";

configure({ enforceActions: 'always' });

export class RooteStore {
    userStore: UserStore;
    commonStore: CommonStore;
    
    constructor(){
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
    }
}

export const RootStoreContext = createContext(new RooteStore());