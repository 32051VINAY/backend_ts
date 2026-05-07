const sqlite3 = require('sqlite3')

const db = new sqlite3.Database(
    'C:\\Users\\sivat\\Downloads\\sqlite-tools-win-x64-3530100\\sip_tracker',
    (error)=>{
        if(error){
            console.log(error.message)
        }
        else{
            console.log("Successfuly connected to db")
        }
    }
)

module.exports = {db}
