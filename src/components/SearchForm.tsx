import React, { useEffect } from 'react'
import { videoData} from "@/components/Display";

interface Props{
    setlist:React.Dispatch<React.SetStateAction<videoData[]>> | React.Dispatch<React.SetStateAction<never[]>>;
    list:videoData[] | never[];
    setfind:React.Dispatch<React.SetStateAction<string>>;
    find:string;
    settitle:React.Dispatch<React.SetStateAction<string>>;
    title:string;
}

const SearchForm:React.FC<Props> = ({setlist, setfind, find, settitle}) => {
    
    const handleSearch = async (e:FormData) => {
        const query:FormDataEntryValue | null = e.get("search");
        if(query){
            setfind(query.toString());
        }
    }

    useEffect(() => {
        if(!find) return;
        fetch(`/api/search?q=${find}`)
        .then(res => res.json())
        .then(res => {setlist(res); settitle(`Search Results for ${find}`)})
        .catch(err => {setlist([]);
        console.log(err)});
    }, [find])
    
    return (
        <form action={handleSearch} className="flex items-center space-x-2 mx-5">
            <input
                type="search"
                name='search'
                id='search'
                className="bg-white border border-gray-300 rounded-md p-2 w-64 focus:outline-none"
                placeholder="Search"
            />
            <button
                type="submit"
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 transition-all rounded-md">
                Search
            </button>
        </form>
    )
}

export default SearchForm

