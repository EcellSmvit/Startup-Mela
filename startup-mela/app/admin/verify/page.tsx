"use client"

import Button from "@/components/button";
import InputField from "@/components/input";
import { useState } from "react"

export default function Verify(){

    const [uniqueCode,setUniqueCode] = useState("");
    const [status,setStatus] = useState<{message: string; type:"success" | "error" | null}>({
        message: "",
        type: null,
    })
    const [loading,setLoading] = useState(false);

    const handleVerify = async () => {
        if(!uniqueCode) return;

        setLoading(true);
        setStatus({message:"",type:null});

        try{
            const response = await fetch("/api/verify",{
                method:"PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uniqueCode }),
            });

            const data = await response.json();

            if(response.ok){
                setStatus({message: data.message, type:"success"});
            }else{
                setStatus({message:data.error || data.message,type:"error"})
            }
        }catch(error){
            setStatus({message:"An error occurred during verification",type:"error"})
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="w-full h-screen bg-black text-[#ececec] flex items-center justify-center p-6">

            <div className="w-full max-w-xl bg-[#262626] rounded-3xl p-10 shadow-xl border border-[#333]">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold tracking-wide">
                        Verify User Pass
                    </h1>
                    <p className="text-sm text-[#b5b5b5] mt-2">
                        Enter the unique code to validate a participant pass
                    </p>
                </div>
                <div className="flex flex-col gap-6">

                    <InputField
                        variant="primary"
                        placeholder="Enter Unique Code (e.g., MV1234)"
                        value={uniqueCode}
                        onChange={(e) => setUniqueCode(e.target.value)}
                        type="text"
                    />

                    <Button
                        variant="primary"
                        text={loading ? "Verifying..." : "Verify Code"}
                        onClick={handleVerify}
                    />

                </div>
                {status.message && (
                    <div
                        className={`mt-8 p-4 rounded-xl text-sm text-center transition-all ${
                            status.type === "success"
                            ? "bg-green-900/30 text-green-400 border border-green-800"
                            : "bg-red-900/30 text-red-400 border border-red-800"
                        }`}
                    >
                        {status.message}
                    </div>
                )}

            </div>

        </div>
    )
}