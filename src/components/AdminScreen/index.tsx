import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ScreenTypes } from '../../types';
import { useQuiz } from '../../context/QuizContext';

// Define types
interface Student {
  userid: string;
  fullname: string;
  nim: string;
  kelas: string;
}

interface StudentsByKelas {
  [key: string]: Student[];
}

// Enhanced styled components
const AdminContainer = styled.div`
  padding: 40px;
  max-width: 1000px;
  margin: 20px auto;
  background-color: #ffffff; /* Lighter shade for a fresh look */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AdminHeader = styled.h2`
  text-align: center;
  color: #004085; /* Darker shade for better contrast */
  margin-bottom: 40px; /* Added more spacing */
  font-size: 24px; /* Increased font size */
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#007bff' : '#f8f9fa')};
  color: ${({ active }) => (active ? '#fff' : '#007bff')};
  border: 2px solid #007bff;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#e2e6ea')};
  }

  &:focus {
    outline: none;
  }
`;

const StudentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StudentItem = styled.li`
  background-color: #f8f9fa;
  border: 2px solid #dee2e6;
  padding: 20px;
  margin-top: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease-in-out; /* Smooth background transition */

  &:hover {
    background-color: #e2e6ea; /* Slight background change on hover */
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px; /* Increased padding for better clickability */
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold; /* Make text bold */
  transition: background-color 0.3s, transform 0.2s; /* Smooth color and transform transition */

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px); /* Slight lift effect */
  }

  &:focus {
    outline: none;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #dc3545; /* Red color for logout to differentiate */
  margin-bottom: 20px;

  &:hover {
    background-color: #c82333;
  }
`;

const SectionHeader = styled.h3`
  color: #007bff; /* Theme color for section headers */
  margin-top: 30px;
  font-size: 20px;
  border-bottom: 2px solid #007bff; /* Added underline for emphasis */
  padding-bottom: 5px;
`;

// AdminPage component with enhanced styling
const AdminPage: React.FC = () => {
  const [students, setStudents] = useState<StudentsByKelas>({});
  const [activeTab, setActiveTab] = useState<string>('');
  const { setCurrentScreen } = useQuiz();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://quizbackend-orcin.vercel.app/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const studentsByKelas: StudentsByKelas = response.data.reduce((acc: StudentsByKelas, student: Student) => {
          if (!acc[student.kelas]) {
            acc[student.kelas] = [];
          }
          acc[student.kelas].push(student);
          return acc;
        }, {});
        setStudents(studentsByKelas);
        setActiveTab(Object.keys(studentsByKelas)[0]); // Set the first class as the default active tab
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleScoreEssay = (studentId: string) => {
    localStorage.setItem('currentUserID', studentId);
    setCurrentScreen(ScreenTypes.AdminEssayScreen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentScreen(ScreenTypes.LoginScreen);
  };

  const handleViewReflection = (studentId: string) => {
    localStorage.setItem('currentUserID', studentId);
    setCurrentScreen(ScreenTypes.AdminSurveyScreen);
  };

  return (
    <AdminContainer>
      <AdminHeader>Prof. Dr. Suyatno, M.Pd. - Dosen Pengampu Mata Kuliah Sastra Anak</AdminHeader>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <TabsContainer>
        {Object.keys(students).map((kelas) => (
          <Tab key={kelas} active={activeTab === kelas} onClick={() => setActiveTab(kelas)}>
            {`Kelas 2022 ${kelas}`}
          </Tab>
        ))}
      </TabsContainer>
      {Object.entries(students).map(
        ([kelas, studentsInKelas]) =>
          activeTab === kelas && (
            <div key={kelas}>
              <SectionHeader>{`Kelas 2022 ${kelas}`}</SectionHeader>
              <StudentList>
                {studentsInKelas.map((student) => (
                  <StudentItem key={student.userid}>
                    {student.fullname} - {student.nim}
                    <div>
                      <Button onClick={() => handleScoreEssay(student.userid)}>Nilai Essay</Button>
                      <Button onClick={() => handleViewReflection(student.userid)}>Refleksi</Button>
                    </div>
                  </StudentItem>
                ))}
              </StudentList>
            </div>
          )
      )}
    </AdminContainer>
  );
};

export default AdminPage;
