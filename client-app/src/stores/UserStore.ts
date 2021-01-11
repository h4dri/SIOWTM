import { action, computed, observable, values } from 'mobx';
import agent from '../api/agent';
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
            this.user = user;
            console.log(user);
        } catch (error) {
            console.log(error)
        }
    }
}