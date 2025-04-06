import { Task } from '@/app/modals/task-type';
import { getLocalStorage, storage } from '@/app/services/storage/local-storage';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type TaskFormProps = {
    closeDialog: () => void;
    mode: string | null;
    taskData?: Task;
};

const AddTask = (props: TaskFormProps) => {
    const tasksKey = 'tasks';

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (props.taskData) {
            setValue('title', props.taskData.title);
            setValue('desc', props.taskData.desc);
        }
    }, [props.mode, props.taskData]);

    const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
        const storedData = getLocalStorage(tasksKey) || [];
        let updatedTasks;

        if (props.mode === 'edit' && props.taskData) {
            updatedTasks = storedData.map((task: Task) =>
                task.id === props?.taskData?.id ? { ...task, title: data.title, desc: data.desc } : task
            );
        } else {
            const newTask = {
                id: crypto.randomUUID(),
                column_id: 'todo',
                title: data.title,
                desc: data.desc,
                status: 'todo',
            };
            updatedTasks = [newTask, ...storedData];
        }

        storage.dispatch(tasksKey, updatedTasks);
        reset();
        props.closeDialog();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4 lg:w-100 md:w-100 sm:w-full"
        >
            <h2 className="text-xl font-bold mb-4">{props.mode === 'edit' ? 'Edit Task' : 'Add a New Task'}</h2>

            {/* Task Name */}
            <div>
                <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">
                    Task Name
                </label>
                <input
                    type="text"
                    id="taskName"
                    {...register('title', { required: 'Task name is required' })}
                    className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task name"
                />
                {errors.title && (
                    <p className="text-sm text-red-500 mt-1">Please enter Task Name</p>
                )}
            </div>

            {/* Task Description */}
            <div>
                <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Task Description
                </label>
                <textarea
                    id="taskDescription"
                    rows={5}
                    {...register('desc', { required: 'Task description is required' })}
                    className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task description"
                />
                {errors.desc && (
                    <p className="text-sm text-red-500 mt-1">Please enter Task Description</p>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-[#F66135] px-4 py-2 m-2 text-white rounded-lg hover:bg-orange-500 transition duration-200"
                >
                    {props.mode === 'edit' ? 'Update Task' : 'Add Task'}
                </button>
            </div>
        </form>
    );
};

export default AddTask;
