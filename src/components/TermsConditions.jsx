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

const SubSectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #f79e31;
  margin: 24px 0 12px 0;
  border-left: 4px solid #f79e31;
  padding-left: 12px;
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

const NumberedList = styled.ol`
  margin-bottom: 16px;
  padding-left: 20px;
`;

const NumberedListItem = styled.li`
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


function TermsConditions() {
  return (
    <Container>
      <Header>
        <Logo to="/">Anukampa</Logo>
        <BackButton to="/">← वापस जाएं</BackButton>
      </Header>
      
      <Content>
        <Title>सेवा की शर्तें (Terms & Conditions)</Title>
        <LastUpdated>अंतिम अपडेट: जनवरी 2025</LastUpdated>
        
        <Section>
          <SectionTitle>1. स्वीकृति</SectionTitle>
          <Paragraph>
            अनुकम्पा फाउंडेशन (गौशाला आश्रय) की वेबसाइट का उपयोग करके, आप इन सेवा की शर्तों से सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया हमारी वेबसाइट का उपयोग न करें।
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>2. सेवा का विवरण</SectionTitle>
          <Paragraph>
            अनुकम्पा फाउंडेशन एक गैर-लाभकारी संगठन है जो गायों के कल्याण के लिए समर्पित है। हमारी सेवाओं में शामिल हैं:
          </Paragraph>
          <List>
            <ListItem>गायों का बचाव और पुनर्वास</ListItem>
            <ListItem>पशु चिकित्सा देखभाल</ListItem>
            <ListItem>समुदाय शिक्षा कार्यक्रम</ListItem>
            <ListItem>दान स्वीकृति और प्रबंधन</ListItem>
            <ListItem>जागरूकता अभियान</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. दान की शर्तें और भुगतान प्रसंस्करण</SectionTitle>
          <Paragraph>दान करते समय निम्नलिखित शर्तें लागू होती हैं:</Paragraph>
          <NumberedList>
            <NumberedListItem>सभी दान स्वैच्छिक हैं और वापसी योग्य नहीं हैं</NumberedListItem>
            <NumberedListItem>दान की राशि का उपयोग केवल संगठन के उद्देश्यों के लिए किया जाएगा</NumberedListItem>
            <NumberedListItem>दान के लिए कर छूट के लिए आवश्यक दस्तावेज प्रदान किए जाएंगे</NumberedListItem>
            <NumberedListItem>PhonePe B2B सेवा शुल्क लेनदेन मूल्य के 1.95% पर लागू होता है</NumberedListItem>
            <NumberedListItem>क्रेडिट कार्ड (Amex, Diners, Corporate) के लिए 2.90% शुल्क लागू होता है</NumberedListItem>
            <NumberedListItem>सभी शुल्क जीएसटी और अन्य करों से अलग हैं</NumberedListItem>
            <NumberedListItem>भुगतान T+1 दिन के भीतर किया जाता है जहां T लेनदेन की तारीख है</NumberedListItem>
            <NumberedListItem>दानकर्ता की जानकारी गोपनीय रखी जाएगी</NumberedListItem>
          </NumberedList>
        </Section>

        <Section>
          <SectionTitle>4. उपयोगकर्ता के दायित्व</SectionTitle>
          <Paragraph>वेबसाइट का उपयोग करते समय आपके दायित्व:</Paragraph>
          <List>
            <ListItem>सटीक और सत्य जानकारी प्रदान करना</ListItem>
            <ListItem>वेबसाइट का दुरुपयोग न करना</ListItem>
            <ListItem>किसी भी हानिकारक सॉफ्टवेयर का उपयोग न करना</ListItem>
            <ListItem>अन्य उपयोगकर्ताओं के अधिकारों का सम्मान करना</ListItem>
            <ListItem>कानूनी नियमों का पालन करना</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. बौद्धिक संपदा</SectionTitle>
          <Paragraph>
            वेबसाइट पर सभी सामग्री, जिसमें टेक्स्ट, ग्राफिक्स, लोगो, इमेज और सॉफ्टवेयर शामिल हैं, अनुकम्पा फाउंडेशन की संपत्ति है और कॉपीराइट कानूनों द्वारा संरक्षित है।
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>6. गोपनीयता</SectionTitle>
          <Paragraph>
            आपकी गोपनीयता हमारे लिए महत्वपूर्ण है। हमारी गोपनीयता नीति हमारी वेबसाइट पर उपलब्ध है और इन शर्तों का हिस्सा है।
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>7. सेवा में बदलाव</SectionTitle>
          <Paragraph>
            हम बिना पूर्व सूचना के अपनी सेवाओं में बदलाव कर सकते हैं। हमारी सेवाओं का उपयोग जारी रखने का मतलब है कि आप नई शर्तों से सहमत हैं।
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>8. दायित्व की सीमा</SectionTitle>
          <Paragraph>
            अनुकम्पा फाउंडेशन किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक या परिणामी नुकसान के लिए जिम्मेदार नहीं होगा जो हमारी वेबसाइट के उपयोग से उत्पन्न हो सकता है।
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>9. विवाद समाधान</SectionTitle>
          <Paragraph>
            इन शर्तों से संबंधित किसी भी विवाद को भारतीय कानून के तहत निपटाया जाएगा। सभी विवाद उज्जैन, मध्य प्रदेश की अदालतों के अधिकार क्षेत्र में होंगे।
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>10. शर्तों में संशोधन</SectionTitle>
          <Paragraph>
            हम इन सेवा की शर्तों को किसी भी समय संशोधित कर सकते हैं। संशोधित शर्तें वेबसाइट पर पोस्ट करने के तुरंत बाद प्रभावी होंगी।
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>11. PhonePe B2B सेवाएं - अतिरिक्त ग्राहक शर्तें</SectionTitle>
          <Paragraph>
            ये अतिरिक्त ग्राहक शर्तें PhonePe B2B सेवाओं के लिए लागू होती हैं। 'क्लाइंट/आप/आपका' का अर्थ है कोई भी प्राकृतिक या कानूनी व्यक्ति जो PhonePe के साथ क्लाइंट के रूप में पंजीकृत है। 'हम', 'हमारा', 'PhonePe', 'कंपनी' का अर्थ है PhonePe Limited।
          </Paragraph>
          
          <SubSectionTitle>11.1 वाणिज्यिक शुल्क</SubSectionTitle>
          <Paragraph>क्लाइंट PhonePe को निम्नलिखित शुल्क का भुगतान करेगा:</Paragraph>
          <List>
            <ListItem>PhonePe B2B सेवा शुल्क* - सभी भुगतान साधनों के लिए सकल लेनदेन मूल्य का 1.95% (प्रत्येक लेनदेन के आधार पर)</ListItem>
            <ListItem>क्रेडिट कार्ड (Amex) - 2.90%</ListItem>
            <ListItem>क्रेडिट कार्ड (Diners) - 2.90%</ListItem>
            <ListItem>क्रेडिट कार्ड (Corporate) - 2.90%</ListItem>
          </List>
          
          <SubSectionTitle>11.2 शुल्क नोट</SubSectionTitle>
          <List>
            <ListItem>सभी दरें वस्तु एवं सेवा कर और अन्य करों से अलग हैं</ListItem>
            <ListItem>लागू TDS काटा जाएगा</ListItem>
            <ListItem>क्लाइंट सभी प्रासंगिक करों के भुगतान के लिए जिम्मेदार होगा</ListItem>
            <ListItem>रद्दीकरण, चार्जबैक या लेनदेन की वापसी के मामले में PhonePe B2B सेवा शुल्क वापस नहीं किया जाएगा</ListItem>
            <ListItem>चालान में बताई गई अतिदेय राशि को साफ करने में देरी पर 12% प्रति वर्ष की दर से देर से भुगतान शुल्क लगेगा</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>12. क्लाइंट को भुगतान</SectionTitle>
          <List>
            <ListItem>सभी भुगतान T+1 दिन के भीतर किए जाएंगे जहां T लेनदेन की तारीख है</ListItem>
            <ListItem>समझौते के दौरान, दोनों रिडेम्प्शन और रिडेम्प्शन रद्दीकरण लेनदेन को सात (7) कार्य दिवसों के भीतर नेट ऑफ किया जाएगा</ListItem>
            <ListItem>यदि किसी दिन के लिए सेटलमेंट राशि नकारात्मक है, तो PhonePe क्लाइंट से बकाया राशि वसूलने का हकदार होगा</ListItem>
            <ListItem>हर महीने के लिए समेकित वस्तु एवं सेवा कर (GST) चालान दिया जाएगा</ListItem>
            <ListItem>PhonePe मासिक आधार पर क्लाइंट पर समेकित चालान जारी करेगा</ListItem>
            <ListItem>बकाया राशि और अन्य धन PhonePe B2B सेवा शुल्क पर लागू TDS क्लाइंट द्वारा आयकर विभाग को दिया जाएगा</ListItem>
            <ListItem>PhonePe TDS प्रमाणपत्र प्रस्तुत करने पर त्रैमासिक आधार पर TDS राशि का प्रतिपूर्ति करेगा</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>13. ऑफर अवधि</SectionTitle>
          <Paragraph>
            PhonePe द्वारा Salt Key जेनरेट करने से शुरू होकर दूसरे महीने के अंत तक PhonePe B2B सेवा शुल्क नहीं लगाया जाएगा। यह ऑफर अवधि केवल ₹2,00,000/- (दो लाख रुपये) तक के कुल लेनदेन के लिए लागू है।
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>14. रेफरल पार्टनर के साथ डेटा साझाकरण</SectionTitle>
          <Paragraph>
            यदि क्लाइंट को किसी पार्टनर द्वारा रेफर किया गया है, तो निम्नलिखित शर्तें लागू होंगी:
          </Paragraph>
          <List>
            <ListItem>क्लाइंट PhonePe के साथ सहमत होता है कि वह PhonePe B2B सेवाओं के लिए रेफरल पार्टनर के माध्यम से रेफर किया गया है</ListItem>
            <ListItem>रेफरल पार्टनर को क्लाइंट की जानकारी की आवश्यकता होती है जो PhonePe द्वारा सुविधाजनक लेनदेन के लिए सीमित है</ListItem>
            <ListItem>क्लाइंट PhonePe को सहमति देता है और PhonePe को कुल लेनदेन मूल्य साझा करने के लिए अधिकृत करता है</ListItem>
            <ListItem>क्लाइंट सुनिश्चित करेगा कि रेफरल पार्टनर गोपनीयता दायित्वों से बाध्य है</ListItem>
            <ListItem>क्लाइंट PhonePe को रेफरल पार्टनर के दायित्वों के उल्लंघन से होने वाले नुकसान से बचाता है</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>15. TSP रेफरल पार्टनर के साथ तकनीकी एकीकरण</SectionTitle>
          <Paragraph>
            यदि क्लाइंट को TSP रेफरल पार्टनर द्वारा रेफर किया गया है जो तकनीकी एकीकरण प्रदान करता है:
          </Paragraph>
          <List>
            <ListItem>क्लाइंट और TSP रेफरल पार्टनर ने PhonePe B2B सेवाओं के लिए तकनीकी एकीकरण सक्षम करने के लिए एक समझौता किया है</ListItem>
            <ListItem>क्लाइंट ने TSP रेफरल पार्टनर को PhonePe के साथ आवश्यक एकीकरण करने के लिए अधिकृत किया है</ListItem>
            <ListItem>क्लाइंट PhonePe को TSP रेफरल पार्टनर के साथ निम्नलिखित जानकारी साझा करने के लिए सहमति देता है:</ListItem>
          </List>
          <List style={{ marginLeft: '20px' }}>
            <ListItem>कुल लेनदेन मूल्य (PhonePe द्वारा सक्षम सभी भुगतान साधनों के साथ)</ListItem>
            <ListItem>लेनदेन स्रोत विवरण (क्लाइंट प्लेटफॉर्म के माध्यम से प्रत्येक लेनदेन स्तर पर)</ListItem>
            <ListItem>लेनदेन की भुगतान स्थिति</ListItem>
            <ListItem>लेनदेन आईडी (क्लाइंट प्लेटफॉर्म के माध्यम से प्रत्येक लेनदेन के आधार पर)</ListItem>
            <ListItem>अद्वितीय लेनदेन संदर्भ आईडी (UTR) / बैंक आईडी</ListItem>
          </List>
          <List>
            <ListItem>TSP रेफरल पार्टनर PhonePe क्रेडेंशियल्स तक पहुंच प्राप्त करेगा</ListItem>
            <ListItem>क्लाइंट PhonePe क्रेडेंशियल्स को TSP रेफरल पार्टनर के साथ साझा करने के लिए अधिकृत है</ListItem>
            <ListItem>क्लाइंट PhonePe को TSP रेफरल पार्टनर के दायित्वों के उल्लंघन से होने वाले नुकसान से बचाता है</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>16. नियामक अनुपालन</SectionTitle>
          <Paragraph>
            PhonePe B2B सेवा शुल्क RBI/NPCI/किसी अन्य नियामक निकाय/प्राधिकरण द्वारा वृद्धि या कमी को दर्शाने के लिए समायोजित किया जा सकता है। समायोजित शुल्क PhonePe द्वारा क्लाइंट को ईमेल के माध्यम से नोटिस जारी करने पर प्रभावी होगा।
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>17. संपूर्ण समझौता</SectionTitle>
          <Paragraph>
            ये शर्तें आपके और अनुकम्पा फाउंडेशन के बीच संपूर्ण समझौता बनाती हैं और पिछले सभी समझौतों को प्रतिस्थापित करती हैं।
          </Paragraph>
        </Section>

        <ContactInfo>
          <ContactTitle>संपर्क जानकारी</ContactTitle>
          <Paragraph>
            यदि आपके पास इन सेवा की शर्तों के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:
          </Paragraph>
          <Paragraph>
            <strong>ईमेल:</strong> anukampafoundationorg@gmail.com<br />
            <strong>फोन:</strong> 6261537751<br />
            <strong>पता:</strong> 401 बगड़िया टावर, 5वीं मंजिल, सेंट्रल कोठवाली के पास, उज्जैन 456001
          </Paragraph>
        </ContactInfo>
      </Content>
    </Container>
  );
}

export default TermsConditions;
