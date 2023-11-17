import { Request, Response } from "express";
import { getIO } from "../libs/socket";

import AppError from "../errors/AppError";
import DeleteSupplierService from "../services/SuppliersServices/DeleteSupplierService";
import UpdateSupplierService from "../services/SuppliersServices/UpdateSupplierService";
import ListProductsService from "../services/ProductsServices/ListProductsServices";
import CreateProductService from "../services/ProductsServices/CreateProductService";
import ShowProductService from "../services/ProductsServices/ShowProductService";
import UpdateProductService from "../services/ProductsServices/UpdateProductService";
import DeleteProductService from "../services/ProductsServices/DeleteProductService";

type IndexQuery = {
    searchParam: string;
    pageNumber: string;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
    const { searchParam, pageNumber } = req.query as IndexQuery;
    const { storeId } = req.user;

    const { products, count, hasMore } = await ListProductsService({
        storeId,
        searchParam,
        pageNumber
    });
    return res.json({ products, count, hasMore });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
    const {
        name,
        price,
        description,
        unity,
        quantity,
        supplierId, } = req.body;

    const { storeId } = req.user;

    const product = await CreateProductService({
        storeId,
        name,
        price,
        description,
        unity,
        quantity,
        supplierId,
    });

    const io = getIO();
    io.emit("product", {
        action: "create",
        product
    });
    return res.status(200).json(product);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
    const { productsId } = req.params;
    const product = await ShowProductService(productsId);
    return res.status(200).json(product);
};

export const update = async (
    req: Request,
    res: Response
): Promise<Response> => {

    const { productsId } = req.params;
    const productData = req.body;

    const product = await UpdateProductService({ productData, productsId });
    const io = getIO();
    io.emit("product", {
        action: "update",
        product
    });
    return res.status(200).json(product);
};

export const remove = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { productsId } = req.params;

    if (req.user.profile !== "admin") {
        throw new AppError("ERR_NO_PERMISSION", 403);
    }

    await DeleteProductService(productsId);

    const io = getIO();
    io.emit("product", {
        action: "delete",
        productsId
    });
    return res.status(200).json({ message: "Product deleted" });
};
