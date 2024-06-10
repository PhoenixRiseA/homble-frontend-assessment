export const debounce = (func=()=>{}, timeout = 300) =>{
    let timer ;
    return (...args)=>{
        
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            func(...args);
        },timeout)
    }
}