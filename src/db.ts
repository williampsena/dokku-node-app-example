import { Schema, model, connect } from "mongoose"

export interface IUser {
  name: string
  email: string
  nickname?: string
}

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  nickname: String,
})

export const User = model<IUser>("User", userSchema)

export async function dbConnect(connectionString: string) {
  await connect(connectionString)
}