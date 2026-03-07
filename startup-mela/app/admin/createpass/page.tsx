"use client"

import InputField from "@/components/input";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Createpass(){

    const [formData,setFormData] = useState({
        title:"",
        description:"",
        price:0,
        limit:0
    });

    const [error , setError] = useState("");
    const [loading,setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async(e:React.FormEvent) =>{
        e.preventDefault();
        setError("");
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
                const data = await res.json();
                setError(data.error || "Something went wrong");
            }

        }catch{
            setError("Network error");
        }

        setLoading(false);
    }

    return(
        <div className="bg-[#171716] w-screen min-h-screen flex items-center justify-center text-white px-4">

            <div className="w-full max-w-lg bg-[#1f1f1f] border border-[#2a2a2a] rounded-2xl p-8 shadow-xl">

                <h1 className="text-2xl font-semibold mb-6 text-center">
                    Create Pass
                </h1>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >

                    <InputField
                        variant="primary"
                        type="text"
                        placeholder="Title"
                        onChange={(e)=>
                            setFormData({...formData,title:e.target.value})
                        }
                    />

                    <InputField
                        variant="primary"
                        type="text"
                        placeholder="Description"
                        onChange={(e)=>
                            setFormData({...formData,description:e.target.value})
                        }
                    />

                    <InputField
                        variant="primary"
                        type="number"
                        placeholder="Price"
                        onChange={(e)=>
                            setFormData({...formData,price:Number(e.target.value)})
                        }
                    />

                    <InputField
                        variant="primary"
                        type="number"
                        placeholder="Limit"
                        onChange={(e)=>
                            setFormData({...formData,limit:Number(e.target.value)})
                        }
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full py-3 rounded-xl bg-white text-black font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
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

            </div>
        </div>
    )
}