var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    SS: String,
    firstPet: String,
    momMaiden: String,
    hashed_password: String,
    comment: String
});
mongoose.model('User', UserSchema);