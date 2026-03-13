"use client"

import InputField from "@/components/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function userdetails(){
    const[formData,setFormData] = useState({
        USN:"",
        mobilenumber:"",
        collegename:"",
        year:""
    });

    const[error,setError] = useState("");
    const[loading,setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async(e:React.FormEvent) =>{
        e.preventDefault();
        setError("");
        if(!formData.USN.trim()){
            setError("USN is required")
            return;
        }

        if(!formData.mobilenumber.trim()){
            setError("Mobile number is required")
            return;
        }
        if(!formData.collegename.trim()){
            setError("College name is required")
            return;
        }
        if(!formData.year.trim()){
            setError("Year is required")
            return;
        }

        setLoading(true);

        try{
            const res = await fetch("/api/userdetails",{
                method:"POST",
                body: JSON.stringify(formData),
                headers:{"Content-Type":"application/json"}
            });

            if(res.ok){
                router.push("/dashboard");
            }else{
                let message = "Something went wrong";
                try{
                    const data = await res.json();
                    message = data.error || message;
                }catch{}
                setError(message);
            }
        } catch(err){
            console.error(err);
            setError("Network error. Please check your connection.")
        }
        setLoading(false)

    }
    useEffect(() => {
    const checkExisting = async () => {
        const res = await fetch("/api/userdetails");
        const data = await res.json();
        if (data && data.id) {
            router.push("/dashboard"); // Redirect if details already exist
        }
    };
    checkExisting();
}, [router]);
    return(
        <div className="bg-[#171716] w-screen min-h-screen flex items-center justify-center text-white px-4">

            <div className="w-full max-w-lg bg-[#1f1f1f] border border-[#2a2a2a] rounded-2xl p-8 shadow-xl">
                <h1 className="text-2xl font-semibold mb-2 text-center">
                   Fill Your details
                </h1>
                <p className="text-sm text-gray-400 text-center mb-6">
                    Create User Information 
                </p>
                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center bg-red-500/10 py-2 rounded-lg">
                        {error}
                    </p>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <div>
                        <InputField
                            variant="primary"
                            type="text"
                            placeholder="Enter Your unviresty seat number"
                            onChange={(e) => 
                                setFormData({...formData,USN:e.target.value})
                            }
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Example: 1MV23CS000
                        </p>
                    </div>
                    <div>
                        <InputField
                            variant="primary"
                            type="number"
                            placeholder="Enter Your Mobile Number"
                            onChange={(e)=> setFormData({...formData,mobilenumber:e.target.value})}
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Enter your mobile number
                        </p>
                    </div>
                    <div>
                        <InputField
                            variant="primary"
                            type="text"
                            placeholder="Enter Your college Name"
                            onChange={(e)=> setFormData({...formData,collegename:e.target.value})}
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Enter your college name
                        </p>
                    </div>
                    <div>
                        <InputField
                            variant="primary"
                            type="text"
                            placeholder="Enter Your college Name"
                            onChange={(e)=> setFormData({...formData,year:e.target.value})}
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            ex:1nd year , 2nd year ,3rd year, 4th year
                        </p>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full py-3 rounded-xl bg-yellow-500 text-black font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                Creating...
                            </>
                        ) : (
                            "Create"
                        )}
                    </button>

                </form>
                <p className="text-xs text-gray-500 text-center mt-6">
                    After creating the pass, it will appear on the dashboard where users can purchase it.
                </p>
            </div>

        </div>
    )
}