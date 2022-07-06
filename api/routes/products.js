const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const multer = require("multer");
require("dotenv").config();
const checkAuth = require("../middleware/check-auth");

const formatRupiah = (money) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(money);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("File format not supported, gambar wae nde, max 5mb"));
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id product picture")
    .exec()
    .then((result) => {
      const response = {
        count: result.length,
        products: result.map((result) => {
          return {
            id: result.id,
            name: result.name,
            price: result.price,
            picture: "https://shopuwuh.herokuapp.com/" + result.picture,
          };
        }),
      };
      if (result.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "Product not found",
        });
      }
    });
});

router.post("/", checkAuth, upload.single("picture"), (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    product: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: formatRupiah(req.body.price),
    picture: req.file.path,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Product created successfully",
        product: {
          id: result.id,
          name: result.name,
          price: result.price,
          picture: "https://shopuwuh.herokuapp.com/" + result.picture,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .select("name price id picture")
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Get single product sucess",
          product: {
            id: result.id,
            name: result.name,
            price: result.price,
            picture: "https://shopuwuh.herokuapp.com/" + result.picture,
          },
        });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    });
});

router.put(
  "/:id",
  checkAuth,
  [
    check("name", "name length should be 5 to 50 characters").isLength({
      min: 5,
      max: 50,
    }),
    check("price", "price length should be 3 to 20 characters").isLength({
      min: 3,
      max: 20,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.mapped(),
      });
    }

    const id = req.params.id;
    const product = {
      name: req.body.name,
      price: formatRupiah(req.body.price),
    };
    Product.updateOne({ _id: id }, { $set: product })
      .exec()
      .then((result) => {
        if (result.modifiedCount == 1) {
          res.status(200).json({
            message: "Product edited successfully",
          });
        }
      });
  }
);

router.delete("/:id", checkAuth, (req, res, next) => {
  const id = req.params.id;
  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      if (result.deletedCount == 1) {
        res.status(200).json({
          message: "Product deleted successfully",
        });
      } else {
        res.status(422).json({
          error: "Error ngab",
          message: "Check your productId",
        });
      }
    });
});

module.exports = router;
