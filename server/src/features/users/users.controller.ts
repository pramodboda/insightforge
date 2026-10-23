import {getEmployees100} from "./users.model";

export function fetchEmployees100(){
    try{
        const users = await getEmployees100();
    }catch(err:any){
        console.error("Error detching users:",{
            message:"Internal server error",
            error: error?.message || "Unknown error",
        });
    }
}