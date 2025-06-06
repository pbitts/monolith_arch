import { Column, CreatedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import {InvoiceItemModel} from "./invoice-items.model";

@Table({
  tableName: "invoices",
  timestamps: false,
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column
  declare id: string; 

  @Column
  declare name: string;

  @Column
  declare document: string;

  @Column
  declare street: string;

  @Column
  declare number: string;

  @Column
  declare complement: string;

  @Column
  declare city: string;

  @Column
  declare state: string;

  @Column
  declare zipCode: string;

  @HasMany(() => InvoiceItemModel)
  declare items:  Awaited<InvoiceItemModel[]>;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
