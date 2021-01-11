import { createContext } from "react";
import UserStore from "./UserStore";

export class RooteStore {
    userStore: UserStore;
    
    constructor(){
        this.userStore = new UserStore(this);
    }
}

export const RootStoreContext = createContext(new RooteStore());