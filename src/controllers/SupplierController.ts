import { Request, Response } from "express";
import { getIO } from "../libs/socket";

import AppError from "../errors/AppError";
import ListSuppliersService from "../services/SuppliersServices/ListSuppliersServices";
import DeleteSupplierService from "../services/SuppliersServices/DeleteSupplierService";
import UpdateSupplierService from "../services/SuppliersServices/UpdateSupplierService";
import ShowSupplierService from "../services/SuppliersServices/ShowSupplierService";
import CreateSupplierService from "../services/SuppliersServices/CreateSupplierService";

type IndexQuery = {
    searchParam: string;
    pageNumber: string;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
    const { searchParam, pageNumber } = req.query as IndexQuery;

    const { storeId } = req.user;

    const { suppliers, count, hasMore } = await ListSuppliersService({
        storeId,
        searchParam,
        pageNumber
    });
    return res.json({ suppliers, count, hasMore });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
    const {
        cnpj,
        razaoSocial,
        nomeFantasia,
        tipoJur,
        endereco,
        email,
        telefone } = req.body;


    if (req.user.profile !== "admin") {
        throw new AppError("ERR_NO_PERMISSION", 403);
    }

    const { storeId } = req.user;
    const supplier = await CreateSupplierService({
        storeId,
        cnpj,
        razaoSocial,
        nomeFantasia,
        tipoJur,
        endereco,
        email,
        telefone
    });

    const io = getIO();
    io.emit("supplier", {
        action: "create",
        supplier
    });
    return res.status(200).json(supplier);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
    const { supplierId } = req.params;
    console.log("show be", supplierId)
    const supplier = await ShowSupplierService(supplierId);
    return res.status(200).json(supplier);
};

export const update = async (
    req: Request,
    res: Response
): Promise<Response> => {
    if (req.user.profile !== "admin") {
        throw new AppError("ERR_NO_PERMISSION", 403);
    }

    const { supplierId } = req.params;
    const supplierData = req.body;
    console.log("update c", supplierId)
    const supplier = await UpdateSupplierService({ supplierData, supplierId });

    const io = getIO();
    io.emit("supplier", {
        action: "update",
        supplier
    });
    return res.status(200).json(supplier);
};

export const remove = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { supplierId } = req.params;
    if (req.user.profile !== "admin") {
        throw new AppError("ERR_NO_PERMISSION", 403);
    }

    await DeleteSupplierService(supplierId);

    const io = getIO();
    io.emit("supplier", {
        action: "delete",
        supplierId
    });
    return res.status(200).json({ message: "Supplier deleted" });
};
