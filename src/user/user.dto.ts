export class UserDTO {
    readonly id: string = '';
    readonly name: string;
    readonly email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}
