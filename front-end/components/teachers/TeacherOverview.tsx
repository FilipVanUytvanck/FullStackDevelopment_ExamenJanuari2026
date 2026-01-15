import LearningPath from '@components/learning-path';
import {Teacher, User} from '@types';
import {useEffect, useState} from 'react';

type Props = {
    teachers: Teacher[];
};

const TeacherOverview: React.FC<Props> = ({teachers}: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<User>(null);

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
    }, []);

    const isAdmin = loggedInUser?.role === 'admin';

    return (
        <>
            <section className="mt-5">
                <table>
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Learning path</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">
                                {teacher.user.firstName} {teacher.user.lastName}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {isAdmin ? (
                                    <LearningPath teacherId={teacher.id} learningPath={teacher.learningPath}/>
                                ) : (
                                    teacher.learningPath
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default TeacherOverview;
