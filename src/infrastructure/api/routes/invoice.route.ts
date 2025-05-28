import express, { Request, Response } from "express";

import InvoiceFacadeFactory from "../../../modules/invoice/factory/facade.factory";
import { FindInvoiceFacadeInputDTO } from "../../../modules/invoice/facade/invoice.facade.interface";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
  const facade = InvoiceFacadeFactory.create();

  try {
    const input: FindInvoiceFacadeInputDTO = {
      id: req.params.id,
    };

    const output = await facade.findInvoice(input);

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});