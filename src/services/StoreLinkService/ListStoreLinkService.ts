import StoreLink from "../../models/StoreLink";

const ListStoreLinkService = async (storeId: number): Promise<StoreLink[] | null> => {
    const { rows } = await StoreLink.findAndCountAll({
        where: {
            storeId
        }
    })
    if (!rows) {
        return null
    }
    return rows
}
export default ListStoreLinkService