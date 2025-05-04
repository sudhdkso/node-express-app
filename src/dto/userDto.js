class UserDTO {
    constructor(email, name, password, phoneNumber, age) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.age = age;
    }

    // 유효성 검사 메서드
    static validate(data) {
        const errors = [];
        if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.push('Invalid email format');
        }

        if (!data.password || data.password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }

        if (!data.name) {
            errors.push('Name is required');
        }

        if (data.age && (data.age < 10 || data.age > 100)) {
            errors.push('Age must be between 10 and 100');
        }
        return errors.length > 0 ? errors : null;
    }
}

module.exports = UserDTO;
