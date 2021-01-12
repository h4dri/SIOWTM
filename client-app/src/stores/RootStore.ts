import { createContext } from "react";
import { action, configure } from 'mobx';
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";
import VisitsStore from "./VisitsStore";
import CategoriesStore from "./CategoriesStore";
import DoctorsStore from "./DoctorsStore";

configure({ enforceActions: 'always' });

export class RooteStore {
    userStore: UserStore;
    visitsStore: VisitsStore;
    commonStore: CommonStore;
    categoriesStore: CategoriesStore;
    doctorsStore: DoctorsStore;

    @action delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    
    constructor(){
        this.userStore = new UserStore(this);
        this.visitsStore = new VisitsStore(this);
        this.commonStore = new CommonStore(this);
        this.categoriesStore = new CategoriesStore(this);
        this.doctorsStore = new DoctorsStore(this);
    }
}

export const RootStoreContext = createContext(new RooteStore());