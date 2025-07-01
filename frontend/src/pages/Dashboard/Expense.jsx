import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useState,useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { toast } from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';


const Expense = () => {
  useUserAuth();

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert,setOpenDeleteAlert] = useState(
      {
        show: false,
        data: null,
      }
    );
  
  
    const [openAddExpenseModal,setOpenAddExpenseModal] = useState(false);
      const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      // Simulate fetching income data
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expense data:", error);
    } finally {
      setLoading(false);
    }
  };


  //Handle Add Expense
  const handleAddExpense = async (expense) => {
    const {category , amount, date, icon} = expense;
    // validate input
    if (!category.trim() ) {
      toast.error("Category is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Valid amount is required");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }
    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    }catch (error) {
     console.error("Error adding expense:", error);
     toast.error(error?.response?.data?.message || error.message);
}
  };

  // Delete Expense
  const deleteExpense = async (Id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(Id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting Expense:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

   //handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: 'blob', // Important for downloading files
        }
      );

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx'); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Clean up the link element
      window.URL.revokeObjectURL(url); // Free up memory
      toast.success("Expense details downloaded successfully");
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  
 useEffect(() => {
    fetchExpenseDetails();

    return() => {}
  }, []);

  return (
    < DashboardLayout activeMenu="Expense">
    <div className='my-5 mx-auto'>
      <div className='grid grid-cols-1 gap-6'>
        <div className=''>
           <ExpenseOverview
             transactions={expenseData}
             onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
        </div>

        <ExpenseList
          transactions={expenseData}
          onDelete = {(id) => {
            setOpenDeleteAlert({
              show: true,
              data: id
            });
          }}
          onDownload = {handleDownloadExpenseDetails}
          />
          
      </div>
      <Modal 
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
        >
        <AddExpenseForm 
          onAddExpense = {handleAddExpense}/>
        </Modal>
         <Modal 
         isOpen={openDeleteAlert.show}
         onClose = {() => setOpenDeleteAlert({show: false, data: null })}
         title="Delete Expense"
         >
          <DeleteAlert
             content = "Are you sure you want to delete this expense detail?"
             onDelete = {() => deleteExpense(openDeleteAlert.data)}
             />
         </Modal>
    </div>
    </DashboardLayout>
  )
}

export default Expense