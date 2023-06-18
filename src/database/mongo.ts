import mongoose from "mongoose"
import { databaseConfiguration } from "../config/database"

export const mongoConnection = (result: (a: string | null) => void) => {
    const uri = `mongodb://${databaseConfiguration.mongo_db_host}:${databaseConfiguration.mongo_db_port}`
    // console.log({uri})
    mongoose.connect(uri, {
        user: databaseConfiguration.mongo_db_user,
        pass: databaseConfiguration.mongo_db_password,
        dbName: databaseConfiguration.mongo_db_name
    }).then(r => {
        //When database connection is successfull in callback we sent NULL
        result(null)
    }).catch(e => {
        result(e?.["message"] || "Error")
    })
    mongoose.Promise = global.Promise
}