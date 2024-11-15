'use server';


import { ObjectId } from 'mongodb';
import clientPromise from "./mongodb";
import { Task } from "@/types/Project";
import { revalidatePath } from 'next/cache';
import { convertToKoreanDate } from './utils';


async function getCollection(collectionName: string) {
  const client = await clientPromise;
  const db = client.db('board');
  return db.collection<Task>(collectionName);
}

export async function createTask(projectId:string,title: string) {
  try {
    const taskCollection = await getCollection('tasks');
    await taskCollection.insertOne({
      project_id: projectId,
      title: title,
    });
    revalidatePath(`/projects/${projectId}`);
  } catch (error) {
    console.error('Failed to create task:', error);
    return { message: 'Database Error: Failed to Create Task.', error };
  }
}

export async function deleteTask(taskId: string) {
  try {
    const taskCollection = await getCollection('tasks');
    await taskCollection.deleteOne({ _id: new ObjectId(taskId) });
    return { message: 'Deleted Task' };
  } catch (error) {
    console.error('Failed to delete task:', error);
    return { message: 'Database Error: Failed to Delete Task.', error };
  }
}

export async function updateTask(taskId:string, title:string,startDate:Date|undefined,endDate:Date|undefined,content:string,status:boolean|undefined){
  try {
    const formatStartDate = startDate? convertToKoreanDate(startDate):undefined;
    const formatEndDate = endDate? convertToKoreanDate(endDate):undefined;

    const taskCollection = await getCollection('tasks');
    await taskCollection.updateOne({
      _id: new ObjectId(taskId)
    }, {
      $set: {
        title: title,
        task_from: formatStartDate ? formatStartDate : undefined,
        task_to: formatEndDate ? formatEndDate : undefined,
        content: content,
        status: status
      }
    });
    return {message:'Updated Task'}; 

  } catch (error) {
    console.error('Failed to update task:', error);
    return { message: 'Database Error: Failed to Update Task.', error };
  }

}