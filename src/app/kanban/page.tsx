'use client';

import React, { useEffect, useState } from "react";
// import { columnsData, cardData } from "./data";
import "./page.css";
import Dialog from "../common/dialog/dialog";
import AddTask from "./add-task/add-task";
import data from './data.json';
import { getLocalStorage, setLocalStorage, storage } from "../services/storage/local-storage";
import { Task } from "../modals/task-type";

export default function KanbanBoard() {

    const [cards, setCards] = useState([]);
    const [draggedElement, setDraggedElement] = useState<number | null>(null);
    const [close, setClose] = useState(false);
    const [editTask, setEditTask] = useState<Task>();
    const [mode, setMode] = useState<string | null>("");
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const tasksKey = "tasks";
    const kanban = data.columnsData;

    useEffect(() => {

        subscribeStore();
        const localStoreData = getLocalStorage(tasksKey);
        if (localStoreData) {
            setCards(localStoreData);
        }
        else {
            storage.dispatch(tasksKey, data.tasks);
        }

    }, []);

    function subscribeStore() {
        storage.subscribe(tasksKey, (res: any) => {
            setLocalStorage(tasksKey, res.detail);
            setCards(res.detail);
        });
    }

    function onDragCard(id: number) {
        setDraggedElement(id)
    }

    function onDropCard(id: string) {
        const findColumn = data.columnsData.find((item) => item.id === id);
        if (draggedElement) {
            const d = [
                ...cards.map((item: Task) => {
                    if ((draggedElement == item.id)) {
                        item.column_id = id;
                        item.status = findColumn?.status ?? ""
                    }
                    return item;
                }),
            ];

            storage.dispatch(tasksKey, d);
        }
    }

    function closeDialog() {
        setClose(true);
        setOpenDialog(false);
        setMode("");
        setEditTask(undefined);
    }

    function editRecord(item:Task){
        setClose(false);
        setMode("edit");
        setEditTask(item);
        setOpenDialog(true);
    }

    return (
        <div className="bg-gray-50 flex justify-center">
            <div className="m-5">
                <div>
                    <Dialog closeDialog={() => { closeDialog() }} close={close} open={openDialog} btnText="Add Task +" btnClass="bg-[#F66135] text-white rounded p-2.5 w-30 text-sm mt-[26px] ml-[26px]" openDialog={(val: boolean) => { if (val) { setClose(!val) } }}>
                        <AddTask closeDialog={() => { closeDialog() }} mode={mode} taskData={editTask} ></AddTask>
                    </Dialog>
                </div>
                <div className="border-b border-gray-300 relative top-20"></div>
                <div className="mt-4 p-2 flex flex-col gap-4 sm:flex-row sm:justify-between sm:flex-wrap">
                    {
                        kanban.map((item) =>
                            <div key={item.id} className="w-full sm:w-[32%] px-2 py-2 task-section">
                                <div className="">
                                    <label data-status={item.status}>{item.text}</label>
                                </div>
                                <div className="mt-2 p-2 h-full"
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                    }}
                                    onDrop={() => {
                                        onDropCard(item.id)
                                    }}
                                >
                                    {
                                        cards.map((c: any) =>
                                            <>
                                                {
                                                    item.id === c.column_id && (
                                                        <div key={c.column_id} className="bg-white p-4 mb-2 rounded-lg w-full cursor-move hover:bg-gray-200 border border-gray-200" draggable
                                                            onDrag={() => { onDragCard(c.id) }}
                                                            onClick={()=>{ editRecord(c) }}
                                                            >
                                                            <p className="font-sans font-semibold">{c.title}</p>
                                                            <p className="text-sm text-[#76787a] font-extralight opacity-70 pt-[5px] pb-[10px]">{c.desc}</p>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>
                                <div>
                                </div>
                            </div>
                        )
                    }
                </div>
                
            </div>
        </div>
    )
}
