import { action, computed, observable, runInAction } from 'mobx';
import agent from '../api/agent';
import Home from '../components/Home';
import { IUser, IUserFromValues } from '../models/UserModel';
import { RooteStore } from './RootStore';

export default class UserStore{
    rootStore: RooteStore;
    constructor(rootStore: RooteStore){
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {return !!this.user};

    @action login = async (values: IUserFromValues) => {
        try{
            const user = await agent.User.login(values);
            runInAction(() =>{
                this.user = user;
            })
            this.rootStore.commonStore.setToken(user.token)
            //this.user.isDoctor ? window.open("/doctorPanel", "_self") : window.open("/customerPanel", "_self")
            window.open("/customerPanel", "_self")
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
    }
}