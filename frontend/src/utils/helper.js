import moment from 'moment';


export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    
    let inittials = ' ';

    for(let i = 0; i<Math.min(words.length, 2); i++) {
        inittials += words[i][0];
    }
    return inittials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
    if(num === null || isNaN(num)) return '';

    const [integerPart, fractionalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};


export const prepareExpenseBarChartData = (data = []) => {
  console.log("Raw transaction data:", data);

  const chartData = data.map((item) => ({
    category: item?.category || 'Unknown',
    amount: Number(item?.amount || 0),
  }));

  console.log("Prepared bar chart data:", chartData);
  return chartData;
};


export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const chartData = sortedData.map((item) => ({
    category:moment(item?.date).format("Do MMM"),
    amount: item?.amount,
  }));

  return chartData;
};

export const preparedExpenseLineChartData = (data=[])=>{
     const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

     const charData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        category: item?.category ,
      }));
     return charData;
};