const getDb = require('../util/database').getDb;
const bcrypt = require('bcryptjs');

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    }

    async save(){
        const db = getDb();
        try {
            const result = await db.collection('users').insertOne(this);
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    static async findOne(email, password) {
        const db = getDb();
        try {
            const user = await db.collection('users').findOne({ email: email });
            if (!user) {
                return null;
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return user;
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = User;