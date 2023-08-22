const { sequelize } = require("sequelize");

const GetDBCurrentTime = async () => {
    const currentTimeResult = await sequelize.query("SELECT NOW() as current_time", {
        type: sequelize.QueryTypes.SELECT
    });

    const currentTime = currentTimeResult[0].current_time;
    return currentTime
}