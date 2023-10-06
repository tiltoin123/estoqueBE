import * as Sentry from "@sentry/node";
import { Client } from "whatsapp-web.js";

import { getIO } from "../../libs/socket";
import Whatsapp from "../../models/Whatsapp";
import { logger } from "../../utils/logger";
import { StartWhatsAppSession } from "./StartWhatsAppSession";
import { Request } from "express";

interface Session extends Client {
  id?: number;
}

const wbotMonitor = async (
  wbot: Session,
  whatsapp: Whatsapp,
  req: Request
): Promise<void> => {
  const io = getIO();
  const sessionName = whatsapp.name;

  try {
    wbot.on("change_state", async newState => {
      logger.info(`Monitor session: ${sessionName}, ${newState}`);
      try {
        await whatsapp.update({ status: newState });
      } catch (err) {
        Sentry.captureException(err);
        console.error(err);
      }

      io.emit("whatsappSession", {
        action: "update",
        session: whatsapp
      });
    });

    wbot.on("change_battery", async batteryInfo => {
      const { battery, plugged } = batteryInfo;
      logger.info(
        `Battery session: ${sessionName} ${battery}% - Charging? ${plugged}`
      );

      try {
        await whatsapp.update({ battery, plugged });
      } catch (err) {
        Sentry.captureException(err);
        console.error(err);
      }

      io.emit("whatsappSession", {
        action: "update",
        session: whatsapp
      });
    });
    wbot.on("message", async () => {
    });
    wbot.on("disconnected", async reason => {
      logger.info(`Disconnected session: ${sessionName}, reason: ${reason}`);
      try {
        await whatsapp.update({ status: "OPENING", session: "" });
      } catch (err) {
        Sentry.captureException(err);
        console.error(err);
      }

      io.emit("whatsappSession", {
        action: "update",
        session: whatsapp
      });

      setTimeout(() => StartWhatsAppSession(whatsapp, req), 2000);
    });
  } catch (err) {
    Sentry.captureException(err);
    console.error(err);
  }
};

export default wbotMonitor;
