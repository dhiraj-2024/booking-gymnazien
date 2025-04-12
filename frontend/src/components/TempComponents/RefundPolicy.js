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

const UpdatedDate = styled.p`
  font-style: italic;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`;

const RefundPolicy = () => {
  return (
    <RefundPolicyContainer>
      <Title>Cancellation & Refund Policy</Title>
      <UpdatedDate>Last updated on 12-04-2025 13:00:02</UpdatedDate>
      
      <Section>
        <p>GYMNAZIEN TECH PRIVATE LIMITED believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:</p>
        
        <List>
          <ListItem>Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</ListItem>
          <ListItem>GYMNAZIEN TECH PRIVATE LIMITED does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</ListItem>
          <ListItem>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 30+ Days days of receipt of the products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 30+ Days days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</ListItem>
          <ListItem>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them. In case of any Refunds approved by the GYMNAZIEN TECH PRIVATE LIMITED, it'll take 16-30 Days days for the refund to be processed to the end customer.</ListItem>
        </List>
      </Section>
      
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