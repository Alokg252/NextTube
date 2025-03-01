"use client"

export default function AdminDashboard() {

    return (
        <div className="bg-white flex flex-col items-center h-screen p-10">
            <h1 className="text-6xl font-bold mb-10">Admin Dashboard</h1>
            <div className="w-full h-1 bg-gray-300"></div>
            <button onClick={async() =>{
                            const username = prompt("enter username")
                            const password = prompt("enter password")
                            await fetch("/api/refresh",{
                                headers : {
                                    authorization: `Basic ` + btoa(`${username}:${password}`)
                                }
                            }
                        ).then(res => res.json())
                        .then(res => alert(res.message))
                        .catch(res => alert(res))
                    }
                 } className="bg-blue-500 w-[20%] my-5 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded transition-all">
                Refresh
            </button>
        </div>
    );
}
