import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Movie } from "./entity/Movie"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Movie],
    migrations: [],
    subscribers: [],
})
