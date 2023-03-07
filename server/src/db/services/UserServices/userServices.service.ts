import mongoose from "mongoose";
import UserModel from "../../models/User.model";
import UserSchema from "../../schemas/user.schema";

const User = mongoose.model("user", UserSchema);

const createUser = async (user: UserModel) => {
  if (!!!user.name || !!!user.email || !!!user.password) {
    return "missing data";
  } else {
    if (!!!(await getUser(user))) {
      const userCreated = new User(user);
      userCreated.save();

      return userCreated;
    } else {
      return "user already exists";
    }
  }
};

const getUser = async (user: UserModel) => {
  const response = await User.findOne({ email: user.email }).exec();

  //this will validate the incoming password with the one in the database
  if (response?.password === user.password) {
    return response;
  }
  return null;
};

const updateUser = async (_user: UserModel) => {
  //updating user
  return "updating user";
};

export { createUser, getUser, updateUser };
