"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Display from "@/components/Display";
import { useState, Suspense } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import SearchParam from "@/components/SearchParam";

function HomeContent() {

  const [side, setside] = useState("-left-[25%]");
  const [pid, setpid] = useState("");
  const [play, setplay] = useState("");
  const [vside, setvside] = useState("-right-[21%]");
  const [list, setlist] = useState([]);
  const [find, setfind] = useState("");
  const [title, settitle] = useState("Latest Videos");


  return (
    <>
      <br /><br />
      <Navbar setside={setside} side={side} play={play} vside={vside} setvside={setvside} setplay={setplay} setlist={setlist} list={list} setfind={setfind} find={find} settitle={settitle} title={title} />
      <Sidebar setpid={setpid} side={side} />
      <Display pid={pid} play={play} setplay={setplay} vside={vside} setlist={setlist} list={list} settitle={settitle} title={title} find={find} />
      <VideoPlayer play={play} setplay={setplay} />
      <SearchParam pid={pid} play={play} find={find} setpid={setpid} setplay={setplay} setfind={setfind} />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
