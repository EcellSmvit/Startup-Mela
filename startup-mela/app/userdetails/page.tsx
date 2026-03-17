"use client"

import InputField from "@/components/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function UserDetails() {

    const { update } = useSession();
    const router = useRouter();

    const [formData, setFormData] = useState({
        USN:"",
        mobilenumber:"",
        collegename:"",
        year:""
    });

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();

        setLoading(true);

        const res = await fetch("/api/userdetails",{
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body:JSON.stringify(formData)
        });

        if(res.ok){
            await update();
            router.replace("/dashboard");
        }else{
            const data = await res.json();
            setError(data.error);
        }

        setLoading(false);
    }

    return (
        <div className="bg-[#171716] w-screen min-h-screen flex items-center justify-center text-white">

            <form onSubmit={handleSubmit} className="space-y-6">

                <InputField variant="primary" type="text" placeholder="USN"
                    onChange={(e)=>setFormData({...formData,USN:e.target.value})}/>

                <InputField variant="primary" type="text" placeholder="Mobile"
                    onChange={(e)=>setFormData({...formData,mobilenumber:e.target.value})}/>

                <InputField variant="primary" type="text" placeholder="College"
                    onChange={(e)=>setFormData({...formData,collegename:e.target.value})}/>

                <InputField variant="primary" type="text" placeholder="Year"
                    onChange={(e)=>setFormData({...formData,year:e.target.value})}/>

                {error && <p>{error}</p>}

                <button disabled={loading}>
                    {loading ? "Saving..." : "Submit"}
                </button>

            </form>

        </div>
    )
}