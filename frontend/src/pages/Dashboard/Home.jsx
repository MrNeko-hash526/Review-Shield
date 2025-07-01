import React, { use } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import  {addThousandsSeparator}  from '../../utils/helper';
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart'; 
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'; 
import RecentIncome from '../../components/Dashboard/RecentIncome'; 

console.log("home page loaded");
const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [dashboardRes, incomeRes, expenseRes] = await Promise.all([
        axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA),
        axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE),
      ]);

      if (dashboardRes.data) {
        setDashboardData(dashboardRes.data);
      }

      const incomes = incomeRes.data.map(item => ({
        ...item,
        type: 'income',
      }));

      const expenses = expenseRes.data.map(item => ({
        ...item,
        type: 'expense',
      }));
       console.log("Expenses from backend:", expenses);

      const combinedTransactions = [...incomes, ...expenses].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setTransactions(combinedTransactions);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);



  return (
   < DashboardLayout activeMenu="Dashboard">
    <div className='my-5 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <InfoCard
           icon = {<IoMdCard/>}
           label = "Total balance"
           value = {addThousandsSeparator(dashboardData?.totalBalance || 0)}
           color = 'bg-primary'
        />
        <InfoCard
           icon = {<LuWalletMinimal/>}
           label = "Total income"
           value = {addThousandsSeparator(dashboardData?.totalIncome || 0)}
           color = 'bg-orange-500'
        />
        <InfoCard
           icon = {<LuHandCoins/>}
           label = "Total expense"
           value = {addThousandsSeparator(dashboardData?.totalExpense || 0)}
           color = 'bg-red-500'
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
       <RecentTransactions
          transactions={transactions}
          onSeeMore={() => navigate("/expense")}
        />

        <FinanceOverview    
          totalBalance = {dashboardData?.totalBalance || 0}
          totalIncome = {dashboardData?.totalIncome || 0}
          totalExpense = {dashboardData?.totalExpense || 0}
        />

        <ExpenseTransactions
          transactions={dashboardData?.last30DaysExpenses?.transactions || []}
          onSeeMore= {() => navigate("/expense")}
        />
        
        <Last30DaysExpenses
           data={dashboardData?.last30DaysExpenses?.transactions || []}
        /> 
        <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions.slice(0,4) || []}
            totalIncome = {dashboardData?.totalIncome||0}
        />
        <RecentIncome
          transactions = {dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore = {() => navigate("/income")}
        />
           
          
      </div>
    </div>
   </DashboardLayout>
  )
}

export default Home