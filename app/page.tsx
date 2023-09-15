import Image from 'next/image'
import TaskCard from './components/TaskCard';

export default async function Home() {

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const data= await fetch(`${BASE_URL}/api/awsservice`, { cache: 'no-cache' })
  const ecsDetails = await data.json()
  return (
    <main className="flex min-h-screen max-w-7xl flex-col items-center justify-between p-15">
      <div className='flex items-center justify-center min-h-screen  flex-wrap'>
        {ecsDetails.map((task: ExtractedTaskData, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </div>
    </main>
  )
}

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


