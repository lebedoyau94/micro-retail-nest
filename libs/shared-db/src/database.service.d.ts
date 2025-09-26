import { DataSource } from 'typeorm';
export declare class DatabaseService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getRepository<T>(entity: new () => T): import("typeorm").Repository<import("typeorm").ObjectLiteral>;
}
