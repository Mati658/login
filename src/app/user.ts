import { IUser } from "./models/user.model";

export class User implements IUser {
    public nombre! : string;
    public email! : string;
    public uid! : string;
    public password! : string;

    constructor(email:string, password:string){
        this.email = email;
        this.password = password
    }
}
