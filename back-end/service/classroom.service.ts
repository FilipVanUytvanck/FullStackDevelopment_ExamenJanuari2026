import classroomDb from '../repository/classroom.db';
import { Classroom } from '../model/classroom';

const createClassroom = async (classroom: { name: string }): Promise<Classroom> => {
    const existingClassroom = await classroomDb.getClassroomByName(classroom.name);
    if (existingClassroom) {
        throw new Error('Classroom with this name already exists');
    }

    return classroomDb.createClassroom(classroom);
};

export default { createClassroom };