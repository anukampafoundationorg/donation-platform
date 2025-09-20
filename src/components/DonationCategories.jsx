import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { trackPageView, trackButtonClick } from '../utils/analytics';

// Styled Components
const PageContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  width: 100%;
  color: #2d3748;
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
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
  
  @media (max-width: 768px) {
    padding: 12px 16px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`;

const Logo = styled(Link)`
  font-size: 32px;
  font-weight: 900;
  color: #ffffff;
  text-decoration: none;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const BackButton = styled(Link)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  color: #f79e31;
  font-size: 48px;
  font-weight: 700;
  margin: 60px 0 20px 0;
  
  @media (max-width: 768px) {
    font-size: 36px;
    margin: 40px 0 16px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
    margin: 30px 0 12px 0;
  }
`;

const PageSubtitle = styled.p`
  text-align: center;
  color: #4a5568;
  font-size: 20px;
  max-width: 800px;
  margin: 0 auto 60px auto;
  padding: 0 20px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 40px;
    padding: 0 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 30px;
    padding: 0 12px;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 80px 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 0 16px 60px 16px;
  }
  
  @media (max-width: 480px) {
    gap: 20px;
    padding: 0 12px 40px 12px;
  }
`;

const CategoryCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(247, 158, 49, 0.15);
    border-color: #f79e31;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #f79e31 0%, #e6891e 100%);
  }
  
  @media (max-width: 768px) {
    padding: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const CategoryIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 56px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 48px;
    margin-bottom: 12px;
  }
`;

const CategoryTitle = styled.h3`
  color: #f79e31;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 8px;
  }
`;

const CategoryDescription = styled.p`
  color: #4a5568;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 14px;
  }
`;

const CategoryAmount = styled.div`
  background: linear-gradient(135deg, #f79e31 0%, #e6891e 100%);
  color: white;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  display: inline-block;
  box-shadow: 0 8px 24px rgba(247, 158, 49, 0.3);
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

const CategoryBenefits = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  text-align: left;
`;

const CategoryBenefit = styled.li`
  color: #2d3748;
  font-size: 15px;
  margin-bottom: 10px;
  padding-left: 24px;
  position: relative;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #f79e31;
    font-weight: bold;
    font-size: 16px;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 6px;
  }
`;

const DonateButton = styled.button`
  background: linear-gradient(135deg, #f79e31 0%, #e6891e 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: linear-gradient(135deg, #e6891e 0%, #d67a0d 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(247, 158, 49, 0.4);
  }
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 14px;
  }
`;

const QRCodeSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  
  @media (max-width: 768px) {
    padding: 16px;
    margin-top: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 14px;
    margin-top: 14px;
  }
`;

const QRCodeImage = styled.div`
  width: 140px;
  height: 140px;
  background: #ffffff;
  border: 2px solid #f79e31;
  border-radius: 12px;
  margin: 0 auto 16px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
  text-align: center;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    font-size: 12px;
  }
`;

const QRCodeText = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

// Donation Categories Data
const donationCategories = [
  {
    id: 'gau-seva',
    icon: '🐄',
    title: 'गौ सेवा (एक गाय की देखभाल)',
    amount: '5100',
    description: 'एक गाय की पूर्ण मासिक देखभाल के लिए दान करें',
    benefits: [
      'एक गाय का पूरा भोजन (1 महीना)',
      'पशु चिकित्सा सेवा',
      'आश्रय और सफाई',
      'दैनिक देखभाल'
    ]
  },
  {
    id: 'anna-daan',
    icon: '🍽️',
    title: 'अन्न दान (भोजन व्यवस्था)',
    amount: '2100',
    description: 'गायों के लिए पौष्टिक भोजन की व्यवस्था',
    benefits: [
      '10 गायों का दैनिक भोजन',
      'चारा और दाना',
      'पानी की व्यवस्था',
      'पोषक तत्वों की पूर्ति'
    ]
  },
  {
    id: 'chikitsa-seva',
    icon: '🏥',
    title: 'चिकित्सा सेवा (पशु उपचार)',
    amount: '3100',
    description: 'बीमार और घायल गायों के लिए चिकित्सा सहायता',
    benefits: [
      'पशु चिकित्सक की फीस',
      'दवाइयों की व्यवस्था',
      'आपातकालीन उपचार',
      'नियमित स्वास्थ्य जांच'
    ]
  },
  {
    id: 'ashray-nirman',
    icon: '🏠',
    title: 'आश्रय निर्माण (शेल्टर)',
    amount: '10000',
    description: 'गायों के लिए सुरक्षित आश्रय का निर्माण',
    benefits: [
      'मजबूत शेड निर्माण',
      'बारिश से सुरक्षा',
      'साफ-सुथरा वातावरण',
      'आरामदायक स्थान'
    ]
  },
  {
    id: 'gau-mata-seva',
    icon: '🙏',
    title: 'गौ माता सेवा (सामान्य दान)',
    amount: '1100',
    description: 'गौ माता की सामान्य सेवा के लिए योगदान',
    benefits: [
      'दैनिक देखभाल में सहायता',
      'सफाई व्यवस्था',
      'छोटी-मोटी जरूरतें',
      'सामान्य रखरखाव'
    ]
  },
  {
    id: 'vridha-seva',
    icon: '👴',
    title: 'वृद्ध सेवा (बुजुर्गों की देखभाल)',
    amount: '2500',
    description: 'वृद्ध गायों की विशेष देखभाल',
    benefits: [
      'विशेष पोषण आहार',
      'अतिरिक्त चिकित्सा देखभाल',
      'आरामदायक व्यवस्था',
      'नियमित निगरानी'
    ]
  }
];

const DonationCategories = () => {
  useEffect(() => {
    trackPageView('Donation Categories Page');
  }, []);

  const handleDonateClick = (category) => {
    trackButtonClick(`Donate ${category.title}`, 'Donation Categories');
    // Redirect to main page with selected amount
    window.location.href = `/#donate?amount=${category.amount}&category=${category.id}`;
  };

  return (
    <PageContainer>
      <Header>
        <Logo to="/">Anukampa</Logo>
        <BackButton to="/">← वापस होम पर जाएं</BackButton>
      </Header>
      
      <PageTitle>दान की श्रेणियां</PageTitle>
      <PageSubtitle>
        अपनी सुविधा के अनुसार किसी भी श्रेणी में दान करें। प्रत्येक योगदान गायों के कल्याण में सीधे उपयोग होता है।
      </PageSubtitle>
      
      <CategoriesGrid>
        {donationCategories.map((category) => (
          <CategoryCard key={category.id}>
            <CategoryIcon>{category.icon}</CategoryIcon>
            <CategoryTitle>{category.title}</CategoryTitle>
            <CategoryAmount>₹{category.amount}</CategoryAmount>
            <CategoryDescription>{category.description}</CategoryDescription>
            <CategoryBenefits>
              {category.benefits.map((benefit, index) => (
                <CategoryBenefit key={index}>{benefit}</CategoryBenefit>
              ))}
            </CategoryBenefits>
            <DonateButton onClick={() => handleDonateClick(category)}>
              इस श्रेणी में दान करें
            </DonateButton>
            <QRCodeSection>
              <QRCodeImage>
                QR Code<br />₹{category.amount}
              </QRCodeImage>
              <QRCodeText>
                UPI से तुरंत भुगतान करें
              </QRCodeText>
            </QRCodeSection>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </PageContainer>
  );
};

export default DonationCategories;
