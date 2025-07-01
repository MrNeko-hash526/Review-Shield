import React from 'react'
import { useState,useEffect } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomeBarChart from '../Charts/CustomeBarChart';

const Last30DaysExpenses = ({data}) => {
  console.log("Last30DaysExpenses data", data);
  const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
        console.log("Last30DaysExpenses chartData", result);
        return () => {};
    }, [data]);
            
     


  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 days Expenses</h5>
        </div>

        <CustomeBarChart data = {chartData}/>
    </div>
  )
}

export default Last30DaysExpenses