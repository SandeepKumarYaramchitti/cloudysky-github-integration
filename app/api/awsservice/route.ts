import { NextResponse } from 'next/server'
import { ECS } from 'aws-sdk';
 
export async function GET() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//   const data = await res.json()
  const ecs = new ECS({ region: 'us-east-1' });
  
    const data = await ecs.listTasks({ cluster: 'nextjs-cluster' }).promise();

    if (!data.taskArns || data.taskArns.length === 0) {
      throw new Error('No tasks found for the specified cluster.');
    }
    
    const taskDetails = await ecs.describeTasks({
      cluster: 'nextjs-cluster',
      tasks: data.taskArns
    }).promise();

    return NextResponse.json(taskDetails)
  
  
}