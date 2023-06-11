const {createPool}=require("mysql");
//const {DB_PORT, DB_HOST, DB_USER, DB_PASS, MYSQL_DB}=process.env;
const pool=createPool({
    port:3306,
    host:'localhost',
    user:'root',
    password:'',
    database:'investment',
    connectionLimit:10
});

module.exports=pool;