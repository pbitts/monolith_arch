import express, { Request, Response } from "express";

import ClientAdmFacadeFactory  from "../../../modules/client-adm/factory/client-adm.facade.factory";
import { AddClientFacadeInputDto } from "../../../modules/client-adm/facade/client-adm.facade.interface";
import Address from "../../../modules/invoice/value-object/address";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
  const facade = ClientAdmFacadeFactory.create();

  try {
    const clientDto: AddClientFacadeInputDto = {
        name: req.body.name,
        email: req.body.email,
        document: req.body.document,
        address: new Address (
          req.body.address.street,
          req.body.address.number,
          req.body.address.complement,
          req.body.address.state,
          req.body.address.zipCode,
          req.body.address.city
        )
      }


    const output = await facade.add(clientDto);
    res.send(output);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});