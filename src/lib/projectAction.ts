'use server';
import clientPromise from "./mongodb";
import { Project } from "@/types/Project";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { formatInTimeZone } from "date-fns-tz";


async function getCollection(collectionName: string) {
  const client = await clientPromise;
  const db = client.db('board');
  return db.collection<Project>(collectionName);
}


export async function createProject() {
  try {
    const projectCollection = await getCollection('projects');
    const result = await projectCollection.insertOne({
      title:'',
    });
    const projectId = result.insertedId;
    const redirectUrl = `/projects/${projectId}`;
    // redirect(redirectUrl);
    return {data:redirectUrl};

  } catch (error) {
    console.error('Failed to create project:', error); 
    return { message: 'Database Error: Failed to Create Project.', error }; 
  }
}

export async function deleteProject(projectId: string) {
  try {
    const projectCollection = await getCollection('projects');
    await projectCollection.deleteOne({ _id: new ObjectId(projectId) });
    revalidatePath('/projects');
  } catch (error) {
    console.error('Failed to delete project:', error);
    return { message: 'Database Error: Failed to Delete Project.', error };
  }
}

export async function updateProject(projectId:string, title:string,startDate:Date|undefined,endDate:Date|undefined){
  try {
    const koreanTimeZone = 'Asia/Seoul';
    const formatStartDate = startDate
      ? formatInTimeZone(startDate, koreanTimeZone, 'yyyy-MM-dd HH:mm:ssXXX')
      : undefined;
    const formatEndDate = endDate
      ? formatInTimeZone(endDate, koreanTimeZone, 'yyyy-MM-dd HH:mm:ssXXX')
      : undefined;
    const projectCollection = await getCollection('projects');
    await projectCollection.updateOne({
      _id: new ObjectId(projectId)
    }, {
      $set: {
        title: title,
        project_from: formatStartDate ? formatStartDate : undefined,
        project_to: formatEndDate ? formatEndDate : undefined
      }
    });
    revalidatePath(`/projects/${projectId}`);

  } catch (error) {
    console.error('Failed to update project:', error);
    return { message: 'Database Error: Failed to Update Project.', error };
  }

}
