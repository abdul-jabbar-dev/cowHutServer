import { RequestHandler } from "express";
import cowService from "./cow.service";
import { TCow } from "./cow.interface";
import sendResponse from "../../../global/sendResponse";
import pickQuery, {
  paginationCalculate,
} from "../../../utils/sheard/pickQuery";
import { cowKeys } from "./cow.model";
import { TFilter } from "../../../types/utils/handleFiltering";

const getAllCow: RequestHandler = async (req, res, next) => {
  try {
    const pagination: {
      limit: number;
      page: number;
      skip: number;
    } = paginationCalculate(pickQuery(req.query, ["limit", "page"]));
    let {
      maxPrice,
      minPrice,
      sortBy,
      sortOrder,
    }: Partial<TFilter & { minPrice: number; maxPrice: number }> = pickQuery(
      req.query,
      ["minPrice", "maxPrice", "sortBy", "sortOrder"]
    );
    if (!sortBy) {
      sortBy = "createdAt";
    }
    if (!sortOrder) {
      sortOrder = "asc";
    }
    const searchOptions = pickQuery(req.query, ["searchTerm", ...cowKeys]);

    const cows = await cowService.getAllCowDB(
      pagination,
      { maxPrice, minPrice, sortBy, sortOrder },
      searchOptions
    );
    sendResponse(
      res,
      {
        message: "Cows retrieved successfully",
        data: cows.data,
      },
      cows.meta
    );
  } catch (error) {
    next(error);
  }
};

const getACow: RequestHandler = async (req, res, next) => {
  try {
    const cows: TCow | null = await cowService.getACowDB(req.params.id);
    sendResponse(res, {
      message: "Cows retrieved successfully",
      data: cows,
    });
  } catch (error) {
    next(error);
  }
};

const createAllCow: RequestHandler = async (req, res, next) => {
  try {
    const cows: TCow = await cowService.createACowDB(req.body);
    sendResponse(res, {
      message: "Cow created successfully",
      data: cows,
    });
  } catch (error) {
    next(error);
  }
};

const deleteACow: RequestHandler = async (req, res, next) => {
  try {
    const cows = await cowService.deleteACowDB(req.params.id);
    sendResponse(res, {
      message: "Cow deleted successfully",
      data: cows,
    });
  } catch (error) {
    next(error);
  }
};

const updateACow: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatableData: Partial<TCow> = req.body;
    const cows = await cowService.updateACowDB(id, updatableData);
    sendResponse(res, {
      message: "Cow updated successfully",
      data: cows,
    });
  } catch (error) {
    next(error);
  }
};

const cowController = {
  getAllCow,
  getACow,
  createAllCow,
  deleteACow,
  updateACow,
};
export default cowController;
