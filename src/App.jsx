import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import cowImage from './assets/cowHero1.jpg';
import { Routes, Route, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import StoryDetail from './components/StoryDetail';
import { stories } from './data/stories';
import trailerVideo from './assets/trailer.mp4';
import cow1 from './assets/cowimg1.jpeg';
import cow2 from './assets/cowimg2.jpeg';
import cow3 from './assets/cowimg3.jpeg';
import cow4 from './assets/cowimg4.jpeg';
import cow5 from './assets/cowimg5.jpeg';
import cow6 from './assets/cowimg6.jpeg';
import cow7 from './assets/cowimg7.jpeg';
import cow8 from './assets/cowimg8.jpeg';
import cow9 from './assets/cowimg9.jpeg';
import upiQR from './assets/upi.jpeg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Global Styles
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
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const Header = styled.header`
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #2d3748;
  box-shadow: ${props => props.$isScrolled ? '0 4px 12px rgba(74, 85, 104, 0.3)' : 'none'};
  position: sticky;
  top: 0;
  z-index: 10000;
  width: 100%;
  margin: 0;
  background: #f79e31;
  transition: box-shadow 0.3s ease;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
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
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s, transform 0.3s;
  &:hover {
    color: #ffffff;
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    color: #f79e31;
    font-size: 18px;
    padding: 10px 0;
    &:hover {
      color: #c67e27;
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    width: 25px;
    height: 3px;
    background: #ffffff;
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #2d3748;
  z-index: 5;
`;

const HeroContent = styled.div`
  max-width: 900px;
  padding: 20px;
  animation: ${fadeIn} 1s ease-out;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  backdrop-filter: blur(5px);
`;

const HeroTagline = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
  color: white;
`;

const HeroText = styled.p`
  font-size: 20px;
  margin-bottom: 24px;
  color: white;
`;

const HeroButton = styled.a`
  background-color: #f79e31;
  color: #ffffff;
  padding: 12px 32px;
  text-decoration: none;
  border-radius: 9999px;
  font-size: 18px;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #c67e27;
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
  color: #f79e31;
  margin-bottom: 24px;
`;

const Text = styled.p`
  font-size: 18px;
  color: #2d3748;
  max-width: 800px;
  margin: 0 auto 32px;
  transition: none;
`;

// Video controls components (defined before VideoWrapper)
const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: none;
  align-items: center;
  justify-content: space-between;
  transition: opacity 0.3s;
  @media (max-width: 768px) {
    display: flex;
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
  background: #f79e31;
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

const PlayPauseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  margin-right: 10px;
`;

// Video wrapper (defined after controls)
const VideoWrapper = styled.div`
  width: ${props => props.$width};
  height: ${props => props.$height};
  max-width: 100%;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(74, 85, 104, 0.1);
  overflow: hidden;
  position: relative;
  &:hover ${ControlsContainer} {
    display: flex;
  }
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  background-color: #f79e31;
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
    background-color: #c67e27;
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
    border-color: #f79e31;
    box-shadow: 0 0 0 3px rgba(247, 158, 49, 0.2);
  }
  &::placeholder {
    color: #a0aec0;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #f79e31;
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
    background-color: #c67e27;
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

const Footer = styled.footer`
  background-color: #f4f4f3;
  color: #2d3748;
  padding: 24px;
  text-align: center;
  width: 100%;
  margin: 0;
`;

const FooterLink = styled.a`
  color: #f79e31;
  margin: 0 16px;
  text-decoration: none;
  transition: text-decoration 0.3s;
  &:hover {
    text-decoration: underline;
  }
`;

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
  color: #f79e31;
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
  color: #f79e31;
  margin-bottom: 8px;
`;

const CardText = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
`;

const ReadMore = styled(Link)`
  color: #f79e31;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
  &:hover {
    color: #c67e27;
  }
`;

const BackToTop = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #f79e31;
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

const heroImages = [cowImage, cow1, cow2, cow3, cow4];

const HeroSlide = styled.div`
  height: 100vh !important;
  background: url(${props => props.image}) no-repeat center center/cover;
  background-position: center;
`;

// Payment option components
const PaymentOptionsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(74, 85, 104, 0.15);
  animation: ${slideIn} 0.5s ease-in-out;
`;

const PaymentHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const DonationSummary = styled.div`
  background: #f4f4f3;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  text-align: center;
`;

const PaymentMethodGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentMethodCard = styled.div`
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border-color: #f79e31;
    transform: translateY(-2px);
  }
`;

const QRCodeContainer = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  overflow: hidden;
`;

const QRCodeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BackButton = styled.button`
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #cbd5e0;
  }
