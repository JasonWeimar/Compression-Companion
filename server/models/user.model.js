import { model, Schema } from 'mongoose';
import bcrypt from "bcrypt";

const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: [true, "A userName is required."],
            minLength: [1, "Username must be at least one (1) character in length."],
            maxLength: [20, "Username can not exceed twenty (20) characters in lenth."]

        },
        password: {
            type: String,
            required: [true, "Password is required."],
            minLength: [8, "Password must be at least eight (8) characters long."]
        },
        weight: {
            type: Number,
            required: [true, "Weight is required."],
            min: [25, "Minimum weight must be at least twenty five (25) lbs."],
            max: [500, "Maximum weght can not exceed five hundred (500) lbs"]

        },
        heightFeet: {
            type: Number,
            min: [0,"Height can not be less than 0."],
            max: [8,"Height can not be more than 8."]
        },
        heightInches: {
            type: Number,
            min: [0,"Can not be less than 0."],
            max: [11,"Can not be more than 11."]
        },
        skillLevel: {
            type: String,
            required: [true, "A Skill Level selection is required."],
            enum: {
                values: ['Beginner', 'Intermediate', 'Advanced', 'Pro'],
            } 
        },
        userAvatar: {
            type: String,
            required: false
        }
    },
    { "timestamps": true } 
);

UserSchema.virtual("confirmPassword")
    .get(function() {return this._confirmPassword})
    .set(function(value) {this._confirmPassword = value})

UserSchema.pre("validate", function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password must match Confirm Password.")
    }

    next()
});

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword

            next()
        })
});

const UserModel = model("User", UserSchema);
export default UserModel;