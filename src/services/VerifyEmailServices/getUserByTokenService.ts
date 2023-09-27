import User from "../../models/User";
import AppError from "../../errors/AppError";


const getUserByToken = async (confirmationToken: string): Promise<User> => {
    console.log("getusertoken", confirmationToken)
    const user = await User.findOne({
        where: {
            confirmationToken
        }
    });
    if (!user) {
        throw new AppError("ERR_NO_USER_FOUND", 404);
    }
    return user;
};

export default getUserByToken;
