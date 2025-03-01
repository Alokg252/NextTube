"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Display from "@/components/Display";
import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
export default function Home() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [side, setside] = useState("-left-[25%]");
  const [pid, setpid] = useState(searchParams.get('p') || "");
  const [play, setplay] = useState(searchParams.get('v') || "");
  const [vside, setvside] = useState("-right-[21%]");
  const [list, setlist] = useState([]);
  const [find, setfind] = useState( searchParams.get('s') || "");
  const [title, settitle] = useState("Latest Videos");
  
  useEffect(()=>{
    const newParams = new URLSearchParams();
    if(pid) newParams.set('p', pid);
    if(play) newParams.set('v', play);
    if(find) newParams.set('s', find);

    const newPathname = `${pathname}?${newParams.toString()}`;
    router.push(newPathname);
  },[pid, play, find])

  return (
    <>
      <br /><br />
      <Navbar setside={setside} side={side} play={play} vside={vside} setvside={setvside} setplay={setplay} setlist={setlist} list={list} setfind={setfind} find={find} settitle={settitle} title={title} />
      <Sidebar setpid={setpid} side={side} />
      <Display pid={pid} play={play} setplay={setplay} vside={vside} setlist={setlist} list={list} settitle={settitle} title={title} find={find} />
      <VideoPlayer play={play} setplay={setplay} />
    </>
  );
}
