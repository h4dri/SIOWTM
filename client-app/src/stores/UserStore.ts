import { action, computed, observable, runInAction } from 'mobx';
import agent from '../api/agent';
import { IUser, IUserFromValues, IUserUpdate } from '../models/UserModel';
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
            this.user!.isDoctor === true ? window.open("/doctorPanel", "_self") : window.open("/customerPanel", "_self")
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
    }

    @action getCurrentUser = async () => {
        try{
            const user = await agent.User.current();
            runInAction(() =>{
                this.user = user;
            })
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    @action registerUser = async (value: IUserFromValues) => {
        try{
            await agent.User.register(value)
                .then(async () =>{
                    await this.login(value)
                })
            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    @action updateUser = async (value: IUserUpdate) => {
        try{
            await agent.User.update(value)
            this.user!.isDoctor === true ? window.open("/doctorPanel", "_self") : window.open("/customerPanel", "_self")
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}