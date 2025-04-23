"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/OrderData", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body.order_data;
    yield data.splice(0, 0, { Order_date: req.body.order_date });
    //If Email exists in db then append order otherwise create
    let eId = yield orders_1.orderSchema.findOne({ email: req.body.email });
    if (eId === null) {
      try {
        yield orders_1.orderSchema
          .create({
            email: req.body.email,
            order_data: [],
          })
          .then(() =>
            __awaiter(void 0, void 0, void 0, function* () {
              yield orders_1.orderSchema.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } },
              );
              res.json({ success: true });
            }),
          );
      } catch (error) {
        console.log("error occured : ", error);
      }
    } else {
      try {
        yield orders_1.orderSchema
          .findOneAndUpdate(
            { email: req.body.email },
            { $push: { order_data: data } },
          )
          .then(() => {
            res.json({ success: true });
          });
      } catch (error) {
        console.log("error occured : ", error);
      }
    }
  }),
);
router.post("/myOrderData", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const myOrdersData = yield orders_1.orderSchema.findOne({
      email: req.body.email,
    });
    res.json({ orderData: myOrdersData });
  }),
);
module.exports = router;
