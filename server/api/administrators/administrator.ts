class Administrator {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string

    constructor (username: string, email: string, password: string, firstName: string, lastName: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;        
    }
}

export default Administrator;