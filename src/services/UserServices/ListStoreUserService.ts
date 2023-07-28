import User from "../../models/User";
import AppError from "../../errors/AppError";

const ListStoreUsersService = async (
    storeId: number
): Promise<User[]> => {
    const users = await User.findAll({
        where: {
            storeId: storeId
        }
    })
    if (!users) {
        throw new AppError("ERR_NO_USER_FOUND", 404)
    }
    return users
}

export default ListStoreUsersService;