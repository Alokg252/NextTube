'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'

interface Props{
  pid:string;
  setpid:React.Dispatch<React.SetStateAction<string>>;
  play:string;
  setplay:React.Dispatch<React.SetStateAction<string>>;
  find:string;
  setfind:React.Dispatch<React.SetStateAction<string>>;
}

const Search:React.FC<Props> = ({pid, setpid, play, setplay, find, setfind}) => {
   const searchParams = useSearchParams()
   const pathname = usePathname();
   const router = useRouter();

   useEffect(() =>{
    setfind(searchParams.get('s') as string)
    setpid(searchParams.get('p') as string)
    setplay(searchParams.get('v') as string)
   },[])

   useEffect(() => {
     const newParams = new URLSearchParams();
     if (pid) newParams.set('p', pid);
     if (play) newParams.set('v', play);
     if (find) newParams.set('s', find);
 
     const newPathname = `${pathname}?${newParams.toString()}`;
     router.push(newPathname);
   }, [pid, play, find]);
 
  return null;
}

const SearchParam:React.FC<Props> = ({pid, setpid, play, setplay, find, setfind}) => {
  return (

    <Suspense>
      <Search pid={pid} play={play} find={find} setpid={setpid} setplay={setplay} setfind={setfind} />
    </Suspense>
  )
}

export default SearchParam