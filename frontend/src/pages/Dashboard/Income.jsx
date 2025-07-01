import React, { use } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useState, useEffect } from 'react';
import IncomeOverview from '../../components/Income/IncomeOverview';
import { data } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import { toast } from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';





const Income = () => {

  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState(
    {
      show: false,
      data: null,
    }
  );


  const [openAddIncomeModal,setOpenAddIncomeModal] = useState(false);


  // Fetch income data
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      // Simulate fetching income data
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };


  //Handle Add Income 
  const handleAddIncome = async (income) => {
    const {source , amount, date, icon} = income;
    // validate input
    if (!source.trim() ) {
      toast.error("Source is required");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    }catch (error) {
     console.error("Error adding income:", error);
     toast.error(error?.response?.data?.message || error.message);
}

  };

  // Delete Income
  const deleteIncome = async (Id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(Id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  //handle download income details
  const handleDownloadIncomeDetails = async () => {
    try{
      const response = await axiosInstance.get(
      API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: 'blob', // Important for downloading files
        }
      );

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income_details.xlsx'); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Clean up the link element
      window.URL.revokeObjectURL(url); // Free up memory
      toast.success("Income details downloaded successfully");
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };


  useEffect(() => {
    fetchIncomeDetails()

  return () => {};
  }, []);



  return (
    < DashboardLayout activeMenu="Income">
    <div className='my-5 mx-auto'>
      <div className='grid grid-cols-1 gap-6'>
        <div className=''>
          <IncomeOverview
           transactions = {incomeData}
           onAddIncome = {() => setOpenAddIncomeModal(true)}/>
        </div>

        <IncomeList 
           transactions = {incomeData}
           onDelete = {(id)=>{
            setOpenDeleteAlert({
              show: true,
              data : id,});
           }}
            onDownload = {handleDownloadIncomeDetails}
            />
      </div>
      <Modal 
       isOpen={openAddIncomeModal}
       onClose = {() => setOpenAddIncomeModal(false)}
       title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>
        <Modal 
         isOpen={openDeleteAlert.show}
         onClose = {() => setOpenDeleteAlert({show: false, data: null })}
         title="Delete Income"
         >
          <DeleteAlert
             content = "Are you sure you want to delete this income detail?"
             onDelete = {() => deleteIncome(openDeleteAlert.data)}
             />
         </Modal>
    </div>
    </DashboardLayout>
  )
}

export default Income