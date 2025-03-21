import React, { useState, useEffect, Dispatch, SetStateAction, memo } from 'react';

interface Props {
    side: boolean;
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

    const sideStyle = `${side ? 'left-0' : '-left-[25%] max-lg:-left-[34%] max-md:-left-[75%]'} w-1/4 max-lg:w-1/3 max-md:w-9/12`;

    return (

        <div className={`fixed top-32 bottom-0 transition-all ${sideStyle} overflow-hidden h-[87%] max-lg:h-[90%] max-xl:h-[88%] z-20 bg-gray-800 text-white`}>
            <div className={"p-4 overflow-auto h-[98%]"}>
                <h2 className={`text-lg p-3 font-bold py-5 fixed bg-red-400 text-gray-800 transition-all ${sideStyle} top-14 max-lg:top-20 max-md:top-20 max-lg:text-[16px] my-1`}>Playlists</h2>
                <div className="">
                    <ul className="mt-4 max-lg:mt-9 max-md:mt-14 ">
                        {playlistData.length ? playlistData.map((item: PlaylistData, index: number) => (
                            <li key={index} className='hover:bg-gray-700 rounded-t-xl'>
                                <details key={index} className=' m-3'>
                                    <summary className='overflow-hidden max-lg:text-[16px] text-ellipsis whitespace-nowrap'
                                        onClick={(e) => {
                                            e.currentTarget.classList.toggle('whitespace-nowrap');
                                        }}
                                    >{item.title}</summary>
                                    <button
                                        className='px-4 py-1 m-2 w-11/12 text-sm max-lg:text-[12px] shadow transition-all hover:bg-red-600 text-white bg-red-400 rounded-lg'
                                        onClick={() => {
                                            setpid(item.pid);
                                        }}
                                    >load video content</button>
                                    <p className='text-sm max-lg:text-[12px] text-gray-400'>{item.desc}</p>
                                </details>
                                <hr />
                            </li>
                        )) : 'No Playlists Found'}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default memo(Sidebar);