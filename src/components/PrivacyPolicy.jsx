import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  width: 100%;
  color: #2d3748;
  position: relative;
  min-height: 100vh;
  background-color: #ffffff;
`;

const Header = styled.header`
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #2d3748;
  box-shadow: 0 4px 12px rgba(74, 85, 104, 0.3);
  position: sticky;
  top: 0;
  z-index: 10000;
  width: 100%;
  margin: 0;
  background: #f79e31;
  transition: background 0.3s ease, box-shadow 0.3s ease;
`;

const Logo = styled(Link)`
  font-size: 32px;
  font-weight: 900;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: #ffffff;
  }
`;

const BackButton = styled(Link)`
  background: #ffffff;
  color: #f79e31;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover {
    background: #f0f0f0;
    transform: translateY(-1px);
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #f79e31;
  margin-bottom: 24px;
  text-align: center;
`;

const LastUpdated = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
  margin-bottom: 32px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #f79e31;
  margin-bottom: 16px;
  border-bottom: 2px solid #f79e31;
  padding-bottom: 8px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #2d3748;
`;

const List = styled.ul`
  margin-bottom: 16px;
  padding-left: 20px;
`;

const ListItem = styled.li`
  font-size: 16px;
  margin-bottom: 8px;
  color: #2d3748;
`;

const ContactInfo = styled.div`
  background: #f4f4f3;
  padding: 24px;
  border-radius: 8px;
  margin-top: 32px;
  border-left: 4px solid #f79e31;
`;

const ContactTitle = styled.h3`
  color: #f79e31;
  margin-bottom: 12px;
`;


function PrivacyPolicy() {
  return (
    <Container>
      <Header>
        <Logo to="/">Anukampa</Logo>
        <BackButton to="/">← वापस जाएं</BackButton>
      </Header>
      
      <Content>
        <Title>गोपनीयता नीति (Privacy Policy)</Title>
        <LastUpdated>अंतिम अपडेट: जनवरी 2025</LastUpdated>
        
        <Section>
          <SectionTitle>1. परिचय</SectionTitle>
          <Paragraph>
            अनुकम्पा फाउंडेशन (गौशाला आश्रय) आपकी गोपनीयता का सम्मान करता है। यह गोपनीयता नीति बताती है कि हम आपकी व्यक्तिगत जानकारी कैसे एकत्र, उपयोग और सुरक्षित करते हैं।
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>2. हम कौन सी जानकारी एकत्र करते हैं</SectionTitle>
          <Paragraph>हम निम्नलिखित प्रकार की जानकारी एकत्र कर सकते हैं:</Paragraph>
          <List>
            <ListItem>नाम और संपर्क विवरण (ईमेल, फोन नंबर, पता)</ListItem>
            <ListItem>दान संबंधी जानकारी (दान राशि, दान का उद्देश्य)</ListItem>
            <ListItem>वेबसाइट उपयोग डेटा (आईपी पता, ब्राउज़र प्रकार, पेज विज़िट)</ListItem>
            <ListItem>कुकीज़ और समान तकनीकों के माध्यम से डेटा</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. जानकारी का उपयोग</SectionTitle>
          <Paragraph>हम आपकी जानकारी का उपयोग निम्नलिखित उद्देश्यों के लिए करते हैं:</Paragraph>
          <List>
            <ListItem>दान प्रक्रिया को संसाधित करने के लिए</ListItem>
            <ListItem>आपको हमारे कार्यक्रमों के बारे में अपडेट भेजने के लिए</ListItem>
            <ListItem>कानूनी आवश्यकताओं को पूरा करने के लिए</ListItem>
            <ListItem>वेबसाइट की कार्यक्षमता में सुधार के लिए</ListItem>
            <ListItem>धन उगाही और जागरूकता अभियानों के लिए</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. जानकारी साझा करना</SectionTitle>
          <Paragraph>
            हम आपकी व्यक्तिगत जानकारी को तीसरे पक्ष के साथ साझा नहीं करते हैं, सिवाय इसके कि:
          </Paragraph>
          <List>
            <ListItem>आपने स्पष्ट सहमति दी हो</ListItem>
            <ListItem>कानूनी आवश्यकता हो</ListItem>
            <ListItem>हमारी सेवाएं प्रदान करने के लिए आवश्यक हो</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. डेटा सुरक्षा</SectionTitle>
          <Paragraph>
            हम आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए उपयुक्त तकनीकी और संगठनात्मक उपाय करते हैं। हालांकि, कोई भी इंटरनेट ट्रांसमिशन 100% सुरक्षित नहीं है।
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>6. आपके अधिकार</SectionTitle>
          <Paragraph>आपके पास निम्नलिखित अधिकार हैं:</Paragraph>
          <List>
            <ListItem>अपनी व्यक्तिगत जानकारी तक पहुंचने का अधिकार</ListItem>
            <ListItem>गलत जानकारी को सुधारने का अधिकार</ListItem>
            <ListItem>अपनी जानकारी को हटाने का अधिकार</ListItem>
            <ListItem>डेटा प्रोसेसिंग पर आपत्ति करने का अधिकार</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>7. कुकीज़</SectionTitle>
          <Paragraph>
            हमारी वेबसाइट कुकीज़ का उपयोग करती है। कुकीज़ छोटी फाइलें हैं जो आपके ब्राउज़र में संग्रहीत की जाती हैं और वेबसाइट की कार्यक्षमता में सुधार करती हैं।
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>8. नीति में परिवर्तन</SectionTitle>
          <Paragraph>
            हम इस गोपनीयता नीति को समय-समय पर अपडेट कर सकते हैं। किसी भी महत्वपूर्ण परिवर्तन के बारे में हम आपको सूचित करेंगे।
          </Paragraph>
        </Section>

        <ContactInfo>
          <ContactTitle>संपर्क जानकारी</ContactTitle>
          <Paragraph>
            यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:
          </Paragraph>
          <Paragraph>
            <strong>ईमेल:</strong> anukampafoundationorg@gmail.com<br />
            <strong>फोन:</strong> [फोन नंबर]<br />
            <strong>पता:</strong> [पूरा पता]
          </Paragraph>
        </ContactInfo>
      </Content>
    </Container>
  );
}

export default PrivacyPolicy;