`;

const PaymentMethodSelector = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 24px;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PaymentMethodButton = styled.button`
  padding: 12px 24px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    border-color: #f79e31;
    color: #f79e31;
  }
  
  ${props => props.$active && `
    border-color: #f79e31;
    background: #f79e31;
    color: white;
  `}
`;

const BankDetailsContainer = styled.div`
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  text-align: left;
  margin: 0 auto;
  max-width: 500px;
`;

const BankDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const BankDetailLabel = styled.span`
  font-weight: 600;
  color: #4a5568;
  min-width: 120px;
`;

const BankDetailValue = styled.span`
  color: #2d3748;
  font-family: monospace;
  font-size: 14px;
`;

// React Component
function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [videoDimensions, setVideoDimensions] = useState({ width: '100%', height: 'auto' });
  const [donationData, setDonationData] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateDimensions = () => {
      setVideoDimensions({
        width: `${video.videoWidth}px`,
        height: `${video.videoHeight}px`
      });
    };

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('loadedmetadata', updateDimensions);
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    if (video.videoWidth && video.videoHeight) {
      updateDimensions();
    }

    return () => {
      video.removeEventListener('loadedmetadata', updateDimensions);
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = (e) => {
    e?.stopPropagation();
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
    else setVolume(1);
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const amount = formData.get('amount') || selectedAmount;
    const name = formData.get('name');
    
    if (amount && name) {
      setDonationData({ amount, name });
    }
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };

  const resetDonationForm = () => {
    setDonationData(null);
    setSelectedAmount('');
    setSelectedPaymentMethod(null);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

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
                <Slider
                  dots={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  autoplay={true}
                  autoplaySpeed={3000}
                  cssEase="linear"
                  arrows={false}
                  pauseOnHover={false}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
                >
                  {heroImages.map((img, index) => (
                    <HeroSlide key={index} image={img} />
                  ))}
                </Slider>
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
                  $width={videoDimensions.width}
                  $height={videoDimensions.height}
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
                  <ControlsContainer>
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
                
                {!donationData ? (
                  <>
                    <ButtonGroup>
                      <DonateButton 
                        onClick={() => handleAmountSelect('500')}
                        style={{ backgroundColor: selectedAmount === '500' ? '#c67e27' : '#f79e31' }}
                      >
                        ₹500
                      </DonateButton>
                      <DonateButton 
                        onClick={() => handleAmountSelect('1000')}
                        style={{ backgroundColor: selectedAmount === '1000' ? '#c67e27' : '#f79e31' }}
                      >
                        ₹1000
                      </DonateButton>
                      <DonateButton 
                        onClick={() => handleAmountSelect('2000')}
                        style={{ backgroundColor: selectedAmount === '2000' ? '#c67e27' : '#f79e31' }}
                      >
                        ₹2000
                      </DonateButton>
                      <div style={{ margin: '8px', display: 'inline-block' }}>
                        <Input 
                          type="number" 
                          placeholder="कस्टम राशि"
                          value={selectedAmount && !['500', '1000', '2000'].includes(selectedAmount) ? selectedAmount : ''}
                          onChange={(e) => handleAmountSelect(e.target.value)}
                          style={{ 
                            width: '150px', 
                            margin: '0',
                            border: selectedAmount && !['500', '1000', '2000'].includes(selectedAmount) ? '2px solid #f79e31' : '1px solid #4a5568'
                          }}
                        />
                      </div>
                    </ButtonGroup>
                    <Form as="form" onSubmit={handleDonationSubmit}>
                      <Input 
                        type="text" 
                        name="name"
                        placeholder="आपका नाम" 
                        required 
                      />
                      <SubmitButton type="submit">आगे बढ़ें</SubmitButton>
                    </Form>
                  </>
                ) : (
                  <PaymentOptionsContainer>
                    <PaymentHeader>
                      <h3 style={{ color: '#f79e31', marginBottom: '8px' }}>भुगतान विधि चुनें</h3>
                    </PaymentHeader>
                    
                    <DonationSummary>
                      <p><strong>राशि:</strong> ₹{donationData.amount}</p>
                      <p><strong>नाम:</strong> {donationData.name}</p>
                    </DonationSummary>
                    
                    <PaymentMethodSelector>
                      <PaymentMethodButton
                        $active={selectedPaymentMethod === 'upi'}
                        onClick={() => handlePaymentMethodSelect('upi')}
                      >
                        UPI Payment
                      </PaymentMethodButton>
                      <PaymentMethodButton
                        $active={selectedPaymentMethod === 'neft'}
                        onClick={() => handlePaymentMethodSelect('neft')}
                      >
                        NEFT/Bank Transfer
                      </PaymentMethodButton>
                    </PaymentMethodSelector>
                    
                    {selectedPaymentMethod === 'upi' && (
                      <div style={{ textAlign: 'center' }}>
                        <h4 style={{ color: '#f79e31', marginBottom: '16px' }}>UPI भुगतान</h4>
                        <QRCodeContainer>
                          <QRCodeImage src={upiQR} alt="UPI QR Code" />
                        </QRCodeContainer>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                          QR कोड स्कैन करें और भुगतान करें
                        </p>
                        <p style={{ fontSize: '13px', color: '#f79e31', backgroundColor: '#fff3e0', padding: '12px', borderRadius: '8px', marginBottom: '24px', lineHeight: '1.5' }}>
                          कर छूट के लिए कृपया भुगतान का स्क्रीनशॉट और विवरण इस ईमेल पर भेजें:<br />
                          <strong>anukampafoundation.org@gmail.com</strong>
                        </p>
                      </div>
                    )}
                    
                    {selectedPaymentMethod === 'neft' && (
                      <div>
                        <h4 style={{ color: '#f79e31', marginBottom: '16px', textAlign: 'center' }}>Bank Account Details</h4>
                        <BankDetailsContainer>
                          <BankDetailRow>
                            <BankDetailLabel>Account Name:</BankDetailLabel>
                            <BankDetailValue>Anukampa Foundation</BankDetailValue>
                          </BankDetailRow>
                          <BankDetailRow>
                            <BankDetailLabel>Account No:</BankDetailLabel>
                            <BankDetailValue>50200066388443</BankDetailValue>
                          </BankDetailRow>
                          <BankDetailRow>
                            <BankDetailLabel>IFSC Code:</BankDetailLabel>
                            <BankDetailValue>HDFC0004249</BankDetailValue>
                          </BankDetailRow>
                          <BankDetailRow>
                            <BankDetailLabel>Bank Branch:</BankDetailLabel>
                            <BankDetailValue>HDFC Bank Ujjain, Nikas Choraha</BankDetailValue>
                          </BankDetailRow>
                          <BankDetailRow>
                            <BankDetailLabel>PAN No:</BankDetailLabel>
                            <BankDetailValue>AAVCA8784D</BankDetailValue>
                          </BankDetailRow>
                        </BankDetailsContainer>
                        <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginTop: '16px' }}>
                          कृपया ऊपर दिए गए बैंक विवरण का उपयोग करके राशि ट्रांसफर करें
                        </p>
                        <p style={{ fontSize: '13px', color: '#f79e31', backgroundColor: '#fff3e0', padding: '12px', borderRadius: '8px', marginTop: '16px', lineHeight: '1.5', textAlign: 'center' }}>
                          कर छूट के लिए कृपया भुगतान का स्क्रीनशॉट और विवरण इस ईमेल पर भेजें:<br />
                          <strong>anukampafoundation.org@gmail.com</strong>
                        </p>
                      </div>
                    )}
                    
                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                      <BackButton onClick={resetDonationForm}>
                        वापस जाएं
                      </BackButton>
                    </div>
                  </PaymentOptionsContainer>
                )}
                
                <Text style={{ fontSize: '14px', marginTop: '24px' }}>
                  (नोट: यह एक प्लेसहोल्डर फॉर्म है; उत्पादन में स्ट्राइप जैसे पेमेंट गेटवे के साथ एकीकृत करें।)
                </Text>
              </DonateSection>
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
              {/* <StoriesSection id="stories">
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
              </StoriesSection> */}
              <Section id="contact" bg="#f4f4f3">
                <Title>संपर्क करें</Title>
                <Text>कोई प्रश्न हैं? हमसे संपर्क करें!</Text>
                <Form>
                  <Input type="text" placeholder="आपका नाम" />
                  <Input type="email" placeholder="आपका ईमेल" />
                  <SubmitButton>संदेश भेजें</SubmitButton>
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
