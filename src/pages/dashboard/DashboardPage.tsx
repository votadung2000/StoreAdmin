export const DashboardPage = () => {
  return (
    <div className='bg-white p-8 rounded-lg shadow-sm border border-gray-200'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>Dashboard</h2>
      <p className='text-gray-600'>Welcome to Store Admin</p>

      <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-indigo-50 p-6 rounded-lg border border-indigo-100'>
          <h3 className='font-semibold text-indigo-800 mb-2'>New Orders</h3>
          <p className='text-3xl font-bold text-indigo-600'>12</p>
        </div>
        <div className='bg-green-50 p-6 rounded-lg border border-green-100'>
          <h3 className='font-semibold text-green-800 mb-2'>Today's Revenue</h3>
          <p className='text-3xl font-bold text-green-600'>$450.00</p>
        </div>
        <div className='bg-amber-50 p-6 rounded-lg border border-amber-100'>
          <h3 className='font-semibold text-amber-800 mb-2'>Pending Orders</h3>
          <p className='text-3xl font-bold text-amber-600'>5</p>
        </div>
      </div>
    </div>
  );
};
