const Expense = require('../models/Expense');
const ExcelJS = require('exceljs');




//Add Expense source
exports.addExpense = async(req, res) => {
    const userId = req.user._id;

    try{
        const {icon, category, amount,date} = req.body;

        // Validate input
        if(!category || !amount || !date) {
            return res.status(400).json({message: "Please fill all the fields"});
        }   

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });


        await newExpense.save();
        res.status(201).json({newExpense});
    } catch(error) {
        console.error("Error adding Epense", error);
        res.status(500).json({message: "Internal server error"});
    }

};

//Get all expense source
exports.getAllExpense= async(req, res) => {
    const userId = req.user._id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    } catch (error) {
        console.error("Error fetching Expense:", error);
        res.status(500).json({message: "Internal server error"});
    }

};

//Delete expense source
exports.deleteExpense = async(req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "expense source deleted successfully"});
    }catch(error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

//Download expense source
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        }));

        // === ExcelJS Part ===
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Expense');

        worksheet.columns = [
            { header: 'Category', key: 'Category', width: 30 },
            { header: 'Amount', key: 'Amount', width: 15 },
            { header: 'Date', key: 'Date', width: 20 },
        ];

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        worksheet.getRow(1).font = { bold: true };

        await workbook.xlsx.writeFile('expense_details.xlsx');
        // === End of ExcelJS Part ===

        res.download('expense_details.xlsx');
    } catch (error) {
        console.error("Error downloading expense Excel:", error);
        res.status(500).json({ message: "Internal server error" }); 
    }
};
