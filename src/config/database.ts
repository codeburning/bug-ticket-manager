import * as dotenv from 'dotenv'
dotenv.config()
export const databaseConfiguration ={
    mongo_db_user:process.env.DATABASE_USER_NAME ||"",
    mongo_db_port:process.env.DATABASE_PORT||27017,
    mongo_db_host:process.env.DATABASE_HOST ||"localhost",
    mongo_db_password:process.env.DATABASE_USER_PASS ||"",
    mongo_db_name:process.env.DATABASE_NAME ||""

}