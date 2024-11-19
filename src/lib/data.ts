import { ClientProject, ClientTask, ProgressData, Project, Task } from "@/types/Project";
import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";

async function getCollection(collectionName: string) {
  const client = await clientPromise;
  const db = client.db('board');
  return db.collection(collectionName);
}

export async function fetchAllProject(): Promise<ClientProject[]>{
  try{
    const projectCollection = await getCollection('projects');
    const data = await projectCollection.find({}).toArray() as Project[];
    const projects = data.map((project) => ({
      id: project._id? project._id.toString():'',
      title: project.title,
      project_from: project.project_from? project.project_from.toISOString().split('T')[0] : undefined,
      project_to: project.project_to? project.project_to.toISOString().split('T')[0]: undefined,
    }))
    return projects
  }catch(error){
    console.error('Database Error:', error);
    throw new Error('Failed to fetch project data.');
  }
}

// export async function fetchFilterdProject(query: string) {
//   try {
//     const projectCollection = await getCollection('projects');
//     const searchQuery = query
//       ? {
//           $or: [
//             { title: { $regex: query, $options: 'i' } },
//           ],
//         }
//       : {};

//     const projectsData = await projectCollection.find(searchQuery).sort({ title: 1 }).toArray() as Project[];

//     const projects = projectsData.map((project) => ({
//       id: project._id?.toString() || '',
//       title: project.title,
//       project_from: project.project_from? project.project_from.toISOString().split('T')[0] : undefined,
//       project_to: project.project_to? project.project_to.toISOString().split('T')[0] : undefined,
//     })) as ClientProject[];
//     return projects;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch filterd project.');
//   }
// }

export async function fetchProjectById(projectId: string): Promise<ClientProject | null> {
  try {
    const projectCollection = await getCollection('projects');
    const taskCollection = await getCollection('tasks');
    const project = await projectCollection.findOne({ _id: new ObjectId(projectId)}) as Project;
    if (!project) {
      return null;
    }
    const tasks = await taskCollection.find({ project_id: projectId }).toArray() as Task[];
    const taskTitles = tasks.map((task) => task.title);
    return {
      id: project._id?.toString() || '',
      title: project.title,
      project_from: project.project_from? project.project_from.toISOString().split('T')[0] : undefined,
      project_to: project.project_to? project.project_to.toISOString().split('T')[0] : undefined,
      tasks: taskTitles

    } as ClientProject;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('프로젝트 정보 불러오기 실패');
  }
}

export async function fetchTaskByProjectId(projectId: string): Promise<ClientTask[]> {
  try {
    const taskCollection = await getCollection('tasks');
    const tasks = await taskCollection.find({ project_id: projectId }).toArray() as Task[];

    return tasks.map(task => ({
      id: task._id?.toString() || '',
      project_id: task.project_id,
      title: task.title,
      task_from: task.task_from? task.task_from.toISOString().split('T')[0]: undefined,
      task_to: task.task_to? task.task_to.toISOString().split('T')[0]:undefined,
      content: task.content,
      status: task.status
    })) as ClientTask[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('작업 목록 불러오기 실패');
  }
}

export async function fetchProgress(projectId: string): Promise<ProgressData> {
  try {
    const taskCollection = await getCollection('tasks');
    const tasks = await taskCollection.find({ project_id: projectId }).toArray() as Task[];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === true).length;

    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
      percentage: progressPercentage,
      total: totalTasks,
      completed: completedTasks,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('fetchProgress 실패');
  }
}

