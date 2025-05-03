const UserDTO = require("../dto/userDto");

exports.createUser = async (userData) => {
    // 유효성 검사
    const errors = UserDTO.validate(userData);
    if (errors) {
        throw new Error('Validation failed');
    }

    const newUser = await User.create(userData);
    return newUser;
};