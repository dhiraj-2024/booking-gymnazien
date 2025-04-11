import React from 'react';
import styled from 'styled-components';

const RefundPolicyContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  color: #333;
`;

const Title = styled.h1`
  color: #0d369f;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #0d369f;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
`;

const List = styled.ul`
  margin-bottom: 15px;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
  line-height: 1.6;
  font-size: 16px;
`;

const Highlight = styled.div`
  background-color: #f8f9fa;
  border-left: 4px solid #0d369f;
  padding: 15px;
  margin: 20px 0;
  font-size: 15px;
`;

const RefundPolicy = () => {
  return (
    <RefundPolicyContainer>
      <Title>Cancellation & Refund Policy</Title>
      
      <Section>
        <SectionTitle>Payment Policy</SectionTitle>
        <List>
          <ListItem>Full payment required at the time of booking</ListItem>
          <ListItem>Security Deposit: ₹1,000 refundable deposit per room to be paid at check-in</ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>Cancellation Policy</SectionTitle>
        <List>
          <ListItem>No Cancellations or Refunds: Once booked, no refunds will be issued</ListItem>
        </List>
        
        <Highlight>
          Important: All bookings are final. No changes or cancellations can be made after payment is completed.
        </Highlight>
      </Section>
    </RefundPolicyContainer>
  );
};

export default RefundPolicy;