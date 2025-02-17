import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1739819308967 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "mobile_phone",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "number",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "complement",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: "boolean",
                        isNullable: false,
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
