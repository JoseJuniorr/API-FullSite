import mongoose from 'mongoose'


const InfoContato = new mongoose.Schema({
    titlePgCont: {
        type: String,
        required: true
    },
    titleFlCon: {
        type: String,
        required: true
    },
    horAtend: {
        type: String,
        required: true
    },
    logradouro: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    })


export default mongoose.model('infoContato', InfoContato)