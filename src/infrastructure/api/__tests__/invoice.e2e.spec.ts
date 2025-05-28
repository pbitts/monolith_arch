import { app, sequelize } from "../express";
import request from "supertest";

import Id from "../../../modules/@shared/domain/value-object/id.value-object";
import Address from "../../../modules/invoice/value-object/address";
import InvoiceItems from "../../../modules/invoice/domain/invoice-items.entity";
import Invoice  from "../../../modules/invoice/domain/invoice.entity";
import InvoiceRepository  from "../../../modules/invoice/repository/invoice.repository";

describe("E2E test for invoice", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create an invoice", async () => {
    const address = new Address("Street", "123", "Apt 10", "City", "State", "12345-678");

    const product1 = new InvoiceItems({
      id: new Id("1"),
      name: "P1",
      price: 10,
    });

    const product2 = new InvoiceItems({
      id: new Id("2"),
      name: "P2",
      price: 20,
    });

    const invoice = new Invoice({
      id: new Id("inv-1"),
      name: "Client 1",
      document: "000111222333",
      items: [product1, product2],
      address: address,
    });

    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.generate(invoice);
    const response = await request(app).get(`/invoice/${'inv-1'}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Client 1");
    expect(response.body.document).toEqual("000111222333");
  });
});