import AppError from "../../errors/AppError";
import Template from "../../models/Template";

const ListStoreTemplatesService = async (
    storeId: number
): Promise<Template[]> => {
    const templates = await Template.findAll({
        where: {
            storeId: storeId
        }
    })
    if (!templates) {
        throw new AppError("ERR_NO_USER_FOUND", 404)
    }
    return templates
}

export default ListStoreTemplatesService;