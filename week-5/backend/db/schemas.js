const mongoose = require('mongoose');
const zod = require('zod');
/*

[
    {
        "name": "Vineet",
        "description": "Full stack developer",
        "interests": ["gaming", "coding"],
        "socials": {
            "instagram": "link---",
            "twitter": "link---"
        }
    }
]


*/
mongoose.connect("mongodb+srv://vineet:admin@mycluster.xbypxif.mongodb.net/BusinessCardApp");

const zodUserSchema = zod.object({
    name: zod.string(),
    description: zod.string(),
    interests: zod.array(zod.string()),
    socials: zod.record(zod.string())
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    interests: {
        type: [String],
        required: true
    },
    socials: {
        type: Map,
        of: String
    }
});

const UserModel = new mongoose.model('User', UserSchema);

module.exports = {
    zodUserSchema,
    UserModel
}