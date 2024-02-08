import { toast } from "react-toastify";

export const Notification =(value)=> {
    return toast(value.text, {
        type: value.type
    })
}