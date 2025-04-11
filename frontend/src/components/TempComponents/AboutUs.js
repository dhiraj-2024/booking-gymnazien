import React from 'react';
import styled from 'styled-components';

const AboutUsContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
`;

const Title = styled.h1`
  color: #0d369f;
  text-align: center;
  border-bottom: 2px solid #0d369f;
  padding-bottom: 10px;
`;

const Highlight = styled.div`
  background-color: #f0f5ff;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
`;

const Section = styled.div`
  margin-top: 30px;
`;

const SectionTitle = styled.h2`
  color: #0d369f;
  border-left: 4px solid #0d369f;
  padding-left: 10px;
`;

const AboutUs = () => {
  return (
    <AboutUsContainer>
      <Title>About Gymnazien</Title>
      
      <Highlight>
        <p>Gymnazien is dedicated to supporting national gymnastic competitions by providing seamless accommodation solutions for participants, officials, and guests.</p>
      </Highlight>
      
      <Section>
        <SectionTitle>Our Mission</SectionTitle>
        <p>Our mission is to simplify the accommodation booking process for gymnastic events, ensuring all participants have comfortable and convenient stays so they can focus on their performance.</p>
      </Section>
      
      <Section>
        <SectionTitle>Our Services</SectionTitle>
        <p>We specialize in:</p>
        <ul>
          <li>Coordinating hostel and hotel accommodations for competition participants</li>
          <li>Managing group bookings for teams and officials</li>
          <li>Providing secure online booking with Cashfree payment gateway</li>
          <li>Offering local support during events</li>
        </ul>
      </Section>
      
      <Section>
        <SectionTitle>Our Team</SectionTitle>
        <p>Our team consists of sports enthusiasts and hospitality professionals who understand the unique needs of gymnastic competitions. We work closely with event organizers to ensure smooth accommodation arrangements.</p>
      </Section>
      
      <p>For partnership inquiries, please contact us at <a href="mailto:info@gymnazien.in">contact us </a>.</p>
    </AboutUsContainer>
  );
};

export default AboutUs;