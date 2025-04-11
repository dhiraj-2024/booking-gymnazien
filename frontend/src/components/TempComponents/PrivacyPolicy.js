import React from 'react';
import styled from 'styled-components';

const PolicyContainer = styled.div`
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

const LastUpdated = styled.p`
  font-style: italic;
  text-align: right;
  color: #666;
`;

const Section = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  color: #0d369f;
  margin-top: 20px;
`;

const PrivacyPolicy = () => {
  return (
    <PolicyContainer>
      <Title>Privacy Policy</Title>
      <LastUpdated>Last Updated: May 2023</LastUpdated>
      
      <p>At Gymnazien, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our accommodation booking services for national gymnastic competitions.</p>
      
      <Section>
        <SectionTitle>Information We Collect</SectionTitle>
        <p>We collect information you provide when making bookings, including name, contact details, payment information, and accommodation preferences.</p>
      </Section>
      
      <Section>
        <SectionTitle>How We Use Your Information</SectionTitle>
        <p>Your information is used to process bookings, communicate about your stay, and improve our services. We do not share your data with third parties except as necessary for accommodation provision or when required by law.</p>
      </Section>
      
      <Section>
        <SectionTitle>Data Security</SectionTitle>
        <p>We implement security measures to protect your information. Payment processing is handled securely through Cashfree payment gateway.</p>
      </Section>
      
      <Section>
        <SectionTitle>Your Rights</SectionTitle>
        <p>You may request access to, correction of, or deletion of your personal data by contacting us.</p>
      </Section>
      
      <Section>
        <SectionTitle>Changes to This Policy</SectionTitle>
        <p>We may update this policy periodically. The updated version will be posted on our website.</p>
      </Section>
      
      <p>For any privacy-related questions, please contact us at <a href="Pune2025.ART@gmail.com">contact us </a>.</p>
    </PolicyContainer>
  );
};

export default PrivacyPolicy;