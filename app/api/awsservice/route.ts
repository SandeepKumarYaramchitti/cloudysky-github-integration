import { NextResponse } from 'next/server'
import { ECS } from 'aws-sdk';

type ExtractedTaskData = {
  availabilityZone: string;
  connectivity: string;
  connectivityAt: string;
  containers: {
    name: string;
    image: string;
    lastStatus: string;
    cpu: string;
    memory: string;
  }[];
  cpu: string;
  memory: string;
  launchType: string;
};

const extractTaskData = (data: any): ExtractedTaskData[] => {
  if (!data.tasks) return [];

  return data.tasks.map((task: any) => ({
    availabilityZone: task.availabilityZone,
    connectivity: task.connectivity,
    connectivityAt: task.connectivityAt,
    containers: task.containers.map((container: any) => ({
      name: container.name,
      image: container.image,
      lastStatus: container.lastStatus,
      cpu: container.cpu,
      memory: container.memory,
    })),
    cpu: task.cpu,
    memory: task.memory,
    launchType: task.launchType,
  }));
};
 
export async function GET() {


  const ecs = new ECS({ region: 'us-east-1' });
  
    const data = await ecs.listTasks({ cluster: 'nextjs-cluster' }).promise();

    if (!data.taskArns || data.taskArns.length === 0) {
      throw new Error('No tasks found for the specified cluster.');
    }
    
    const rawtaskDetails = await ecs.describeTasks({
      cluster: 'nextjs-cluster',
      tasks: data.taskArns
    }).promise();
    
    const sanitizedData = extractTaskData(rawtaskDetails);
    return NextResponse.json(sanitizedData)
  
  
}