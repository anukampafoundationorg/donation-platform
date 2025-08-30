import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { stories } from '../data/stories';

const DetailContainer = styled.div`
  padding: 0;
  width: 100%;
  color: #2d3748;
  background-color: #ffffff;
  font-family: 'Poppins', sans-serif;
`;

const StoryHero = styled.div`
  position: relative;
  height: 50vh;
  background: url(${props => props.image}) no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #48bb78;
  margin-bottom: 24px;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(74, 85, 104, 0.1);
`;

const StoryText = styled.p`
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 32px;
  text-align: left;
  color: #4a5568;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const DonateButton = styled(Link)`
  background-color: #48bb78;
  color: #ffffff;
  padding: 12px 32px;
  text-decoration: none;
  border-radius: 9999px;
  font-size: 18px;
  font-weight: 600;
  transition: background-color 0.3s;
  &:hover {
    background-color: #38a169;
  }
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 24px;
  color: #48bb78;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
  &:hover {
    color: #38a169;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StoryDetail = () => {
  const { id } = useParams();
  const story = stories.find((s) => s.id === id);

  if (!story) {
    return <DetailContainer>कहानी नहीं मिली</DetailContainer>;
  }

  return (
    <DetailContainer>
      <StoryHero image={story.image}>
        <HeroTitle>{story.title}</HeroTitle>
      </StoryHero>
      <ContentWrapper>
        <BackButton to="/">← वापस</BackButton>
        <StoryText>{story.fullStory}</StoryText>
        <PhotoGrid>
          {story.photos.map((photo, index) => (
            <Image key={index} src={photo} alt={`फोटो ${index + 1}`} loading="lazy" />
          ))}
        </PhotoGrid>
        <DonateButton to="/#donate">अब दान करें</DonateButton>
      </ContentWrapper>
    </DetailContainer>
  );
};

export default StoryDetail;
