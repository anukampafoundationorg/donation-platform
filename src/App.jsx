import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import cowImage from './assets/cowHero1.jpg';
import { Routes, Route, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import StoryDetail from './components/StoryDetail';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import CashfreePayment from './components/CashfreePayment';
import PaymentSuccess from './components/PaymentSuccess';
import { trackPageView, trackButtonClick } from './utils/analytics';

import cow1 from './assets/cowimg1.jpeg';
import cow2 from './assets/cowimg2.jpeg';
import cow3 from './assets/cowimg3.jpeg';
import cow4 from './assets/cowimg4.jpeg';
import cow5 from './assets/cowimg5.jpeg';
import cow6 from './assets/cowimg6.jpeg';
import cow7 from './assets/cowimg7.jpeg';
import cow8 from './assets/cowimg8.jpeg';
import cow9 from './assets/cowimg9.jpeg';
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
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  /* Prevent zoom on input focus on iOS */
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="number"],
  textarea,
  select {
    font-size: 16px !important;
  }
  
  @media (max-width: 768px) {
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="number"],
    textarea,
    select {
      font-size: 16px !important;
    }
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
  
  /* Dark overlay for better text readability */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 2;
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    height: 100vh;
    min-height: 600px;
  }
  
  @media (max-width: 480px) {
    height: 100vh;
    min-height: 500px;
  }
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
  background: ${props => props.$isScrolled ? '#f79e31' : 'transparent'};
  transition: background 0.3s ease, box-shadow 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 12px 16px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: 900;
  color: ${props => props.$isScrolled ? '#ffffff' : '#f79e31'};
  transition: color 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
  }
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
  color: ${props => props.$isScrolled ? '#ffffff' : '#f79e31'};
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  transition: color 0.3s, transform 0.3s;
  &:hover {
    color: ${props => props.$isScrolled ? '#ffffff' : '#c67e27'};
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    color: #f79e31;
    font-size: 20px;
    font-weight: 700;
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
    width: 28px;
    height: 4px;
    background: ${props => props.$isScrolled ? '#ffffff' : '#f79e31'};
    margin: 3px 0;
    transition: all 0.3s ease-in-out;
  }
  @media (max-width: 768px) {
    display: flex;
  }
  ${props => props.$isOpen && `
    span:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(8px, -8px);
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
  
  @media (max-width: 768px) {
    padding: 16px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const HeroTagline = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
  color: white;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0px 0px 8px rgba(0, 0, 0, 0.6);
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 8px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
  color: white;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0px 0px 8px rgba(0, 0, 0, 0.6),
    1px 1px 2px rgba(0, 0, 0, 0.9);
  line-height: 1.2;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 28px;
    line-height: 1.3;
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    line-height: 1.4;
    margin-bottom: 10px;
  }
`;

const HeroText = styled.p`
  font-size: 20px;
  margin-bottom: 24px;
  color: white;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0px 0px 6px rgba(0, 0, 0, 0.6);
  line-height: 1.6;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 12px;
  }
`;

const HighlightedWord = styled.span`
  /* Removed background for cleaner look with overlay */
  margin: 0 2px;
`;

const HeroButton = styled.a`
  background-color: #f79e31;
  color: #ffffff;
  padding: 12px 32px;
  text-decoration: none;
  border-radius: 9999px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(247, 158, 49, 0.4);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background-color: #c67e27;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(247, 158, 49, 0.6);
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 24px;
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

// YouTube iframe components
const YouTubeWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 500px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(74, 85, 104, 0.1);
  overflow: hidden;
  position: relative;
`;

const YouTubeIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
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
  min-height: 44px;
  min-width: 44px;
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 15px;
    margin: 6px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 14px;
    margin: 4px;
    width: 100%;
    max-width: 300px;
  }
  
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
  
  @media (max-width: 768px) {
    margin: 16px;
    padding: 20px;
    max-width: none;
  }
  
  @media (max-width: 480px) {
    margin: 12px;
    padding: 16px;
  }
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
  min-height: 44px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 14px 12px;
    font-size: 16px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    font-size: 16px;
    margin-bottom: 12px;
  }
  
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
  padding: 40px 24px 24px 24px;
  width: 100%;
  margin: 0;
  
  @media (max-width: 768px) {
    padding: 32px 20px 20px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 24px 16px 16px 16px;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: left;
  }
  
  @media (max-width: 480px) {
    gap: 24px;
  }
