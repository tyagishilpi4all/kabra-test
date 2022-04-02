import { toast } from "react-toastify";
import { getSession, setSession } from "../../Utils/helperFunctions";
import { getApi } from "../api-interface/api-interface";

export async function onCreateSession() {

    try {
        if (Boolean(getSession())) {
            toast.success("Welcome back!")
        } else {
            const response = await getApi(`/api/userSession`); 
            if (response?.status === 200) {
                toast.success("Welcome to our online shop!")
                setSession(response.data.data.sessionId)
            }
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}