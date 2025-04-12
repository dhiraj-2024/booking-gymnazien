import React from 'react';
import styled from 'styled-components';

const TermsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  color: #333;
  line-height: 1.6;
`;

const Title = styled.h1`
  color: #0d369f;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
`;

const UpdatedDate = styled.p`
  font-style: italic;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
  font-size: 14px;
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

const Paragraph = styled.p`
  margin-bottom: 15px;
  font-size: 16px;
`;

const List = styled.ul`
  margin-bottom: 15px;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
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

const TermsAndCondition = () => {
  return (
    <TermsContainer>
      <Title>Terms & Conditions</Title>
      <UpdatedDate>Last updated on 12-04-2025 12:58:37</UpdatedDate>
      
      <Section>
        <Paragraph>
        These Terms and Conditions, along with our Privacy Policy and any other applicable terms ("Terms"), constitute a binding agreement between GYMNAZIEN TECH PRIVATE LIMITED ("Website Owner," "we," "us," or "our") and you ("you" or "your") regarding your use of our website, products, and services (collectively, the "Services").        </Paragraph>
        
        <Paragraph>
        By accessing our website and using our Services, you confirm that you have read, understood, and agreed to these Terms (including the Privacy Policy).
        We reserve the right to modify these Terms at any time without prior notice. It is your responsibility to review them periodically to stay informed of any updates.        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>Terms of Use</SectionTitle>
        <Paragraph>The use of this website or availing of our Services is subject to the following terms of use:</Paragraph>
        
        <List>
          <ListItem>To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account.</ListItem>
          
          <ListItem>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</ListItem>
          
          <ListItem>Your use of our Services and the website is solely at your own risk and discretion. You are required to independently assess and ensure that the Services meet your requirements.</ListItem>
          
          <ListItem>The contents of the Website and the Services are proprietary to Us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents.</ListItem>
          
          <ListItem>You acknowledge that unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws.</ListItem>
          
          <ListItem>You agree to pay us the charges associated with availing the Services.</ListItem>
          
          <ListItem>You agree not to use the website and/or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.</ListItem>
          
          <ListItem>You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites.</ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>Service Contracts and Refunds</SectionTitle>
        
        <List>
          <ListItem>You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the us for the Services.</ListItem>
          
          <ListItem>You shall be entitled to claim a refund of the payment made by you in case we are not able to provide the Service. The timelines for such return and refund will be according to the specific Service you have availed or within the time period provided in our policies (as applicable). In case you do not raise a refund claim within the stipulated time, than this would make you ineligible for a refund.</ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>Force Majeure</SectionTitle>
        <Paragraph>
          Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>Governing Law and Jurisdiction</SectionTitle>
        
        <List>
          <ListItem>These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.</ListItem>
          
          <ListItem>All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in CHHTRAPATI sambhajinagar, Maharashtra.</ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>Contact Information</SectionTitle>
        <Paragraph>
          All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.
        </Paragraph>
      </Section>
      
      <Highlight>
        By using our website and services, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions.
      </Highlight>
    </TermsContainer>
  );
};

export default TermsAndCondition;