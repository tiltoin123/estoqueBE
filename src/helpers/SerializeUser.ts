import User from "../models/User";

interface SerializedUser {
  id: number;
  name: string;
  email: string;
  profile: string;
  storeId: number;
}

export const SerializeUser = (user: User): SerializedUser => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profile: user.profile,
    storeId: user.storeId
  };
};
