import React from 'react';
import card02 from '../../assets/images/card02.png';
import { LuTrendingUpDown } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className='flex relative overflow-hidden'>
      {/* Left Section */}
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 z-30 relative'>
        <h2 className='text-lg font-medium text-black z-30 relative'>Expense Tracker</h2>
        {children}
      </div>

      {/* Right Section */}
      <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat relative overflow-hidden'>

        {/* Decorative Background Elements */}
        <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 z-10' />
        <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] right-10 z-10' />
        <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 z-10' />

        {/* Stats Info Card */}
        <div className='grid grid-cols-1 z-20 relative'>
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your Income and Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>

        {/* Bottom Image */}
        <img
          src={card02}
          alt="Card"
          className='w-64 h-50 lg:w-[90%]  absolute bottom-20 shadow-lg 
          shadow-blue-400/15 rounded-[10px] left-1/2 transform -translate-x-1/2 z-20'
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-md text-white w-fit'>
      <div className='flex items-center gap-4'>
        <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
          {icon}
        </div>
        <div>
          <h6 className='text-sm font-medium bg-white/30 px-2 py-1 rounded-md text-black inline-block'>
            {label}
          </h6>
          <div className='text-lg font-semibold text-white mt-1'>
            ${value}
          </div>
        </div>
      </div>
    </div>
  );
};
