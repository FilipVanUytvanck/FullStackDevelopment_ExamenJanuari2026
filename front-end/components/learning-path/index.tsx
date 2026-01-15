import TeacherService from '@services/TeacherService';
import { useState } from 'react';
import {mutate} from "swr";

type Props = {
  teacherId: number;
  learningPath: string;
};

const LearningPath: React.FC<Props> = ({ teacherId, learningPath }: Props) => {
  const handleLearningPathChange = async (event: { target: { value: string } }) => {
    const newLearningPath = event.target.value;

    try {
      const response = await TeacherService.updateLearningPath(teacherId, newLearningPath);

      if (response.ok) {
        mutate('Teachers');
      } else {
        console.error('Failed to update learning path');
      }
    } catch (error) {
      console.error('Error updating learning path:', error);
    }
  };

  return (
    <div className="ml-6">
      <select id="learningPath" className="ml-2 p-1" value={''}>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software development">Software development</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
    </div>
  );
};

export default LearningPath;
