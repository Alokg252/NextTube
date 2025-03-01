import React, { useState, useEffect, Dispatch, SetStateAction, memo } from 'react';

interface Props {
    side: string;
    setpid: Dispatch<SetStateAction<string>>;
}

interface PlaylistData {
    title: string;
    desc: string;
    pid: string;
}

const Sidebar: React.FC<Props> = ({ side, setpid }) => {
    const [playlistData, setPlaylistData] = useState([]);

    useEffect(() => {
        fetch("/api/allplaylist")
            .then(res => res.json())
            .then(data => {
                setPlaylistData(data);
            })
            .catch(err => console.log(err));
    }, []);

    return (

        <div className={`fixed top-32 transition-all ${side} overflow-hidden w-1/4 h-[87%] z-20 bg-gray-800 text-white`}>
            <div className={"p-4 overflow-auto h-[98%]"}>
                <h2 className={`text-lg p-3 font-bold py-5 fixed bg-red-400 text-gray-800 transition-all ${side} top-14 my-1 w-1/4`}>Playlists</h2>
                <div className="">
                    <ul className="mt-4">
                        {playlistData.map((item: PlaylistData, index: number) => (
                            <li key={index} className='hover:bg-gray-700 rounded-t-xl'>
                                <details key={index} className=' m-3'>
                                    <summary className='overflow-hidden text-ellipsis whitespace-nowrap'
                                        onClick={(e) => {
                                            e.currentTarget.classList.toggle('whitespace-nowrap');
                                        }}
                                    >{item.title}</summary>
                                    <button
                                        className='px-4 py-1 m-2 w-11/12 text-sm shadow transition-all hover:bg-red-600 text-white bg-red-400 rounded-lg'
                                        onClick={() => {
                                            setpid(item.pid);
                                        }}
                                    >load video content</button>
                                    <p className='text-sm text-gray-400'>{item.desc}</p>
                                </details>
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default memo(Sidebar);