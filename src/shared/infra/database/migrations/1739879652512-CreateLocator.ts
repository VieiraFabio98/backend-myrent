import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLocator1739879652512 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                        name: "locators",
                        columns: [
                            {
                                name: "id",
                                type: "uuid",
                                isPrimary: true,
                                isGenerated: true,
                                generationStrategy: "uuid",
                            },
                            {
                                name: 'user_id',
                                type: 'uuid',
                                isNullable: false,
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
                            {
                                name: 'created_at',
                                type: 'timestamp',
                                default: 'now()'
                            },
                            {
                                name: 'updated_at',
                                type: 'timestamp',
                                default: 'now()'
                            }
                        ],
                        foreignKeys: [
                            {
                                name: 'FKLocatorUser',
                                referencedTableName: 'users',
                                referencedColumnNames: ['id'],
                                columnNames: ['user_id'],
                                onDelete: 'SET NULL',
                                onUpdate: 'SET NULL',
                            }
                        ]
                    })
                )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('locators')
    }

}
