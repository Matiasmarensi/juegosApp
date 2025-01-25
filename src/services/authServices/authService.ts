import User from "../../models/User";

export const findUser = async (email: string) => {
  let user = await User.findOne({ where: { email } });

  if (!user) {
    user = await User.create({ email });
  }

  return user;
};
