import { ObjectId } from "mongodb";


export interface Project {
  _id?: ObjectId;
  title: string;
  project_from?: Date;
  project_to?: Date;

}

export interface ClientProject {
  id: string;
  title: string;
  project_from?: string;
  project_to?: string;
  tasks?: string[];
}

export interface Task {
  _id?: ObjectId;
  project_id: string;
  title: string;
  task_from?: Date;
  task_to?: Date;
  content?: string;
  status?: boolean;
}

export interface ClientTask {
  id: string;
  project_id: string;
  title: string;
  task_from?: string;
  task_to?: string;
  content?: string;
  status?: boolean;
}

export interface ProgressData {
  percentage: number;
  total: number;
  completed: number;
}