import database from '../util/database';
import { Teacher } from '../model/teacher';

const getAllTeachers = async (): Promise<Teacher[]> => {
    try {
        // Fetch all teachers from the database, including their user information.
        // Modify the prisma schema so that User information from the User model is included when fetching Teacher information.
        // Implement the mapping function in Teacher in order to return a domain object.
        // Run the seed.ts script again to add test data to the database.
        return [];
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const updateLearningPath = async (teacherId: number, learningPath: string): Promise<Teacher> => {
    try {
        // Update the learning path of the teacher with the given ID.
        // Return the updated teacher including its user information.
        // Return a domain object.
        return null;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllTeachers,
    updateLearningPath,
};
