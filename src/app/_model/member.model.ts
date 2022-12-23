import { Photo } from "./Photo";

    export interface Member {
        id: number;
        userName: string;
        age: number;
        photoUrl: string;
        lastActive: string | null;
        knownAs: string;
        created: Date;
        gender: string;
        indroduction: string;
        lookingFor: string;
        intrest: string;
        Description: string;
        city: string;
        country: string;
        photos: Photo[];
    }

        

