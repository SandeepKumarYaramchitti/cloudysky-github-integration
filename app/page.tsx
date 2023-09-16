import Image from 'next/image'
import ECSTasks from './components/ECSTasks';


export default async function Home() {

  return (
    <main className="flex min-h-screen max-w-7xl flex-col items-center justify-between p-15">
      <ECSTasks />
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


