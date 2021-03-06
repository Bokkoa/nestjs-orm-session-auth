import { promises } from "fs";
import { join } from "path";
import { getConnection } from "typeorm";

global.beforeEach( async () => {

    try{

        await promises.unlink(join(__dirname, '..', 'db.test.sqlite'));

    } catch( err ){}
    
});

global.afterEach( async () => {
    const con = await getConnection();
    await con.close();
});