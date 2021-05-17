import Product from "../model/product";

const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const existProduct = await Product.findOne({ name: name });
    if (existProduct) {
      res.status(400).json({
        errorCode: 1,
        errorMessage: "Product name Should be there",
      });
    } else {
      const newProduct = await Product.create({ ...req.body });
      const saveProduct = await newProduct.save();
      if (saveProduct) {
        res.status(201).json({
          errorCode: 0,
          errorMessage: "Product Created Success",
          Product: newProduct,
        });
      } else {
        res.status(500).json({
          errorCode: 1,
          errorMessage: "server error",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      errorCode: 1,
      errorMessage: error.message,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments();
    const getProducts = await Product.find()
      .sort({ _id: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      errorCode: 0,
      errorMessage: "product Found",
      page,
      Totalpages: Math.ceil(count / pageSize),
      list: getProducts,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 0,
      errorMessage: error.message,
    });
  }
};

export { createProduct, getAllProduct };
