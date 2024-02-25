// component
import AllTasks from '@/components/page-related/manage-tasks/AllTasks/AllTasks';
import TaskCreateForm from '@/components/forms/TaskCreateForm/TaskCreateForm';
import TaskUtilsHeader from '@/components/page-related/manage-tasks/TaskUtilsHeader/TaskUtilsHeader';

// utils
import { TaskDragDropProvider } from '@/utils/TaskDragDropUtils';
import TaskEditForm from '@/components/forms/TaskEditForm/TaskEditForm';

const ManageTasks = () => {
   return (
      <div>
         {/* make this section's postion relative for the form below */}
         <section className='mb-customSm relative'>
            <TaskUtilsHeader />
            <TaskCreateForm />
            <TaskEditForm />
         </section>

         <section>
            <TaskDragDropProvider>
               <AllTasks />
            </TaskDragDropProvider>
         </section>
      </div>
   );
};

export default ManageTasks;
