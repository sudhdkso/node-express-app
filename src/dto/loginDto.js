class loginDTO {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    static validate(data) {
        const errors = [];
        if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.push('Invalid email format');
        }

        if (!data.password || data.password.length < 8) {
            errors.push('Password is required');
        }
        return errors.length > 0 ? errors : null;
    }
}
