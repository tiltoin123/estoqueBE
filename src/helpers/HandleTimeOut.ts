import Contact from "../models/Contact"
import TimeOut from "../models/TimeOut"

import GetTimeOutConfigService from "../services/TimeOutServices/GetTimeOutConfigService"
import ShowTimeOutService from "../services/TimeOutServices/ShowTimeOutService"

const HandleTimeOut = async (contact: Contact): Promise<TimeOut | undefined> => {
   
    const isUserTimedOUt = await ShowTimeOutService(contact.storeId, contact.id)
    if(isUserTimedOUt)
        return isUserTimedOUt;
    else
        return undefined;

}
export default HandleTimeOut;