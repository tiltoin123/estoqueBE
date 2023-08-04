import { initWbot } from "../../libs/wbot";
import Whatsapp from "../../models/Whatsapp";
import { wbotMessageListener } from "./wbotMessageListener";
import { getIO } from "../../libs/socket";
import wbotMonitor from "./wbotMonitor";
import { logger } from "../../utils/logger";
import { Request } from "express";
export const StartWhatsAppSession = async (
  whatsapp: Whatsapp,
  req: Request
): Promise<void> => {
  await whatsapp.update({ status: "OPENING" });

  const io = getIO();
  io.emit("whatsappSession", {
    action: "update",
    session: whatsapp
  });

  try {
    const wbot = await initWbot(whatsapp, req);
    wbotMessageListener(wbot, req);
    wbotMonitor(wbot, whatsapp, req);
  } catch (err) {
    logger.error(err);
  }
};
