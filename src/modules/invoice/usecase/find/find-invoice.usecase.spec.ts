import FindInvoiceUseCase from "./find-invoice.usecase";
import Invoice from "../../domain/invoice.entity";
import Address from "../../value-object/address";
import InvoiceItems from "../../domain/invoice-items.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";


const address = new Address("Street", "123", "Apt 10", "City", "State", "12345-678");
const items = [
  new InvoiceItems({ id: new Id("1"), name: "Product 1", price: 100 }),
  new InvoiceItems({ id: new Id("2"), name: "Product 2", price: 200 }),
];

const invoice = new Invoice({
  id: new Id("inv-1"),
  name: "Client 1",
  document: "00011122233",
  address,
  items,
  createdAt: new Date("2025-01-01T00:00:00Z"),
  updatedAt: new Date("2025-01-02T00:00:00Z"),
});

const MockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  generate: jest.fn(),
});

describe("FindInvoiceUseCase", () => {
  it("should find an invoice", async () => {


    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const result = await usecase.execute({ id: "inv-1" });

    expect(repository.find).toHaveBeenCalledWith("inv-1");
    expect(result.id).toBe("inv-1");
    expect(result.name).toBe("Client 1");
    expect(result.document).toBe("00011122233");
    expect(result.address.city).toBe("City");
    expect(result.items.length).toBe(2);
    expect(result.total).toBe(300);
    expect(result.createdAt).toStrictEqual(new Date("2023-01-01T00:00:00Z"));
  });
});
