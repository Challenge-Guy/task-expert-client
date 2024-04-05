'use client';

// components
import BarChart from '@/components/shared/BarChart/BarChart';
import ChartHeading from '../ChartHeading/ChartHeading';

// hooks
import useProcessChartsData from '@/hooks/useProcessChartsData';

// redux
import { useSelector } from 'react-redux';
import DonutChart from '@/components/shared/DonutChart/DonutChart';

const Charts = () => {
   const { totalTasks } = useSelector(store => store.task);
   const { getStatusBasedTaskData, getPriorityBasedTaskData } =
      useProcessChartsData();
   const statusBasedTaskData = getStatusBasedTaskData(totalTasks);
   const priorityBasedTaskData = getPriorityBasedTaskData(totalTasks);

   return (
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
         <div>
            <ChartHeading text='Tasks Status' />

            <BarChart
               data={statusBasedTaskData}
               modifyClasses='rounded-3xl border border-neutral-200 shadow-small'
            />
         </div>

         <div>
            <ChartHeading text='Priority' />

            <DonutChart
               data={priorityBasedTaskData}
               modifyClasses='rounded-3xl border border-neutral-200 shadow-small'
            />
         </div>
      </section>
   );
};

export default Charts;
