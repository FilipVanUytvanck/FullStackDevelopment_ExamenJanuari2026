import {CreateClassroomInput} from "@types"

const addClassroom = (classroom: CreateClassroomInput) => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null')
    const token = loggedInUser?.token

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/classrooms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: JSON.stringify(classroom),
    })
}

const ClassroomService = {
    addClassroom,
}

export default ClassroomService
