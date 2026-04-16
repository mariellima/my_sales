import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class Migration1773855000660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orders_products",
      new TableColumn({
        name: "order_id",
        type: "integer",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "orders_products",
      new TableForeignKey({
        name: "OrdersProductsOrder",
        columnNames: ["order_id"],
        referencedTableName: "orders",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("orders_products", "OrdersProductOrder");
    await queryRunner.dropColumn("orders_products", "Order_id");
  }
}
