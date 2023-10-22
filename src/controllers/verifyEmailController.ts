import { Request, Response } from "express";
import getUserByToken from "../services/VerifyEmailServices/getUserByTokenService";
import verifyEmailService from "../services/VerifyEmailServices/verifyEmailService";

export const show = async (req: Request, res: Response): Promise<Response> => {
    let { confirmationToken } = req.params
    const user = await getUserByToken(confirmationToken);
    return res.json(user);
};

export const update = async (req: Request, res: Response): Promise<Response> => {
    let { confirmationToken } = req.params
    const user = await verifyEmailService(confirmationToken)

    return res.status(200).json(user)
}