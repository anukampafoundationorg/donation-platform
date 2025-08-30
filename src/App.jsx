import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import cowImage from './assets/cowHero1.jpg'; // Adjust path if inside /src/assets/
import { Routes, Route, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import StoryDetail from './components/StoryDetail';
import { stories } from './data/stories';
import trailerVideo from './assets/trailer.mp4';
// Add imports for 9 cow images (adjust names if different)
import cow1 from './assets/cowimg1.jpeg';
import cow2 from './assets/cowimg2.jpeg';
import cow3 from './assets/cowimg3.jpeg';
import cow4 from './assets/cowimg4.jpeg';
import cow5 from './assets/cowimg5.jpeg';
import cow6 from './assets/cowimg6.jpeg';
import cow7 from './assets/cowimg7.jpeg';
import cow8 from './assets/cowimg8.jpeg';
import cow9 from './assets/cowimg9.jpeg';

// Global Styles to Reset Browser Defaults
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
    background-color: #ffffff;
    font-family: 'Poppins', sans-serif;
    scroll-behavior: smooth;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  width: 100%;
  color: #2d3748;
  position: relative;
  min-height: 100vh;
  height: 100%;
`;

const HeroWrapper = styled.div`
  background: url(${cowImage}) no-repeat center center/cover;
  background-position: center;
  background-attachment: fixed;
`;

const Header = styled.header`
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #2d3748;
  box-shadow: ${props => props.$isScrolled ? '0 4px 12px rgba(74, 85, 104, 0.1)' : '0 2px 4px rgba(74, 85, 104, 0.1)'};
  position: sticky;
  top: 0;
  z-index: 10000;
  width: 100%;
  margin: 0;
  background: ${props => props.$isScrolled ? '#ffffff' : 'transparent'};
  transition: background 0.3s ease, box-shadow 0.3s ease;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 24px;
  transition: all 0.3s ease-in-out;
  @media (max-width: 768px) {
    display: ${props => (props.$isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #f4f4f3;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(74, 85, 104, 0.1);
    z-index: 9999;
    transition: all 0.3s ease-in-out;
  }
`;

const NavLink = styled(HashLink)`
  color: #2d3748;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s, transform 0.3s;
  &:hover {
    color: #48bb78;
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    font-size: 18px;
    padding: 10px 0;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    width: 25px;
    height: 3px;
    background: #2d3748;
    margin: 2px 0;
    transition: all 0.3s ease-in-out;
  }
  @media (max-width: 768px) {
    display: flex;
  }
  ${props => props.$isOpen && `
    span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }
  `}
`;

const HeroSection = styled.section`
  min-height: calc(100vh - 64px); /* Adjust for header height */
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #2d3748;
  position: relative;
`;

const HeroContent = styled.div`
  max-width: 900px;
  padding: 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const HeroTagline = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
  color:white
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
  color:white;
`;

const HeroText = styled.p`
  font-size: 20px;
  margin-bottom: 24px;
  color : white
`;

const HeroButton = styled.a`
  background-color: #48bb78;
  color: #ffffff;
  padding: 12px 32px;
  text-decoration: none;
  border-radius: 9999px;
  font-size: 18px;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #38a169;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Section = styled.section`
  padding: 64px 20px;
  width: 100%;
  margin: 0;
  background-color: #ffffff;
  text-align: center;
  color: #2d3748;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color: #48bb78;
  margin-bottom: 24px;
`;

const Text = styled.p`
  font-size: 18px;
  color: #2d3748;
  max-width: 800px;
  margin: 0 auto 32px;
  transition: none; // Prevent any transitions
`;

const VideoWrapper = styled.div`
  width: 1000px;
  height: 400px;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(74, 85, 104, 0.1);
  overflow: hidden;
  position: relative;
  padding-top: 56.25%; // 16:9 aspect ratio (9/16 = 0.5625)
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(74, 85, 104, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
  transition: transform 0.3s ease, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(74, 85, 104, 0.15);
  }
`;

const GalleryImage = styled.img.attrs({ loading: 'lazy' })`
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
`;

const GalleryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(74, 85, 104, 0.5);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  transition: opacity 0.3s ease;
  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const DonateSection = styled.section`
  padding: 80px 20px;
  width: 100%;
  margin: 0;
  min-height: 100vh;
  background-color: #f4f4f3;
  color: #2d3748;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const DonateButton = styled.button`
  background-color: #48bb78;
  color: #ffffff;
  padding: 12px 32px;
  margin: 8px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(74, 85, 104, 0.2);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(74, 85, 104, 0.3);
    background-color: #38a169;
  }
`;

const Form = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(74, 85, 104, 0.15);
  animation: ${slideIn} 0.5s ease-in-out;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #4a5568;
  font-size: 16px;
  color: #2d3748;
  transition: border-color 0.3s ease, box-shadow 0.3s;
  &:focus {
    outline: none;
    border-color: #48bb78;
    box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.2);
  }
  &::placeholder {
    color: #a0aec0;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #48bb78;
  color: #ffffff;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(74, 85, 104, 0.2);
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(74, 85, 104, 0.3);
    background-color: #38a169;
  }
`;

const MissionGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`;

const MissionCard = styled.div`
  width: 320px;
  margin: 16px;
  padding: 24px;
  background-color: #f4f4f3;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(74, 85, 104, 0.1);
  text-align: left;
  color: #2d3748;
`;

// const CardTitle = styled.h3`
//   font-size: 20px;
//   font-weight: 600;
//   color: #48bb78;
//   margin-bottom: 8px;
// `;

// const CardText = styled.p`
//   color: #2d3748;
// `;

const Footer = styled.footer`
  background-color: #f4f4f3;
  color: #2d3748;
  padding: 24px;
  text-align: center;
  width: 100%;
  margin: 0;
`;

const FooterLink = styled.a`
  color: #48bb78;
  margin: 0 16px;
  text-decoration: none;
  transition: text-decoration 0.3s;
  &:hover {
    text-decoration: underline;
  }
`;

// Add new styled components for stories section after GalleryOverlay
const StoriesSection = styled.section`
  padding: 64px 20px;
  width: 100%;
  margin: 0;
  background-color: #f4f4f3;
  text-align: center;
  color: #2d3748;
`;

const StoriesTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color: #48bb78;
  margin-bottom: 24px;
`;

const StoriesSubtitle = styled.p`
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto 32px;
`;

const StoriesGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`;

const StoryCard = styled.div`
  width: 320px;
  margin: 16px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(74, 85, 104, 0.1);
  text-align: left;
  color: #2d3748;
  transition: transform 0.3s ease, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(74, 85, 104, 0.15);
  }
`;

const CardImage = styled.img.attrs({ loading: 'lazy' })`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #48bb78;
  margin-bottom: 8px;
`;

const CardText = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
`;

const ReadMore = styled(Link)`
  color: #48bb78;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
  &:hover {
    color: #38a169;
  }
`;

// Add styled component for BackToTop
const BackToTop = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #48bb78;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s, transform 0.3s;
  &:hover {
    transform: translateY(-3px);
  }
`;

// Styled components for controls
const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: ${props => props.$visible ? 'flex' : 'none'};
  align-items: center;
  justify-content: space-between;
  transition: opacity 0.3s;
  @media (max-width: 768px) {
    display: flex; // Always show on mobile
    opacity: ${props => props.$visible ? 1 : 0.5}; // Semi-visible when not active
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 5px;
  background: #ddd;
  margin: 0 10px;
  position: relative;
  cursor: pointer;
`;

const Progress = styled.div`
  height: 100%;
  background: #48bb78;
  width: ${props => (props.$progress / props.$duration) * 100}%;
`;

const MuteButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
`;

const VolumeSlider = styled.input.attrs({ type: 'range', min: 0, max: 1, step: 0.01 })`
  width: 100px;
`;

// Add state
// const [isPlaying, setIsPlaying] = useState(true); // Moved inside App

// Add function
// const togglePlay = () => { // Moved inside App
//   if (isPlaying) {
//     videoRef.current.pause();
//   } else {
//     videoRef.current.play();
//   }
//   setIsPlaying(!isPlaying);
// };

// Add styled component after MuteButton
const PlayPauseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  margin-right: 10px;
`;

// Add state for modal
// const [selectedImage, setSelectedImage] = useState(null);

// Add Modal styled component after other styles
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
`;

// React Component
function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Placeholder for YouTube video ID (replace '3f2Evvxke9s' with your video ID)
  const [showBackToTop, setShowBackToTop] = useState(false);
  const videoRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Change background after scrolling past 100px
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = (e) => {
    e?.stopPropagation(); // Stop if event is passed
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Functions for controls
  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
    videoRef.current.currentTime = seekTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;
    if (newMuted) setVolume(0);
    else setVolume(1); // Reset to full if unmuting
  };

  // Array of 9 gallery images with captions
  const galleryImages = [
    { src: cow1, alt: 'खेत में गायें', caption: 'शांतिपूर्ण खेत' },
    { src: cow2, alt: 'गायों की देखभाल', caption: 'प्यार भरी देखभाल' },
    { src: cow3, alt: 'आश्रय का दृश्य', caption: 'आश्रय का दृश्य' },
    { src: cow4, alt: 'गाय और प्रकृति', caption: 'प्रकृति के साथ' },
    { src: cow5, alt: 'गायों का समूह', caption: 'एकजुट गायें' },
    { src: cow6, alt: 'गौशाला का जीवन', caption: 'गौशाला का जीवन' },
    { src: cow7, alt: 'गायों का भोजन', caption: 'पौष्टिक भोजन' },
    { src: cow8, alt: 'आश्रय का परिदृश्य', caption: 'शांत आश्रय' },
    { src: cow9, alt: 'गायों की देखभाल', caption: 'करुणामय देखभाल' },
  ];

  return (
    <>
      <GlobalStyle />
      <Container>
        <Routes>
          <Route path="/" element={
            <>
              <HeroWrapper>
                <Header $isScrolled={isScrolled}>
                  <Logo>गौशाला आश्रय</Logo>
                  <Hamburger $isOpen={isNavOpen} onClick={toggleNav}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </Hamburger>
                  <Nav $isOpen={isNavOpen}>
                    <NavLink to="/#home" onClick={() => setIsNavOpen(false)}>होम</NavLink>
                    <NavLink to="/#about" onClick={() => setIsNavOpen(false)}>हमारे बारे में</NavLink>
                    <NavLink to="/#donate" onClick={() => setIsNavOpen(false)}>दान करें</NavLink>
                    <NavLink to="/#mission" onClick={() => setIsNavOpen(false)}>हमारा मिशन</NavLink>
                    <NavLink to="/#gallery" onClick={() => setIsNavOpen(false)}>गैलरी</NavLink>
                    <NavLink to="/#stories" onClick={() => setIsNavOpen(false)}>आशा की कहानियाँ</NavLink>
                    <NavLink to="/#contact" onClick={() => setIsNavOpen(false)}>संपर्क करें</NavLink>
                  </Nav>
                </Header>
                <HeroSection id="home">
                  <HeroContent>
                    <HeroTagline>अनुकम्पा</HeroTagline>
                    <HeroTitle>गायों, बुजुर्गों और मानवता के लिए करुणा</HeroTitle>
                    <HeroText>
                      गाय बचाव, बुजुर्गों की देखभाल और समुदायिक कल्याण कार्यक्रमों के माध्यम से करुणा फैलाने में हमारे साथ जुड़ें जो प्रेम के साथ जीवन बदलते हैं।
                    </HeroText>
                    <HeroButton href="#donate">अब दान करें</HeroButton>
                  </HeroContent>
                </HeroSection>
              </HeroWrapper>
              <Section id="about">
                <Title>हमारे बारे में</Title>
                <Text>
                  गौशाला आश्रय एक गैर-लाभकारी संगठन है जो गायों के कल्याण के लिए समर्पित है। 2010 में स्थापित, हमने सड़कों से 500 से अधिक गायों को बचाया है, उन्हें सुरक्षित आश्रय, पौष्टिक भोजन और पशु चिकित्सा देखभाल प्रदान की है। गायें हमारी संस्कृति में विशेष स्थान रखती हैं, जो मातृत्व और समृद्धि का प्रतीक हैं। हम करुणामय देखभाल और टिकाऊ खेती प्रथाओं में विश्वास करते हैं।
                </Text>
                <VideoWrapper
                  onClick={() => setShowControls(!showControls)}
                >
                  <VideoElement 
                    ref={videoRef}
                    src={trailerVideo} 
                    autoPlay 
                    loop 
                    playsInline 
                    muted={isMuted}
                    volume={volume}
                    onClick={(e) => togglePlay(e)}
                  />
                  <ControlsContainer $visible={showControls}>
                    <PlayPauseButton onClick={togglePlay}>{isPlaying ? '⏸️' : '▶️'}</PlayPauseButton>
                    <MuteButton onClick={toggleMute}>{isMuted ? '🔇' : '🔊'}</MuteButton>
                    <ProgressBar onClick={handleSeek}>
                      <Progress $progress={currentTime} $duration={duration} />
                    </ProgressBar>
                    <VolumeSlider value={volume} onChange={handleVolumeChange} />
                  </ControlsContainer>
                </VideoWrapper>
              </Section>
              <DonateSection id="donate">
                <Title>दान करें</Title>
                <Text>
                  प्रत्येक योगदान मायने रखता है। भोजन, दवा और आश्रय प्रदान करने में हमारी मदद करें। एक राशि चुनें या अपनी राशि दर्ज करें।
                </Text>
                <ButtonGroup>
                  <DonateButton>₹500</DonateButton>
                  <DonateButton>₹1000</DonateButton>
                  <DonateButton>₹2000</DonateButton>
                  <DonateButton>कस्टम</DonateButton>
                </ButtonGroup>
                <Form>
                  <Input type="text" placeholder="राशि दर्ज करें" required />
                  <Input type="email" placeholder="आपका ईमेल" required />
                  <SubmitButton $bg="#48bb78" $color="white" $hoverBg="#38a169">सुरक्षित रूप से दान करें</SubmitButton>
                </Form>
                <Text style={{ fontSize: '14px', marginTop: '24px' }}>
                  (नोट: यह एक प्लेसहोल्डर फॉर्म है; उत्पादन में स्ट्राइप जैसे पेमेंट गेटवे के साथ एकीकृत करें।)
                </Text>
              </DonateSection>
              <Section id="mission" bg="#f4f4f3">
                <Title>हमारा मिशन</Title>
                <Text>
                  एक ऐसी दुनिया बनाना जहां हर गाय सम्मान के साथ जीवित रहे। हम बचाव कार्यों, चिकित्सा उपचार और पशु कल्याण के बारे में शिक्षा पर ध्यान केंद्रित करते हैं। आपका समर्थन हमें अपनी सुविधाओं का विस्तार करने और अधिक जरूरतमंद जानवरों तक पहुंचने में सक्षम बनाता है।
                </Text>
                <MissionGrid>
                  <MissionCard>
                    <CardTitle>बचाव और पुनर्वास</CardTitle>
                    <CardText>हम शहरी क्षेत्रों से घायल और परित्यक्त गायों को बचाते हैं और उन्हें हमारे विशाल आश्रयों में पुनर्वास करते हैं।</CardText>
                  </MissionCard>
                  <MissionCard>
                    <CardTitle>पशु चिकित्सा देखभाल</CardTitle>
                    <CardText>हमारे स्थानीय पशु चिकित्सक 24/7 देखभाल प्रदान करते हैं, जिसमें सर्जरी, टीकाकरण और पोषण संबंधी समर्थन शामिल है।</CardText>
                  </MissionCard>
                  <MissionCard>
                    <CardTitle>समुदाय शिक्षा</CardTitle>
                    <CardText>हम जानवरों के प्रति दया और टिकाऊ डेयरी प्रथाओं को बढ़ावा देने के लिए कार्यशालाएं आयोजित करते हैं।</CardText>
                  </MissionCard>
                </MissionGrid>
              </Section>
              <StoriesSection id="stories">
                <StoriesTitle>आशा की कहानियाँ</StoriesTitle>
                <StoriesSubtitle>हर गौ की अपनी कहानी है, जो हमें प्रेरित करती है।</StoriesSubtitle>
                <StoriesGrid>
                  {stories.map((story) => (
                    <StoryCard key={story.id}>
                      <CardImage src={story.image} alt={story.title} />
                      <CardTitle>{story.title}</CardTitle>
                      <CardText>{story.shortDesc}</CardText>
                      <ReadMore to={`/story/${story.id}`}>और पढ़ें</ReadMore>
                    </StoryCard>
                  ))}
                </StoriesGrid>
              </StoriesSection>
              <Section id="gallery">
                <Title>गैलरी</Title>
                <GalleryGrid>
                  {galleryImages.map((image, index) => (
                    <GalleryItem key={index} onClick={() => setSelectedImage(image.src)}>
                      <GalleryImage src={image.src} alt={image.alt} />
                      <GalleryOverlay>{image.caption}</GalleryOverlay>
                    </GalleryItem>
                  ))}
                </GalleryGrid>
              </Section>
              <Section id="contact" bg="#f4f4f3">
                <Title>संपर्क करें</Title>
                <Text>कोई प्रश्न हैं? हमसे संपर्क करें!</Text>
                <Form>
                  <Input type="text" placeholder="आपका नाम" />
                  <Input type="email" placeholder="आपका ईमेल" />
                  <SubmitButton $bg="#48bb78" $color="white" $hoverBg="#38a169">संदेश भेजें</SubmitButton>
                </Form>
              </Section>
            </>
          } />
          <Route path="/story/:id" element={
            <>
              <Header $isScrolled={isScrolled}>
                <Logo>गौशाला आश्रय</Logo>
                <Hamburger $isOpen={isNavOpen} onClick={toggleNav}>
                  <span></span>
                  <span></span>
                  <span></span>
                </Hamburger>
                <Nav $isOpen={isNavOpen}>
                  <NavLink to="/#home" onClick={() => setIsNavOpen(false)}>होम</NavLink>
                  <NavLink to="/#about" onClick={() => setIsNavOpen(false)}>हमारे बारे में</NavLink>
                  <NavLink to="/#donate" onClick={() => setIsNavOpen(false)}>दान करें</NavLink>
                  <NavLink to="/#mission" onClick={() => setIsNavOpen(false)}>हमारा मिशन</NavLink>
                  <NavLink to="/#gallery" onClick={() => setIsNavOpen(false)}>गैलरी</NavLink>
                  <NavLink to="/#stories" onClick={() => setIsNavOpen(false)}>आशा की कहानियाँ</NavLink>
                  <NavLink to="/#contact" onClick={() => setIsNavOpen(false)}>संपर्क करें</NavLink>
                </Nav>
              </Header>
              <StoryDetail />
            </>
          } />
        </Routes>
        {showBackToTop && (
          <BackToTop visible={showBackToTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ↑
          </BackToTop>
        )}
        {selectedImage && (
          <Modal onClick={() => setSelectedImage(null)}>
            <ModalImage src={selectedImage} alt="Full size" />
            <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
          </Modal>
        )}
        <Footer>
          <p>&copy; 2025 गौशाला आश्रय। सभी अधिकार सुरक्षित।</p>
          <div style={{ marginTop: '8px' }}>
            <FooterLink href="#">गोपनीयता नीति</FooterLink>
            <FooterLink href="#">सेवा की शर्तें</FooterLink>
          </div>
        </Footer>
      </Container>
    </>
  );
}

export default App;