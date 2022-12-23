import { User } from "./user.model";

export class UserParams {
    Gender :string;
    MiniAge = 18;
    MaxAge = 100;
    PageNumber = 1;
    PageSize = 5;
    OrderBy="created";

    constructor(user:User) {
        this.Gender = user.gender === 'male' ? 'female' : 'male';
    }
}