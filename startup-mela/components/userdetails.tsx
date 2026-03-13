"use client"

import { useEffect, useState } from "react";

interface UserInfo{
    id: string;
    USN: string;
    mobilenumber: number;
    collegename: string;
    year: string;
}

export default function Userdetails(){
    const[userInformation,setUserinformation] = useState<UserInfo[]>([]);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchuserDetails = async() =>{
            try{

                const res = await fetch("/api/userdetails");
                const data = await res.json();
                setUserinformation(data)
            }catch(error){
                console.error("failed to fetch passes:",error)
            }finally{
                setLoading(false);
            }
        };

        fetchuserDetails();
    },[])
    if (loading) {
        return (
          <div className="text-white text-center py-20 text-lg animate-pulse">
            Loading passes...
          </div>
        );
      }
}