const { Schema } = require('mongoose');

const baseOptions = {
    timestamps: true, // createdAt, updatedAt 자동 추가
    discriminatorKey: '__type', // optional: 상속한 모델 식별자
};

const BaseSchema = new Schema({}, baseOptions);

module.exports = BaseSchema;
