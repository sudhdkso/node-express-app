const User = require('../models/users');
const { error } = require('console');
const UserDTO = require('../dto/userDto');
const crypto = require('crypto');

exports.createUser = async (userData) => {
    try {
        const errors = UserDTO.validate(userData);
        if (errors) {
            console.log('Validation errors: ', errors);
            throw new Error('Validation failed');
        }

        const userDto = new UserDTO(
            userData.email,
            userData.name,
            hashPassword(userData.password),
            userData.phoneNumber,
            userData.age
        );
        const newUser = await User.create(userDto);
        return newUser;
    } catch (err) {
        console.error(err);
        throw new Error('creating user failed');
    }
};

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}
