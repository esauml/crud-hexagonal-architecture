export class User {
    id: string = '';
    public name: string = '';
    public email: string = '';

    constructor(props: Partial<User>) {
        Object.assign(this, props);
    }
}
