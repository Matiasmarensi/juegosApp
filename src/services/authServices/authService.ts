import User from "../../models/User";

export const findUser = async (email: string, user_id: string, name: string) => {
  let user = await User.findOne({ where: { email } });

  if (!user) {
    user = await User.create({ email, id: user_id, name });
  }

  return user;
};
