import TimeOutConfig from "../../models/TimeOutConfig";
import AppError from "../../errors/AppError";


const GetTimeOutConfigService = async (
    storeId: number
): Promise<TimeOutConfig> => {
    const config = await TimeOutConfig.findOne({
        where: {
            storeId
        }
    })
    if (!config) {
        throw new AppError("ERR_TIME_OUT_CONFIG_NOT_FOUND", 404);
    }
    return config
}

export default GetTimeOutConfigService;