const getAllTeachers = () => {
  return fetch('http://localhost:3000/teachers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updateLearningPath = (teacherId: number, learningPath: string) => {
  return fetch(`http://localhost:3000/teachers/${teacherId}/learningpath?learningPath=${encodeURIComponent(learningPath)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const TeacherService = {
  getAllTeachers,
  updateLearningPath,
};

export default TeacherService;
