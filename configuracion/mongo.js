const mongoose = require("mongoose")


const connection = async() => {

//conexion monbo altas
    try{
        await mongoose.connect("mongodb+srv://wikideas:wikideas@cluster0.nxjvz1b.mongodb.net/wikideas");

        console.log("Conectado correctamente a bd: wikideas");

    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos!!");
    }
}

//conexion mongo local
    // try {
    //     await mongoose.connect("mongodb://127.0.0.1:27017/wikideas", 
    //     {});
    //     console.log("Conectado a bd: wikideas local Aye");
    // }catch(error){
    //     console.log(error);
    //             throw new Error("No se ha podido conectar a la base de datos!!");
    // }


    


module.exports= connection  
