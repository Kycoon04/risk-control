export type UserDefinition = {
  Name:string;
  LastName:string;
  Email:string;
  Password:string;
  Phone:string;
  Username:string;
};

export interface button {
  width: string;
  titule: string;
  fuction: any;
}
export class Users implements UserDefinition{
  constructor(
    public Name: string,
    public LastName: string,
    public Email: string,
    public Password: string,
    public Phone: string,
    public Username: string
  ) {}
  getUsername(): string {
    return this.Username;
  }
  getName(): string {
    return this.Name;
  }
  getLastName(): string {
    return this.LastName;
  }
  getEmail(): string {
    return this.Email;
  }
  getPhone(): string {
    return this.Phone;
  }
}