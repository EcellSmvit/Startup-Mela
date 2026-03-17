"use client"

import InputField from "@/components/input";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Createpass(){

    const [formData,setFormData] = useState({
        title:"",
        description:"",
        price:0,
        limit:0,
        teamSize:1
    });

    const [error , setError] = useState("");
    const [loading,setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async(e:React.FormEvent) =>{
        e.preventDefault();
        setError("");

        // validation
        if(!formData.title.trim()){
            setError("Pass title is required");
            return;
        }

        if(!formData.description.trim()){
            setError("Description is required");
            return;
        }

        if(formData.price <= 0){
            setError("Price must be greater than 0");
            return;
        }

        if(formData.limit <= 0){
            setError("Limit must be greater than 0");
            return;
        }
        if(formData.teamSize <= 0){
            setError("Team size must be greater than 0");
            return;
        }

        setLoading(true);

        try{
            const res = await fetch("/api/passes",{
                method:"POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
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

        }catch(err){
            console.error(err);
            setError("Network error. Please check your connection.");
        }

        setLoading(false);
    }

    return(
        <div className="bg-[#171716] w-screen min-h-screen flex items-center justify-center text-white px-4">

            <div className="w-full max-w-lg bg-[#1f1f1f] border border-[#2a2a2a] rounded-2xl p-8 shadow-xl">

                <h1 className="text-2xl font-semibold mb-2 text-center">
                    Create Pass
                </h1>

                <p className="text-sm text-gray-400 text-center mb-6">
                    Create a new entry pass for your event. Set price and maximum availability.
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
                            placeholder="Pass Title"
                            onChange={(e)=>
                                setFormData({...formData,title:e.target.value})
                            }
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Example: Startup Mela General Pass
                        </p>
                    </div>

                    <div>
                        <InputField
                            variant="primary"
                            type="text"
                            placeholder="Description"
                            onChange={(e)=>
                                setFormData({...formData,description:e.target.value})
                            }
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Short description of what this pass includes
                        </p>
                    </div>
                    <div>
                        <InputField
                            variant="primary"
                            type="number"
                            placeholder="Team Size"
                            onChange={(e)=>
                                setFormData({...formData,teamSize:Number(e.target.value)})
                            }
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Number of team members allowed with this pass
                        </p>
                    </div>
                    <div>
                        <InputField
                            variant="primary"
                            type="number"
                            placeholder="Price"
                            onChange={(e)=>
                                setFormData({...formData,price:Number(e.target.value)})
                            }
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Enter price in ₹
                        </p>
                    </div>

                    <div>
                        <InputField
                            variant="primary"
                            type="number"
                            placeholder="Limit"
                            onChange={(e)=>
                                setFormData({...formData,limit:Number(e.target.value)})
                            }
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Maximum number of passes available
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
                            "Create Pass"
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