import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoice-items.model";
import InvoiceRepository from "./invoice.repository";
import Address from "../value-object/address";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";


describe("InvoiceRepository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate an invoice", async () => {
    const invoiceRepository = new InvoiceRepository();

    const address = new Address("Street", "123", "Apt", "City", "State", "12345");
    const items = [
      new InvoiceItems({ id: new Id("1"), name: "Item 1", price: 100 }),
      new InvoiceItems({ id: new Id("2"), name: "Item 2", price: 200 }),
    ];

    const invoice = new Invoice({
      id: new Id("inv1"),
      name: "Client 1",
      document: "123456789",
      address,
      items,
    });

    await invoiceRepository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: "inv1" },
      include: ["items"],
    });

    expect(invoiceDb).toBeDefined();
    expect(invoiceDb.items.length).toBe(2);
    expect(invoiceDb.name).toBe("Client 1");
  });

  it("should find an invoice", async () => {
    const invoiceRepository = new InvoiceRepository();

    await InvoiceModel.create(
      {
        id: "inv1",
        name: "Client 1",
        document: "123456789",
        street: "Street",
        number: "123",
        complement: "Apt",
        city: "City",
        state: "State",
        zipCode: "12345",
        items: [
          { id: "1", name: "Item 1", price: 100 },
          { id: "2", name: "Item 2", price: 200 },
        ],
      },
      { include: [InvoiceItemModel] }
    );

    const result = await invoiceRepository.find("inv1");

    expect(result.id.id).toBe("inv1");
    expect(result.items.length).toBe(2);
    expect(result.total).toBe(300);
    expect(result.address.city).toBe("City");
  });
});
