import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/facade.factory";
import { InvoiceModel } from "../repository/invoice.model";

describe("ProductAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate a invoice", async () => {

    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
        name: "John Doe",
        document: "123456789",
        street: "Main St",
        number: "100",
        complement: "Apt 1",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        items: [
          { id: "1", name: "Item 1", price: 100 },
          { id: "2", name: "Item 2", price: 200 },
        ],
      };

    const result = await invoiceFacade.generate(input);

    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
    expect(result.items.length).toBe(2);
    expect(result.total).toBe(300);
  });

  it("should find an invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
        name: "Jane Smith",
        document: "987654321",
        street: "Second St",
        number: "200",
        complement: "Suite B",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        items: [
          { id: "1", name: "Product A", price: 150 },
          { id: "2", name: "Product B", price: 250 },
        ],
      };
    const generated_invoice = await invoiceFacade.generate(input);

    const result = await invoiceFacade.find({id: generated_invoice.id});

     expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.address.street).toBe(input.street);
    expect(result.address.number).toBe(input.number);
    expect(result.address.complement).toBe(input.complement);
    expect(result.address.city).toBe(input.city);
    expect(result.address.state).toBe(input.state);
    expect(result.address.zipCode).toBe(input.zipCode);
    expect(result.items.length).toBe(2);
    expect(result.items[0].id).toBe("1");
    expect(result.items[0].name).toBe("Product A");
    expect(result.items[0].price).toBe(150);
    expect(result.items[1].id).toBe("2");
    expect(result.items[1].name).toBe("Product B");
    expect(result.items[1].price).toBe(250);
    expect(result.total).toBe(400);
    expect(result.createdAt).toBeInstanceOf(Date);
  });
});
