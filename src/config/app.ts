import * as dotenv from 'dotenv'
dotenv.config()
export const appConfiguration ={
    port:process.env.PORT ||8088
}