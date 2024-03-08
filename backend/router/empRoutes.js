import express from 'express';
import { empRegister, getEmp, getEmpById, deleteEmpById, updateEmpById } 
from '../controllers/empController.js';

const emprouter = express.Router();

emprouter.post('/post', empRegister);

emprouter.get('/get', getEmp);

emprouter.get('/edit/:id', getEmpById);

emprouter.delete('/delete/:id', deleteEmpById);

emprouter.put('/update/:id', updateEmpById);

export default emprouter;