import { TCow } from "./cow.interface";
import COW  from "./cow.model";
import { TFilter } from "../../../types/utils/handleFiltering"; 

const getAllCowDB = async (
  pagination: { skip: number; limit: number; page: number },
  filter: TFilter & Partial<{ minPrice: number; maxPrice: number }>,
  searchObj: { searchTerm?: string }
)  => {
  const { searchTerm, ...fields } = searchObj;
  const { sortBy, sortOrder, maxPrice, minPrice } = filter;
  const { skip, limit, page } = pagination;
  let search; 
  const searchFi = ["location", "breed", "category"];

  if (minPrice) {
    search = [{ price: { $gte: minPrice } }];
  }
  if (maxPrice) {
    if (search) {
      search = [...search, { price: { $lte: maxPrice } }];
    } else {
      search = [{ price: { $lte: maxPrice } }];
    }
  }
  if (searchTerm) {
    search = [
      {
        $or: searchFi.map((f) => {
          return {
            [f]: { $regex: searchTerm, $options: "i" },
          };
        }),
      },
    ];
  }
  if (fields) {
    if (search) {
      search = [...search, ...Array(fields)];
    } else search = [...Array(fields)];
  }
  const result = await COW.find({ $and: search })
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await COW.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getACowDB = async (id: string): Promise<TCow | null> => {
  const result: TCow | null = await COW.findOne({ _id: id });
  return result;
};

const createACowDB = async (cowDetails: TCow): Promise<TCow> => {
  const result: TCow = await COW.create(cowDetails);
  return result;
};

const deleteACowDB = async (id: string) => {
  const result = await COW.findByIdAndDelete(id);
  return result;
};

const updateACowDB = async (
  id: string,
  data: Partial<TCow>
): Promise<TCow | null> => {
  const result: TCow | null = await COW.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const cowService = {
  getAllCowDB,
  getACowDB,
  createACowDB,
  deleteACowDB,
  updateACowDB,
};
export default cowService;
