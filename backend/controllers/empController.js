import empSchema from '../models/empModel.js';

export const empRegister = async(req, res) => {
    const empdata = new empSchema(req.body);
    try {
        const epmreg = await empdata.save();
        res.status(200).json({message : "Employee Registration Successfull...!"});
    } catch (error) {
        res.status(400).json({message : "Something Went Wrong...!"});
        console.log(error);
    }
};

export const getEmp = async(req, res) => {
    try {
        const empData = await empSchema.find();
        res.status(200).json(empData);
    } catch (error) {
        res.ststus(400).json({message : "Something Went Wrong...!"});
        console.log(error);
    }
};

export const getEmpById = async(req, res) => {
    try {
        const empdatabyid = await empSchema.findById(req.params.id);
        res.status(200).json(empdatabyid);
    } catch (error) {
        res.status(400).json({message : "Something Went Wrong.....!"});
        console.log(error);
    }
};

export const deleteEmpById = async(req, res) => {
    try {
        const deleteEmp = await empSchema.deleteOne({_id:req.params.id});
        res.status(200).json({message: "User Deleted Successfully.....!"});
    } catch (error) {
        res.status(400).json({message : "Something Went Wrong.....!"});
        console.log(error);
    }
};

export const updateEmpById = async(req, res) => {
    try {
        const updateEmp = await empSchema.updateOne({_id:req.params.id}, {$set:req.body});
        res.status(200).json(updateEmp);
    } catch (error) {
        res.status(400).json({message : "Something Went Wrong.....!"});
        console.log(error);
    }
};