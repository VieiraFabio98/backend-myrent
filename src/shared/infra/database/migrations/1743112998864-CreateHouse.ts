import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateHouse1743112998864 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'houses',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'locator_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'state_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'city_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'zip_code',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'total_area',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'useful_area',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'rooms',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'bathrooms',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'parking_spaces',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'rent_value',
                        type: 'decimal',
                        isNullable: false,
                    },
                    {
                        name: 'condo_value',
                        type: 'decimal',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'houses',
            new TableForeignKey({
                name: 'FKHouseLocator',
                columnNames: ['locator_id'],
                referencedTableName: 'locators',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('houses', 'FKHouseLocator');
        await queryRunner.dropTable('houses');
    }
}
