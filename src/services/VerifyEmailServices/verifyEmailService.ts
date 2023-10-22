import User from "../../models/User";
import getUserByToken from "./getUserByTokenService";

const verifyEmailService = async (confirmationToken: string): Promise<User> => {
    const user = await getUserByToken(confirmationToken)

    await user.update({
        confirmationToken: null
    })

    await user.reload();

    return user
}

export default verifyEmailService;