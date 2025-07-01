const Income = require('../models/Income');
const ExcelJS = require('exceljs');




//Add income source
exports.addIncome = async(req, res) => {
    const userId = req.user._id;

    try{
        const {icon, source, amount,date} = req.body;

        // Validate input
        if(!source || !amount || !date) {
            return res.status(400).json({message: "Please fill all the fields"});
        }   

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });


        await newIncome.save();
        res.status(201).json(newIncome);
    } catch(error) {
        console.error("Error adding income:", error);
        res.status(500).json({message: "Internal server error"});
    }

}

//Get all income source
exports.getAllIncome = async(req, res) => {
    const userId = req.user._id;

    try {
        const incomes = await Income.find({userId}).sort({date: -1});
        res.json(incomes);
    } catch (error) {
        console.error("Error fetching incomes:", error);
        res.status(500).json({message: "Internal server error"});
    }

};

//Delete income source
exports.deleteIncome = async(req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income source deleted successfully"});
    }catch(error) {
        console.error("Error deleting income:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

//Download income source
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        }));

        // === ExcelJS Part ===
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Income');

        worksheet.columns = [
            { header: 'Source', key: 'Source', width: 30 },
            { header: 'Amount', key: 'Amount', width: 15 },
            { header: 'Date', key: 'Date', width: 20 },
        ];

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        worksheet.getRow(1).font = { bold: true };

        await workbook.xlsx.writeFile('income_details.xlsx');
        // === End of ExcelJS Part ===

        res.download('income_details.xlsx');
    } catch (error) {
        console.error("Error downloading income Excel:", error);
        res.status(500).json({ message: "Internal server error" }); 
    }
};
