const express =  require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const authRoutes=require('./routes/auth');
const productRoutes=require('./routes/product');

require('dotenv').config();
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB',err));


//Rutas
app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);


const PORT= process.env.PORT || 5001;
app.listen(PORT,()=>console.log(`Servidor corriendo en el puerto ${PORT}`));