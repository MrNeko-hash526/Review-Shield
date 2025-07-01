import React from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomeBarChart from '../Charts/CustomeBarChart'
import { useState,useEffect } from 'react'
import { prepareIncomeBarChartData } from '../../utils/helper'
const IncomeOverview = ({transactions,onAddIncome}) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);


        return () => {};
    }, [transactions]);
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Income Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    Tracking your income sources and amounts over time.
                    Track your earning to make informed financial decisions.
                </p>
            </div>
            <button className='add-btn' onClick={onAddIncome}>
                <LuPlus className='text-lg' />
                Add Income
            </button>
        </div>
        <div className='mt-10'>
           <CustomeBarChart data={chartData} />
        </div>
    </div>
  )
}

export default IncomeOverview