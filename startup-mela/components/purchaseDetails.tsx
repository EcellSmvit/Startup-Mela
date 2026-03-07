import { useEffect, useState } from "react";

interface PurchaseDetailsProps {
    uniqueCode: string;
    title:string;
    price: number;
}

export default function PurchaseInfo(){

    const [purchasedetails,setPurchasedetails] = useState<PurchaseDetailsProps[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        const getPurchasedetails = async () =>{
            try{
                const response = await fetch("/api/purchase",{
                    method:"GET",
                    headers: { "Content-Type": "application/json" },
                })
                const data = await response.json();
                setPurchasedetails(data);
            } catch(error){
                console.error("failed to fetch purchaseDetails",error);
            } finally {
                setLoading(false)
            }
        };
        getPurchasedetails();
    },[])

    if(loading){
        return <div className="text-white text-center p-10">Loading Purchase details Please Wait .....</div>
    }
    return(
        <div className="w-[20vw] h-[20vh] bg-yellow-500 rounded-2xl">
            {purchasedetails.map((item:PurchaseDetailsProps ) =>(
                <div key={item.uniqueCode}>
                    <h1>{item.uniqueCode}</h1>
                    <h1>{item.title}</h1>
                    <h1>{item.price}</h1>
                </div>

            ))}
        </div>
    )
}