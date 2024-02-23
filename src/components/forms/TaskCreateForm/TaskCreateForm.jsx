'use client';

// shared components
import ButtonBtn from '../../shared/ButtonBtn/ButtonBtn';
import CloseBtn from '@/components/shared/CloseBtn/CloseBtn';
import SelectField from '@/components/shared/SelectField/SelectField';
import InputField2 from '@/components/shared/InputField2/InputField2';
import TextareaField from './../../shared/TextareaField/TextareaField';

// custom hooks
import useMethodsForTaskDatabase from '@/hooks/useMethodsForTaskDatabase';
import useEscapeClose from '../../../hooks/useEscapeClose';
import useFormVisiblity from '@/hooks/useFormVisiblity';
import useClickOutside from '@/hooks/useClickOutside';

// redux
import { useSelector } from 'react-redux';

// data
import { priorityOptions } from '@/uiData/formsUiData';

const TaskCreateForm = () => {
   const { profileData } = useSelector(store => store.auth);
   const { taskCreateFormOpen } = useSelector(store => store.form);
   const { createTask } = useMethodsForTaskDatabase();
   const { closeTaskCreateForm } = useFormVisiblity();

   const handleClickOutside = e => {
      if (!e.target.closest('.task-create-form-focus')) {
         closeTaskCreateForm();
      }
   };

   // add support clicking out side and escape key press
   useEscapeClose(closeTaskCreateForm);
   useClickOutside(taskCreateFormOpen, handleClickOutside);

   const handleCreateTask = e => {
      e.preventDefault();

      // take all the necessary values
      const form = e.target;
      const title = form.title.value;
      const description = form.description.value;
      const deadline = form.deadline.value;
      const priorityLevel = parseInt(form.priority.value);
      const date = new Date().toISOString();

      // Task data summarized
      const taskData = {
         title,
         description,
         statusLevel: 0,
         deadline,
         priorityLevel,
         lastUpdated: date,
         email: profileData.email,
      };

      createTask(taskData);
      closeTaskCreateForm();
      form.reset();
   };

   return (
      <div
         className={`${
            taskCreateFormOpen ? 'block' : 'hidden'
         } translate-x-4 md:translate-x-8 shadow-xl w-[19rem] absolute bottom-0 translate-y-[calc(100%-2px)] left-0 p-4 bg-white border border-neutral-200 z-40 rounded-xl task-create-form-focus`}
      >
         <CloseBtn
            onClickFunction={closeTaskCreateForm}
            modifyClasses='!text-xl'
         />

         {/* form starts here */}
         <form onSubmit={handleCreateTask} className='block space-y-3'>
            {/* title */}
            <InputField2 label='Title' name='title' placeholder='Task Title' />

            {/* description */}
            <TextareaField
               label='Description'
               name='description'
               placeholder='Task Description'
            />

            {/* deadline */}
            <InputField2
               label='Deadline'
               name='deadline'
               placeholder='DD-MMM-YYYY'
            />

            {/* priority */}
            <SelectField
               label='Priority'
               name='priority'
               options={priorityOptions}
               defaultValueData={0}
            />

            {/* submit button */}
            <ButtonBtn text='Add Task' modifyClasses='!ml-auto !mt-5' />
         </form>
      </div>
   );
};

export default TaskCreateForm;
