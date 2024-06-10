import { useEffect, useState } from "react"
import { getRequest, postRequest } from "../axios";

export const useRequest = (endpoint) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const callApi = async () =>{
            try {
                const response =  await getRequest(endpoint) ;
                setData(response.data)
            } catch (error) {    
                setError("Something went wrong.")
            } finally{
                setLoading(false)
            }
        };
        callApi();
        
        
    },[]);
    return {
        loading,
        data,
        error
    }
}

export const usePostRequest = (endpoint) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const postData = async (payload) =>{
        setLoading(true);
        try {
            const response =  await postRequest(endpoint,payload) ;
            setData(response.data)
        } catch (error) {    
            setError("Something went wrong.")

        } finally{
            setLoading(false)
        }
    };
    return {
        loading,
        data,
        error,
        postData
    }
}