`;

const ContactSection = styled.div`
  text-align: left;
  
  h3 {
    color: #f79e31;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 22px;
      margin-bottom: 16px;
    }
    
    @media (max-width: 480px) {
      font-size: 20px;
      margin-bottom: 14px;
    }
  }
`;

const ContactItem = styled.div`
  margin-bottom: 12px;
  line-height: 1.6;
  font-size: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  strong {
    font-weight: 600;
    color: #2d3748;
  }
  
  a {
    color: #f79e31;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      text-decoration: underline;
      color: #c67e27;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const OrganizationName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 12px;
  }
`;

const Address = styled.div`
  margin-bottom: 16px;
  line-height: 1.7;
  color: #4a5568;
  font-size: 16px;
  
  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 12px;
  }
`;

const MapLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #f79e31;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  margin-top: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #c67e27;
    transform: translateX(2px);
  }
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const LinksSection = styled.div`
  text-align: left;
  
  @media (max-width: 768px) {
    border-top: 1px solid #e2e8f0;
    padding-top: 24px;
  }
  
  @media (max-width: 480px) {
    padding-top: 20px;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 32px auto 0 auto;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
  text-align: center;
  
  @media (max-width: 768px) {
    margin-top: 24px;
    padding-top: 20px;
    text-align: left;
  }
  
  @media (max-width: 480px) {
    margin-top: 20px;
    padding-top: 16px;
  }
`;

const FooterLinks = styled.div`
  margin: 16px 0;
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const FooterLink = styled(Link)`
  color: #f79e31;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    text-decoration: underline;
    color: #c67e27;
  }
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const SocialMediaContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    margin: 16px 0;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    margin: 14px 0;
  }
`;

const SocialIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f79e31;
  color: #ffffff;
  border-radius: 50%;
  text-decoration: none;
  font-size: 18px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #c67e27;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const DeveloperCredit = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  font-size: 14px;
  color: #666;
  
  a {
    color: #f79e31;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    
    &:hover {
      color: #e6891e;
      text-decoration: underline;
    }
  }
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
  
  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
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
  min-height: 44px;
  min-width: 44px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 14px 20px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 13px;
    width: 100%;
    margin-bottom: 8px;
  }
  
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

// Team Styled Components
const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const TeamMember = styled.div`
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #f79e31;
  }
`;

const TeamPosition = styled.h3`
  color: #f79e31;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #f79e31;
`;

const TeamName = styled.p`
  color: #2d3748;
  font-size: 16px;
  font-weight: 600;
  margin: 8px 0;
  line-height: 1.4;
`;

const TeamLocation = styled.p`
  color: #718096;
  font-size: 14px;
  font-style: italic;
  margin: 4px 0;
`;

