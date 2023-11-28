import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SurveyHeader = styled.h2`
  text-align: center;
  color: #333;
`;

const SurveyResponse = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  margin-top: 10px;
  border-radius: 4px;
`;

const ResponseText = styled.p`
  margin: 5px 0;
`;

const ViewSurveyScreen: React.FC = () => {
  const [surveyResponses, setSurveyResponses] = useState([]);

  useEffect(() => {
    const fetchSurveyResponses = async () => {
      const userID = localStorage.getItem('currentUserID');
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://quizbackend-orcin.vercel.app/get-user-surveys?userid=${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSurveyResponses(response.data);
      } catch (error) {
        console.error('Error fetching survey responses:', error);
      }
    };
    fetchSurveyResponses();
  }, []);

  return (
    <Container>
        <SurveyHeader>Respon Survei Pengguna</SurveyHeader>
        {surveyResponses.length > 0 ? (
            surveyResponses.map((response, index) => (
                <SurveyResponse key={index}>
                    <ResponseText><strong>Perasaan:</strong> {response.feeling}</ResponseText>
                    <ResponseText><strong>Komentar:</strong> {response.comments}</ResponseText>
                    <ResponseText><strong>Waktu Pengiriman:</strong> {new Date(response.submittedat).toLocaleString('id-ID')}</ResponseText>
                </SurveyResponse>
            ))
        ) : (
            <p>Tidak ada respon survei ditemukan untuk pengguna ini.</p>
        )}
    </Container>

  );
};

export default ViewSurveyScreen;
