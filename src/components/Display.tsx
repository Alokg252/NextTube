"use client"
import React, { useEffect, memo } from 'react'

interface Props{
  pid:string;
  play:string;
  setplay:React.Dispatch<React.SetStateAction<string>>;
  vside: boolean;
  setlist:React.Dispatch<React.SetStateAction<videoData[]>> | React.Dispatch<React.SetStateAction<never[]>>;
  list:videoData[] | never[];
  settitle:React.Dispatch<React.SetStateAction<string>>;
  title:string;
  find:string;
}

export interface videoData{
  vid:string;
  title:string;
  publish:string;
  duration:string;
}

const Display:React.FC<Props> = ({pid, play, setplay, vside, setlist, list, settitle, title, find}) => {

  useEffect(() => {
    if(pid){
      fetch(`/api/allvideo?pid=${pid}`)
      .then(res => res.json())
      .then(res => setlist(res))
      .catch(err => {setlist([]); console.log(err)})
      
      fetch(`/api/allplaylist?pid=${pid}`)
      .then(res => res.json())
      .then(res => settitle(res[0].title))
      .catch(err => {settitle("Playlist Videos"); console.log(err)});
    }
  }, [pid])

  useEffect(() => {
    if(pid) return;
    if(find) return;
    fetch(`/api/new?q=40`)
    .then(res => res.json())
    .then(res => setlist(res))
    .catch(err => {setlist([]); console.log(err)})
  }, [])

  const Card = ({ item }: { item: videoData, key: number, play:string, setplay:React.Dispatch<React.SetStateAction<string>>; })=>{
    return (<>
      <div className="p-4 border flex-1 max-w-[330] max-lg:min-w-[200px] max-md:min-w-[180px] min-w-[280px] rounded-xl hover:shadow-lg hover:shadow-red-200 shadow-lg bg-white"
        onClick={() => {
          setplay(item.vid);
        }}>
        <img src={`https://i.ytimg.com/vi/${item.vid}/mqdefault.jpg`} alt={item.title} className=" h-auto w-auto rounded-t-xl" />
        <div className="p-2">
          <h2 className="text-md max-xl:text-[12px] font-bold overflow-hidden text-ellipsis whitespace-nowrap block">{item.title}</h2>
          <p className="text-xs max-xl:text-[10px] text-gray-500 overflow-hidden gap-4 text-ellipsis whitespace-nowrap flex justify-between">
            <span className="font-bold">{`${item.publish}`}</span> 
            <span className="font-bold">{`${item.duration}`}</span> 
          </p>
        </div>
      </div>
</>)}

  return (
      <div className={`flex my-4 max-lg:my-8 max-md:my-12 z-10 gap-10 transition-all justify-center absolute h-[92%] ${play? `md:w-[21%] max-md:w-full max-md:h-2/3 max-md:top-[31%] ${vside ? 'right-0' : 'md:-right-[21%]'} md:opacity-90 bg-slate-200`: "w-full right-0"} overflow-auto`}>
      <div className='overflow-hidden text-ellipsis block h-[11%] w-10/12' >
      <h1 className={`${play?`text-md font-bold my-3`:`text-3xl font-extrabold my-6`}`}>{title}</h1>
      </div>
      <div className={`my-24 p-5 flex flex-wrap justify-center flex-shrink flex-grow w-full absolute right-0 items-center ${play? "gap-1 max-md:gap-8": "gap-8"}`}>
      {
        list.length ? ((list.map((item:videoData, index:number) => {
          const pub = new Date(item.publish);
          item.publish = pub.toDateString();
          item.duration = item.duration ? item.duration.replace("PT", "").replace("H", "hrs ").replace("M", "mins ").replace("S", "secs ").replace("H", ":").replace("M", ":").replace("S", "") : "";
          return (
            <Card item={item} key={index} play={play} setplay={setplay} />
          )
        }))) : <h1 className='text-3xl font-extrabold'>No Video Found</h1>
      }
      </div>
      </div>
  )
}

export default memo(Display)
