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
        const password = hashPassword(userData.password);

        console.log(userData);
        const userDto = new UserDTO(
            userData.email,
            userData.name,
            password.salt,
            password.hashed,
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

exports.login = async (userData) => {
    try {
        const user = await User.findOne({ email: userData.email });
        if (!user) {
            throw new Error('사용자를 찾을 수 없습니다.');
        }
        const isMatch = verifyPassword(
            userData.password,
            user.password,
            user.salt
        );
        if (!isMatch) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }
        return user;
    } catch (err) {
        console.log(err);
    }
};

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
    const hashed = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    return { salt, hashed };
}

function verifyPassword(inputPassword, storedHash, storedSalt) {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, storedSalt, 10000, 64, 'sha512')
        .toString('hex');
    return inputHash === storedHash;
}
