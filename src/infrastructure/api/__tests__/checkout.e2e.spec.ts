import { app } from "../express";
import request from "supertest";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import { Sequelize } from "sequelize-typescript";
import { migrator } from "../../../test_migrations/config-migrations/migrator";
import { Umzug } from "umzug";

describe("E2E test for checkout", () => {
  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    // Adicione todos os models envolvidos nos testes
    sequelize.addModels([
      ClientModel,
      ProductModel,
      // Adicione outros models necessários aqui se usados no processo de checkout (ex: OrderModel, InvoiceModel etc.)
    ]);

    migration = migrator(sequelize);
    await migration.up();
  });

  afterEach(async () => {
    if (migration) await migration.down();
    if (sequelize) await sequelize.close();
  });

  it("should do the checkout", async () => {
    await ClientModel.create({
      id: "1",
      name: "client 1",
      email: "client@email.com",
      street: "street",
      number: "number",
      city: "city",
      complement: "complement",
      state: "state",
      zipcode: "zipCode",
      document: "0",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "1",
      name: "P1",
      description: "description",
      purchasePrice: 100,
      stock: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "2",
      name: "P2",
      description: "description",
      purchasePrice: 200,
      stock: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1",
        products: [{ productId: "1" }, { productId: "2" }],
      });

    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.total).toEqual(125); // Considerando desconto aplicado
    expect(response.body.status).toEqual("approved");
  });
});
