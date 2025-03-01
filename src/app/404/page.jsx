import wait from './wait.gif'
import Image from 'next/image';
export default function Custom404() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">Data Refreshing!</h1>
      <p className="text-2xl mt-4 mb-8 text-center">
        Our service is currently unavailable. Please try again after 2 mins. we will get up soon after refreshing our data.
      </p>
      <Image className="mx-auto" src={wait} alt="wait" unoptimized />
      
    </div>
  );
}
