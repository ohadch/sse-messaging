import axios from "axios"

export default async function createTask(id, message) {
    return await axios.post("/task", { id, message })
}