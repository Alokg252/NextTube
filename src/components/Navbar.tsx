"use client"
import React, { Dispatch, SetStateAction } from 'react';
import SearchForm from './SearchForm';
import { videoData } from './Display';

interface Props {
  setside: Dispatch<SetStateAction<boolean>>;
  side: boolean;
  setvside: Dispatch<SetStateAction<boolean>>;
  vside: boolean;
  setplay:React.Dispatch<React.SetStateAction<string>>;
  play: string;
  setlist:React.Dispatch<React.SetStateAction<videoData[]>> | React.Dispatch<React.SetStateAction<never[]>>;
  list:videoData[] | never[];
  setfind:React.Dispatch<React.SetStateAction<string>>;
  find:string;
  settitle:React.Dispatch<React.SetStateAction<string>>;
  title:string;
}

const Hamburger = ({ state, setstate, side }: { state: boolean, setstate: Dispatch<SetStateAction<boolean>>, side:boolean }) => {
  return (<button className={`text-gray-500 hover:text-blue-500 focus:outline-none ${side ? "" : "max-md:hidden"}`}
    onClick={(e) => {
      e.preventDefault();
      setstate(!state);
    }}>
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={side?"M4 6h16M4 12h16m-7 6h7":"M4 6h16M4 12h16M4 18h7"} />
    </svg>
  </button>)
}

const Navbar: React.FC<Props> = ({ setside, side, setplay, play, setvside, vside, setlist, list, setfind, find, settitle, title }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container flex md:justify-between items-center p-4">

        <div className="flex items-center justify-between space-x-8">
          <Hamburger state={side} setstate={setside} side={true} />
          <div className="text-2xl text-red-500 font-bold">YouTube</div>
          <button className='bg-red-400 transition-all m-0 hover:bg-red-600 text-white rounded-lg py-2 px-4 text-lg max-xs:hidden'
            onClick={() => {
              const currentURL = typeof window !== "undefined" ? window.location.href : globalThis.location.href; 
              navigator.share({
                title: document.title,
                url: currentURL,
              });
            }}>share</button>
        </div>

        <div className="flex justify-between w-[35%] items-center flex-shrink max-md:ml-12">
          
          <SearchForm list={list} setlist={setlist} setfind={setfind} find={find} settitle={settitle} title={title} />

          <span className={`${play?"":"invisible"}`} >
            <Hamburger state={vside} setstate={setvside} side={false} />
            &nbsp;&nbsp;
            <button className={`text-gray-500 hover:text-blue-500 focus:outline-none`}
              onClick={(e) => {
                e.preventDefault();
                setplay("");
              }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;