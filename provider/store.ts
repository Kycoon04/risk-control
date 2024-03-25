import {create} from "zustand";

export interface User{
    id:number;
    name :string;
    second_name :string;
    surname:string;
    second_surname:string;
    email:string;
    password:string;
    phone_number:string;
    nickname:string;
    identification:string;
    create_account:string;
    department:number;
    role:string;
}

type AuthStore = {
    logged: boolean;
    user: User | null;

    changeLogged: ()=> void;
    setUser:(newUser:User) => void;
}

export const useAuthStore = create<AuthStore>((set) =>({
    logged: false,
    user: null,
    changeLogged: ()=> {
        set((state)=>({
            logged: !state.logged
        }))
    },
    setUser: (newUser:User)=>{
        set(()=>({
            user: newUser
        }))
    }
}));
