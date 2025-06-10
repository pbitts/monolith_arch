import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { OrderModel } from "../../modules/checkout/repository/order.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import ProductModel from "../../modules/store-catalog/repository/product.model";
import { ProductAdmModel as AdmProductModel } from "../../modules/product-adm/repository/product.model";

import { clientRoute } from "./routes/client.route";
import { productRoute } from "./routes/product.route";
import { invoiceRoute } from "./routes/invoice.route";
import { checkoutRoute } from "./routes/checkout.route";
import { InvoiceItemModel } from "../../modules/invoice/repository/invoice-items.model";


export const app: Express = express();
app.use(express.json());
app.use("/client", clientRoute);
app.use("/product", productRoute)
app.use("/invoice", invoiceRoute)
app.use("/checkout", checkoutRoute)

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ClientModel]);
  await sequelize.addModels([OrderModel]);
  await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
  await sequelize.addModels([TransactionModel]);
  await sequelize.addModels([ProductModel]);
  await sequelize.addModels([AdmProductModel]);
  await sequelize.sync();
}
setupDb();
