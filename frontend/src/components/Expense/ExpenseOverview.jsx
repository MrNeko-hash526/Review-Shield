import React from 'react'
import { useState,useEffect} from 'react';
import { LuPlus } from 'react-icons/lu';
import { preparedExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../../components/Charts/CustomLineChart';


const ExpenseOverview = ({transactions,onExpenseIncome}) => {
    const [charData,setChartData] = useState([]);

    useEffect(() => {
        const result = preparedExpenseLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Expense Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    Track your spending habits and manage your finances effectively.
                </p>
            </div>

            <button className='add-btn' onClick={onExpenseIncome}>
                <LuPlus className='text-lg' />
                Add Expense
            </button>
        </div>

        <div className='mt-10'>
           <CustomLineChart data={charData} />
        </div>
    </div>
  )
}

export default ExpenseOverview