// React Component
function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [donationData, setDonationData] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      setShowBackToTop(window.scrollY > 300);
    };

    // Track page view
    trackPageView('Home Page');

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
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

  const handlePaymentSuccess = () => {
    setDonationData(null);
    setSelectedAmount('');
    setSelectedPaymentMethod(null);
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
                  <Logo $isScrolled={isScrolled}>Anukampa</Logo>
                  <Hamburger $isOpen={isNavOpen} $isScrolled={isScrolled} onClick={toggleNav}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </Hamburger>
                  <Nav $isOpen={isNavOpen}>
                    <NavLink $isScrolled={isScrolled} to="/#home" onClick={() => setIsNavOpen(false)}>होम</NavLink>
                    <NavLink $isScrolled={isScrolled} to="/#about" onClick={() => setIsNavOpen(false)}>हमारे बारे में</NavLink>
                    <NavLink $isScrolled={isScrolled} to="/#donate" onClick={() => setIsNavOpen(false)}>दान करें</NavLink>
                    <NavLink $isScrolled={isScrolled} to="/#gallery" onClick={() => setIsNavOpen(false)}>गैलरी</NavLink>
                    <NavLink $isScrolled={isScrolled} to="/#team" onClick={() => setIsNavOpen(false)}>हमारी टीम</NavLink>
                    <NavLink $isScrolled={isScrolled} to="/#mission" onClick={() => setIsNavOpen(false)}>हमारा मिशन</NavLink>
                    <NavLink $isScrolled={isScrolled} to="/#stories" onClick={() => setIsNavOpen(false)}>आशा की कहानियाँ</NavLink>
                    <NavLink $isScrolled={isScrolled} to="/#contact" onClick={() => setIsNavOpen(false)}>संपर्क करें</NavLink>
                  </Nav>
                </Header>
                <HeroSection id="home">
                  <HeroContent>
                    <HeroTagline>
                      <HighlightedWord>अनुकम्पा</HighlightedWord>
                    </HeroTagline>
                    <HeroTitle>
                      <HighlightedWord>हमारे</HighlightedWord> <HighlightedWord>साथ</HighlightedWord> <HighlightedWord>जुड़ें</HighlightedWord> <HighlightedWord>इस</HighlightedWord> <HighlightedWord>पवित्र</HighlightedWord> <HighlightedWord>अभियान</HighlightedWord> <HighlightedWord>में</HighlightedWord>
                    </HeroTitle>
                    <HeroText>
                      <HighlightedWord>जहाँ</HighlightedWord> <HighlightedWord>हमारा</HighlightedWord> <HighlightedWord>उद्देश्य</HighlightedWord> <HighlightedWord>है</HighlightedWord> <HighlightedWord>प्रेम,</HighlightedWord> <HighlightedWord>करुणा</HighlightedWord> <HighlightedWord>और</HighlightedWord> <HighlightedWord>सेवा</HighlightedWord> <HighlightedWord>के</HighlightedWord> <HighlightedWord>माध्यम</HighlightedWord> <HighlightedWord>से</HighlightedWord> <HighlightedWord>एक</HighlightedWord> <HighlightedWord>दयालु</HighlightedWord> <HighlightedWord>और</HighlightedWord> <HighlightedWord>परोपकारी</HighlightedWord> <HighlightedWord>समाज</HighlightedWord> <HighlightedWord>का</HighlightedWord> <HighlightedWord>निर्माण</HighlightedWord> <HighlightedWord>करना।</HighlightedWord>
                    </HeroText>
                    <HeroText>
                      <HighlightedWord>हम</HighlightedWord> <HighlightedWord>गौसेवा,</HighlightedWord> <HighlightedWord>वरिष्ठ</HighlightedWord> <HighlightedWord>नागरिकों</HighlightedWord> <HighlightedWord>की</HighlightedWord> <HighlightedWord>देखभाल</HighlightedWord> <HighlightedWord>और</HighlightedWord> <HighlightedWord>सामुदायिक</HighlightedWord> <HighlightedWord>कल्याण</HighlightedWord> <HighlightedWord>जैसे</HighlightedWord> <HighlightedWord>कार्यों</HighlightedWord> <HighlightedWord>के</HighlightedWord> <HighlightedWord>जरिए</HighlightedWord> <HighlightedWord>समाज</HighlightedWord> <HighlightedWord>में</HighlightedWord> <HighlightedWord>भलाई</HighlightedWord> <HighlightedWord>और</HighlightedWord> <HighlightedWord>अपनापन</HighlightedWord> <HighlightedWord>फैलाने</HighlightedWord> <HighlightedWord>के</HighlightedWord> <HighlightedWord>लिए</HighlightedWord> <HighlightedWord>समर्पित</HighlightedWord> <HighlightedWord>हैं।</HighlightedWord>
                    </HeroText>
                    <HeroText>
                      <HighlightedWord>आपका</HighlightedWord> <HighlightedWord>छोटा-सा</HighlightedWord> <HighlightedWord>योगदान</HighlightedWord> <HighlightedWord>भी</HighlightedWord> <HighlightedWord>किसी</HighlightedWord> <HighlightedWord>ज़िंदगी</HighlightedWord> <HighlightedWord>में</HighlightedWord> <HighlightedWord>बड़ा</HighlightedWord> <HighlightedWord>बदलाव</HighlightedWord> <HighlightedWord>ला</HighlightedWord> <HighlightedWord>सकता</HighlightedWord> <HighlightedWord>है।</HighlightedWord>
                    </HeroText>
                    <HeroText>
                      <HighlightedWord>हमसे</HighlightedWord> <HighlightedWord>जुड़ें</HighlightedWord> <HighlightedWord>और</HighlightedWord> <HighlightedWord>इस</HighlightedWord> <HighlightedWord>नेक</HighlightedWord> <HighlightedWord>कार्य</HighlightedWord> <HighlightedWord>का</HighlightedWord> <HighlightedWord>हिस्सा</HighlightedWord> <HighlightedWord>बनें।</HighlightedWord>
                    </HeroText>
                    <HeroButton href="#donate">👉 अभी दान करें</HeroButton>
                  </HeroContent>
                </HeroSection>
              </HeroWrapper>
              <Section id="about">
                <Title>हमारे बारे में</Title>
                <Text>
                  गौशाला आश्रय एक गैर-लाभकारी संगठन है जो गायों के कल्याण के लिए समर्पित है। 2010 में स्थापित, हमने सड़कों से 500 से अधिक गायों को बचाया है, उन्हें सुरक्षित आश्रय, पौष्टिक भोजन और पशु चिकित्सा देखभाल प्रदान की है। गायें हमारी संस्कृति में विशेष स्थान रखती हैं, जो मातृत्व और समृद्धि का प्रतीक हैं। हम करुणामय देखभाल और टिकाऊ खेती प्रथाओं में विश्वास करते हैं।
                </Text>
                <YouTubeWrapper>
                  <YouTubeIframe
                    src="https://www.youtube.com/embed/3f2Evvxke9s"
                    title="Anukampa Foundation Video"
                    allowFullScreen
                  />
                </YouTubeWrapper>
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
                        $active={selectedPaymentMethod === 'cashfree'}
                        onClick={() => {
                          handlePaymentMethodSelect('cashfree');
                          trackButtonClick('Online Payment', 'Donation Section');
                        }}
                      >
                        Online Payment (Cards, UPI, Net Banking, Wallets)
                      </PaymentMethodButton>
                      <PaymentMethodButton
                        $active={selectedPaymentMethod === 'neft'}
                        onClick={() => handlePaymentMethodSelect('neft')}
                      >
                        NEFT/Bank Transfer
                      </PaymentMethodButton>
                    </PaymentMethodSelector>
                    
                    {selectedPaymentMethod === 'cashfree' && (
                      <CashfreePayment
                        donationData={donationData}
                        onPaymentSuccess={handlePaymentSuccess}
                        onBack={() => setSelectedPaymentMethod(null)}
                      />
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
                          <strong>anukampafoundationorg@gmail.com</strong>
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
              
              <Section id="team">
                <Title>हमारी टीम</Title>
                <TeamContainer>
                  <TeamMember>
                    <TeamPosition>डायरेक्टर</TeamPosition>
                    <TeamName>ओम प्रकाश जैन</TeamName>
                    <TeamName>उषा जैन</TeamName>
                    <TeamName>निहाल जैन</TeamName>
                  </TeamMember>
                  
                  <TeamMember>
                    <TeamPosition>राष्ट्रीय अध्यक्ष</TeamPosition>
                    <TeamName>कालू लाल जी सालेचा</TeamName>
                    <TeamLocation>भवानी मंडी</TeamLocation>
                  </TeamMember>
                  
                  <TeamMember>
                    <TeamPosition>राष्ट्रीय महासचिव</TeamPosition>
                    <TeamName>संजय जैन फुलेरा</TeamName>
                    <TeamLocation> पिपलोन</TeamLocation>
                  </TeamMember>
                  
                  <TeamMember>
                    <TeamPosition>राष्ट्रीय उपाध्यक्ष</TeamPosition>
                    <TeamName>श्रीमती शारदा जवाहर जी चौधरी</TeamName>
                  </TeamMember>
                  
                  <TeamMember>
                    <TeamPosition>राष्ट्रीय प्रमुख मार्गदर्शक</TeamPosition>
                    <TeamName>श्री मोहनलाल जी मेहता</TeamName>
                    <TeamLocation>रावटी</TeamLocation>
                  </TeamMember>
                </TeamContainer>
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
                <Logo $isScrolled={isScrolled}>Anukampa</Logo>
                <Hamburger $isOpen={isNavOpen} $isScrolled={isScrolled} onClick={toggleNav}>
                  <span></span>
                  <span></span>
                  <span></span>
                </Hamburger>
                <Nav $isOpen={isNavOpen}>
                  <NavLink $isScrolled={isScrolled} to="/#home" onClick={() => setIsNavOpen(false)}>होम</NavLink>
                  <NavLink $isScrolled={isScrolled} to="/#about" onClick={() => setIsNavOpen(false)}>हमारे बारे में</NavLink>
                  <NavLink $isScrolled={isScrolled} to="/#donate" onClick={() => setIsNavOpen(false)}>दान करें</NavLink>
                  <NavLink $isScrolled={isScrolled} to="/#mission" onClick={() => setIsNavOpen(false)}>हमारा मिशन</NavLink>
                  <NavLink $isScrolled={isScrolled} to="/#gallery" onClick={() => setIsNavOpen(false)}>गैलरी</NavLink>
                  <NavLink $isScrolled={isScrolled} to="/#stories" onClick={() => setIsNavOpen(false)}>आशा की कहानियाँ</NavLink>
                  <NavLink $isScrolled={isScrolled} to="/#contact" onClick={() => setIsNavOpen(false)}>संपर्क करें</NavLink>
                </Nav>
              </Header>
              <StoryDetail />
            </>
          } />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
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
          <FooterContent>
            <ContactSection>
              <h3>संपर्क करें</h3>
              <OrganizationName>Anukampa Foundation</OrganizationName>
              <Address>
                401 Bagadiya Tower, 5th Floor<br />
                Near Kanthal Chouraha, Ujjain 456001
              </Address>
              <ContactItem>
                <strong>फोन:</strong> <a href="tel:+919413900395">9413900395</a>
              </ContactItem>
              <ContactItem>
                <strong>ईमेल:</strong> <a href="mailto:Anukampafoundationorg@gmail.com">Anukampafoundationorg@gmail.com</a>
              </ContactItem>
              <MapLink href="https://maps.app.goo.gl/8HwqEFG5FGk2j5qj7?g_st=iw" target="_blank" rel="noopener noreferrer">
                📍 Google Maps पर देखें
              </MapLink>
            </ContactSection>
            
            <LinksSection>
              <h3 style={{ color: "#f79e31", marginBottom: "20px", fontSize: "24px", fontWeight: "600" }}>त्वरित लिंक</h3>
              <FooterLinks>
                <FooterLink to="/privacy-policy">गोपनीयता नीति</FooterLink>
                <FooterLink to="/terms-conditions">सेवा की शर्तें</FooterLink>
              </FooterLinks>
              <SocialMediaContainer>
                <SocialIcon href="https://linkedin.com/company/anukampa-foundation" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://facebook.com/anukampafoundation" target="_blank" rel="noopener noreferrer" title="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://instagram.com/anukampafoundation" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://twitter.com/anukampafoundation" target="_blank" rel="noopener noreferrer" title="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </SocialIcon>
              </SocialMediaContainer>
            </LinksSection>
          </FooterContent>
          
          <FooterBottom>
            <p>&copy; 2025 गौशाला आश्रय। सभी अधिकार सुरक्षित।</p>
            <DeveloperCredit>
              Developed by <a href="https://www.linkedin.com/in/mohnishdev/" target="_blank" rel="noopener noreferrer">Mohnish Sharma</a>
            </DeveloperCredit>
          </FooterBottom>
        </Footer>
        </Container>
    </>
  );
}

export default App;
