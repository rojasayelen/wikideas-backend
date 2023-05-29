const mongoose = require("mongoose")


const connection = async() => {

//conexion monbo altas
//     try{
//         await mongoose.connect("mongodb+srv://eduardozwenger:wikideas@cluster0.9q1docc.mongodb.net/test");

//         console.log("Conectado correctamente a bd: wikideas");

//     }catch(error){
//         console.log(error);
//         throw new Error("No se ha podido conectar a la base de datos!!");
//     }
// }

//conexion mongo local
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/wikideas", 
        {});
        console.log("Conectado a bd: wikideas local Aye");
    }catch(error){
        console.log(error);
                throw new Error("No se ha podido conectar a la base de datos!!");
    }
}

    


module.exports= connection  

//"mongodb+srv://eduardozwenger:wikideas@cluster0.9q1docc.mongodb.net/test"