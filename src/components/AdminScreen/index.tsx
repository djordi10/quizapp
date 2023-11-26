import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { ScreenTypes } from '../../types'
import { useQuiz } from '../../context/QuizContext'

// Styled components
const AdminContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AdminHeader = styled.h2`
  text-align: center;
  color: #333;
`;

const StudentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StudentItem = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  margin-top: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 15px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }

  &:focus {
    outline: none;
  }
`;


// AdminPage component
const AdminPage = () => {
  // Replace this with actual student data fetching logic
//   const students = [
//     { id: 1, name: 'Student 1' },
//     { id: 2, name: 'Student 2' },
//     // ... more students
//   ];

const [students, setStudents] = useState([]);
const { setCurrentScreen, currentStep, setCurrentStep } = useQuiz();
useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://https://quizbackend-orcin.vercel.app//users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        // Set existing answers if any
        setStudents(response.data)
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };
    fetchFeedback();
  }, []);

  const handleScoreEssay = (studentId) => {
    // Implement navigation to the essay scoring page for the given student
    console.log('Navigate to score essay for student:', studentId);
    localStorage.setItem('currentUserID',studentId)
    setCurrentScreen(ScreenTypes.AdminEssayScreen);
    
  };

  const handleLogout = () => {
    localStorage.clear();
    // Redirect to login screen or another appropriate screen
    // If using a router, you can use router's navigation method here
    setCurrentScreen(ScreenTypes.LoginScreen); // Assuming you have a login screen type
  };

  const handleViewReflection = (studentId) => {
    // Implement navigation to the reflection results page for the given student
    console.log('Navigate to view reflection for student:', studentId);
  };

  return (
    <AdminContainer>
      <AdminHeader>Admin Dashboard</AdminHeader>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <StudentList>
        {students.map((student) => (
          <StudentItem key={student.userid}>
            {student.fullname} - {student.nim}
            <div>
              <Button onClick={() => handleScoreEssay(student.userid)}>Nilai Essay</Button>
              <Button onClick={() => handleViewReflection(student.userid)}>Lihat Refleksi</Button>
            </div>
          </StudentItem>
        ))}
      </StudentList>
    </AdminContainer>
  );
};

export default AdminPage;
