'use client';

// react
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';

// component
import Task from '../Task/Task';
import DotsMenuBtn from '@/components/shared/DotsMenuBtn/DotsMenuBtn';

// redux
import { useSelector } from 'react-redux';
import MenuPanel from '../../../shared/MenuPanel/MenuPanel';

const StatusSpecificTasks = forwardRef(({ tasksData }, ref) => {
   const tasksContainerRef = useRef();
   const [hasScrollbar, setHasScrollbar] = useState(false);
   const { name, statusSpecificTasks } = tasksData;
   const { isLoading } = useSelector(store => store.task);

   // check for scrollbar
   useEffect(() => {
      if (
         tasksContainerRef.current.scrollHeight >
         tasksContainerRef.current.clientHeight
      ) {
         setHasScrollbar(true);
         return;
      }

      setHasScrollbar(false);
   }, [statusSpecificTasks.length]);

   return (
      <div
         id={name}
         className='bg-white  h-full overflow-hidden rounded-2xl px-3 py-4 drop-target animate-fadeIn border border-neutral-300'
         // ref collection
         ref={el => {
            if (!ref.current.includes(el) && el !== null) {
               ref.current.push(el);
            }
         }}
         // dragover event handle
         onDragOver={e => {
            e.preventDefault();
         }}
      >
         {/* task status label and count */}
         <div className='flex items-center gap-3 mb-7'>
            <h3 className='font-semibold text-2xl'>{name}</h3>
            <p className='min-w-7 py-1 flex items-center justify-center border border-neutral-200 bg-neutral-100 text-neutral-500 rounded-md !leading-none'>
               {statusSpecificTasks.length}
            </p>

            <DotsMenuBtn
               modifyClasses='ml-auto'
               renderChildren={(show, setShow) => {
                  return (
                     <MenuPanel show={show} setShow={setShow}>
                        sss
                     </MenuPanel>
                  );
               }}
            />
         </div>

         {/* tasks container */}
         <div
            ref={tasksContainerRef}
            className={`overflow-y-auto rounded-2xl py-2  h-[calc(57vh-9.5rem)] md:h-[calc(70vh-9.5rem)] scrollbar-thin scrollbar-thumb-primary scrollbar-track-white crollbar-thumb-rounded-full ${
               hasScrollbar ? 'pr-3' : 'pr-0'
            }`}
         >
            {/* if tasks available */}
            {!isLoading && statusSpecificTasks?.length > 0 && (
               <ul className='space-y-3'>
                  {statusSpecificTasks.map(task => {
                     return (
                        <li key={task._id}>
                           <Task taskData={task} />
                        </li>
                     );
                  })}
               </ul>
            )}
         </div>

         {/* if no task */}
         {!isLoading && statusSpecificTasks?.length < 1 && (
            <p className='text-primary font-semibold mt-[14rem] text-center py-elementGapSm'>{`No ${name} Tasks`}</p>
         )}
      </div>
   );
});

StatusSpecificTasks.displayName = 'StatusSpecificTasks';

StatusSpecificTasks.propTypes = {
   tasksData: PropTypes.object,
};

export default StatusSpecificTasks;
