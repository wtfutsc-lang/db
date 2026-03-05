const express=require('express');
const sql = require('mssql');

const app= express();
app.use(express.json());

const databaseConfing={
  server:"A402PCPREPOD",  
  database:"tymofey-2beta",
  driver:"msnodesqlv8",
  options:{
      trustedConnection:true,
      trustServerCerficate:true
  }
};

app.get("/users", async(req,res) =>{
    const connect = await sql.connect(databaseConfing);

    const result = await connect.request()
        .query ("SELECT * FROM dbo.users");

    res.json(result.recordest);
});

app.post("/users", async (req,res) =>{
    const connect = await sql.connect(databaseConfing);

    const { name,lastname,city,birthday,phone_number,undergroups_id} = req.body;

    await connect.request()
    .input("name", sql.NVarChar, name)
    .input("lastname", sql.NVarChar, lastname)
    .input("city", sql.NVarChar, city)
    .input("birthday", sql.Date, birthday)
    .input("phone_number", sql.NChar, phone_number)
    .input("undergroups_id", sql.Int, undergroups_id)
    .query(`
        INSERT INTO dbo.users(name,lastname,city,birthday,phone_number,undergroups_id)
        VALUES(@name,@lastname,@city,@birthday,@phone_number,@undergroups_id)
    `);

    res.send("ok");
});

app.listen(3000,() =>{
    console.log('server start')
});