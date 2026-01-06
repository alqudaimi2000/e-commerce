import mongoose,{Schema , Document} from "mongoose";

export interface Iuser extends Document {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}   

const userSchema: Schema = new Schema<Iuser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {timestamps: true});


const UserModel = mongoose.model<Iuser>('User', userSchema);


export default UserModel;