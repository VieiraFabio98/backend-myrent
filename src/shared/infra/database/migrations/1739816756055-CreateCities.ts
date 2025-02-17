import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCities1739816756055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cities',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'state_id',
                        type: 'uuid',
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKState',
                        referencedTableName: 'states',
                        referencedColumnNames: ['id'],
                        columnNames: ['state_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cities')
    }

}
