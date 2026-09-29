import incomeModel from "../models/incomeModel.js";
import XLSX from "xlsx";
import getDateRange from "../utils/dataFilter.js";

// Add income
export const addIncome = async (req, res) => {
  const userId = req.user._id;
  const { description, amount, category, date } = req.body;

  try {
    if (!description || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newIncome = new incomeModel({
      userId,
      description,
      amount,
      category,
      date: new Date(date),
    });
    await newIncome.save();

    res.status(200).json({
      success: true,
      message: "Income add successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all income
export const getAllIncome = async (req, res) => {
  const userId = req.user._id;

  try {
    const income = await incomeModel.find({ userId }).sort({ date: -1 });
    res.status(200).json(income);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update income
export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { description, amount } = req.body;

  try {
    if (!description || !amount) {
      return res.status(400).josn({
        success: false,
        message: "Both fields are required",
      });
    }

    const income = await incomeModel.findOneAndUpdate(
      { _id: id, userId },
      { description, amount },
      { new: true },
    );

    if (!income) {
      return res.status(400).josn({
        success: false,
        message: "Failed to update income",
      });
    }

    res.status(200).josn({
      success: true,
      message: "Income updated successfully",
      date: income,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete income
export const deleteIncome = async (req, res) => {
  try {
    const income = await incomeModel.findByIdAndDelete({ _id: req.params.id });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Download Income excel file
export const downloadIncomeExcel = async (req, res) => {
  const userId = req.user._id;

  try {
    const income = await incomeModel.find({ userId }).sort({ date: -1 });
    const plainData = income.map((inc) => ({
      Description: inc.description,
      Amount: inc.amount,
      Category: inc.category,
      Date: new Date(inc.date).toLocaleDateString(),
    }));

    // Convert JSON data to worksheet
    const workSheet = XLSX.utils.json_to_sheet(plainData);

    // Create workbook
    const workBook = XLSX.utils.book_new();

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workBook, workSheet, "Income");

    // Generate Excel file as a buffer
    const excelBuffer = XLSX.write(workBook, {
      bookType: "xlsx",
      type: "buffer",
    });

    // Tell browser that this is an Excel file
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="income_details.xlsx"',
    );

    // Send file to browser
    res.send(excelBuffer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get income overview
export const getIncomeOverview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { range = "monthly" } = req.params;
    const { start, end } = getDateRange(range);

    const incomes = await incomeModel
      .find({
        userId,
        date: { $gte: start, $lte: end },
      })
      .sort({ date: -1 });

    const totalIncome = incomes.reduce((acc, cur) => acc + cur.amount, 0);
    const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;
    const numberOfTransactions = incomes.length;
    const recentTransactions = incomes.slice(0, 9);

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        averageIncome,
        numberOfTransactions,
        recentTransactions,
        range,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
