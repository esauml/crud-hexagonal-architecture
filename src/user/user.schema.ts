import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
    name: string;
    email: string;
}

const userSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true },
});

export const UserModel = model<UserDocument>('User', userSchema);
