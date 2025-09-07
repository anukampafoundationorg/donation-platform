import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Cashfree,
  CardNumber,
  CardHolder,
  CardExpiry,
  CardCvv,
  SaveInstrument,
} from '@cashfreepayments/pg-react';
import { load } from '@cashfreepayments/cashfree-js';
import { createOrder, generateOrderData } from '../utils/cashfreeApi';
import { trackDonation, trackPaymentMethod } from '../utils/analytics';

// Styled components for the payment form
const PaymentContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  overflow-y: auto;
  z-index: 1000;
`;

const PaymentHeader = styled.div`
  background: linear-gradient(135deg, #f79e31 0%, #e6891e 100%);
  color: white;
  padding: 24px 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(247, 158, 49, 0.3);
  
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
  
  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

const PaymentTitle = styled.h3`
  color: white;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const PaymentSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  margin: 0;
`;

const PaymentContent = styled.div`
  padding: 24px 20px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 20px 16px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

const DonationSummary = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 24px;
  text-align: center;
  border: 1px solid rgba(247, 158, 49, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    margin-bottom: 16px;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SummaryLabel = styled.span`
  font-weight: 600;
  color: #4a5568;
`;

const SummaryValue = styled.span`
  color: #2d3748;
  font-weight: 700;
`;

const CashfreeWrapper = styled.div`
  margin-bottom: 24px;
`;

const CardFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

const CardRow = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PayButton = styled.button`
  width: 100%;
  background: ${props => props.disabled ? 'linear-gradient(135deg, #a0a0a0 0%, #8a8a8a 100%)' : 'linear-gradient(135deg, #f79e31 0%, #e6891e 100%)'};
  color: #ffffff;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: ${props => props.disabled ? 'none' : '0 4px 16px rgba(247, 158, 49, 0.2)'};
  
  @media (max-width: 768px) {
    padding: 14px 20px;
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 14px;
  }
  
  &:hover {
    background: ${props => props.disabled ? 'linear-gradient(135deg, #a0a0a0 0%, #8a8a8a 100%)' : 'linear-gradient(135deg, #e6891e 0%, #d67a0d 100%)'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 6px 20px rgba(247, 158, 49, 0.4)'};
  }
  
  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(0)'};
  }
`;

const BackButton = styled.button`
  width: 100%;
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 12px;
  
  &:hover {
    background: #cbd5e0;
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

const SuccessMessage = styled.div`
  background: #c6f6d5;
  color: #2f855a;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
    border-width: 2px;
  }
`;

const PaymentMethodTabs = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
    margin-bottom: 16px;
  }
`;

const PaymentMethodTab = styled.button`
  flex: 1;
  padding: 20px 24px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  min-height: 100px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 768px) {
    padding: 16px 20px;
    font-size: 15px;
    min-height: 90px;
  }
  
  @media (max-width: 480px) {
    padding: 14px 16px;
    font-size: 14px;
    min-height: 80px;
    gap: 8px;
  }
  
  &:hover {
    border-color: #f79e31;
    color: #f79e31;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(247, 158, 49, 0.25);
  }
  
  ${props => props.$active && `
    border-color: #f79e31;
    background: linear-gradient(135deg, #f79e31 0%, #e6891e 100%);
    color: white;
    box-shadow: 0 8px 24px rgba(247, 158, 49, 0.4);
    transform: translateY(-3px);
  `}
`;

const PaymentMethodContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(247, 158, 49, 0.1);
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    margin-bottom: 16px;
  }
`;

const PaymentMethodTitle = styled.h4`
  color: #f79e31;
  margin-bottom: 16px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

const UpiInstructions = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  text-align: center;
  border: 1px solid rgba(247, 158, 49, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const UpiStep = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  color: #4a5568;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const UpiStepNumber = styled.span`
  background: #f79e31;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  margin-right: 8px;
`;

const CashfreePayment = ({ donationData, onPaymentSuccess, onBack }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  // Cashfree configuration is handled in the API utilities

  // Initialize Cashfree SDK
  const initializeSDK = async () => {
    const cashfree = await load({ mode: "production" });
    return cashfree;
  };

  // Initiate Cashfree payment process
  const initiatePayment = async (sessionId) => {
    try {
      const cashfree = await initializeSDK();
      
      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_self",  // Redirects to the target URL after payment
      };
      
      console.log("Starting checkout with options:", checkoutOptions);
      cashfree.checkout(checkoutOptions);
    } catch (error) {
      console.error("Error initializing payment:", error);
      setError("Failed to initialize payment. Please try again.");
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    // For card payments, check if form is complete
    if (selectedPaymentMethod === 'card' && !isComplete) return;
    
    // Track payment method selection
    trackPaymentMethod(selectedPaymentMethod);
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // Generate order data for Cashfree
      const orderData = generateOrderData(donationData);
      
      // Create order with Cashfree
      const orderResponse = await createOrder(orderData);
      
      if (orderResponse.success) {
        // Track donation attempt
        trackDonation(donationData.amount, selectedPaymentMethod, donationData.name);
        
        // For non-card payments, use Cashfree JavaScript SDK
        if (selectedPaymentMethod !== 'card') {
          console.log('Starting Cashfree payment with session:', orderResponse.payment_session_id);
          
          // Show processing message
          setSuccess('Initializing payment... Please wait.');
          
          // Use Cashfree JavaScript SDK for payment
          await initiatePayment(orderResponse.payment_session_id);
        } else {
          // For card payments, process directly
          setSuccess('Payment processed successfully! Thank you for your donation.');
          setIsProcessing(false);
          
          // Call success callback after a delay
          setTimeout(() => {
            onPaymentSuccess && onPaymentSuccess();
          }, 2000);
        }
      } else {
        throw new Error(orderResponse.message || 'Failed to create order');
      }
      
    } catch (err) {
      setError('Payment failed. Please try again.');
      setIsProcessing(false);
      console.error('Payment error:', err);
    }
  };

  const handleComplete = (status) => {
    setIsComplete(status);
  };

  if (success) {
    return (
      <PaymentContainer>
        <PaymentHeader>
          <PaymentTitle>Payment Successful!</PaymentTitle>
          <PaymentSubtitle>Thank you for your generous donation</PaymentSubtitle>
        </PaymentHeader>
        
        <PaymentContent>
          <SuccessMessage>{success}</SuccessMessage>
          <BackButton onClick={onBack}>
            Make Another Donation
          </BackButton>
        </PaymentContent>
      </PaymentContainer>
    );
  }

  return (
    <PaymentContainer>
      <PaymentHeader>
        <PaymentTitle>Secure Payment</PaymentTitle>
        <PaymentSubtitle>Complete your donation securely</PaymentSubtitle>
      </PaymentHeader>
      
      <PaymentContent>
      
      <DonationSummary>
        <SummaryRow>
          <SummaryLabel>Amount:</SummaryLabel>
          <SummaryValue>₹{donationData.amount}</SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryLabel>Donor:</SummaryLabel>
          <SummaryValue>{donationData.name}</SummaryValue>
        </SummaryRow>
      </DonationSummary>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <PaymentMethodTabs>
        <PaymentMethodTab
          $active={selectedPaymentMethod === 'card'}
          onClick={() => setSelectedPaymentMethod('card')}
        >
          <div style={{ fontSize: '24px' }}>💳</div>
          <div>Card Payment</div>
        </PaymentMethodTab>
        <PaymentMethodTab
          $active={selectedPaymentMethod === 'upi'}
          onClick={() => setSelectedPaymentMethod('upi')}
        >
          <div style={{ fontSize: '24px' }}>📱</div>
          <div>UPI Payment</div>
        </PaymentMethodTab>
      </PaymentMethodTabs>

      <PaymentMethodContent>
        {selectedPaymentMethod === 'card' && (
          <>
            <PaymentMethodTitle>Card Payment</PaymentMethodTitle>
            <CashfreeWrapper>
              <Cashfree
                theme="pastel"
                onComplete={handleComplete}
                customStyle={{
                  '--cf-primary-color': '#f79e31',
                  '--cf-secondary-color': '#c67e27',
                  '--cf-border-color': '#e2e8f0',
                  '--cf-border-radius': '8px',
                  '--cf-font-family': 'Poppins, sans-serif'
                }}
              >
                <CardFormContainer>
                  <CardNumber />
                  <CardHolder />
                  <CardRow>
                    <CardExpiry />
                    <CardCvv />
                  </CardRow>
                  <SaveInstrument />
                </CardFormContainer>
              </Cashfree>
            </CashfreeWrapper>
            <PayButton
              onClick={handlePayment}
              disabled={!isComplete || isProcessing}
            >
              {isProcessing ? (
                <>
                  <LoadingSpinner />
                  Processing Payment...
                </>
              ) : (
                `Pay ₹${donationData.amount}`
              )}
            </PayButton>
          </>
        )}

        {selectedPaymentMethod === 'upi' && (
          <>
            <PaymentMethodTitle>UPI Payment</PaymentMethodTitle>
            <UpiInstructions>
              <UpiStep>
                <UpiStepNumber>1</UpiStepNumber>
                Click "Pay with UPI" to open Cashfree's secure payment page
              </UpiStep>
              <UpiStep>
                <UpiStepNumber>2</UpiStepNumber>
                Enter your UPI ID and complete payment using your UPI app
              </UpiStep>
              <UpiStep>
                <UpiStepNumber>3</UpiStepNumber>
                You'll be redirected back to our website after payment
              </UpiStep>
            </UpiInstructions>
            <PayButton
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <LoadingSpinner />
                  Processing...
                </>
              ) : (
                'Pay with UPI'
              )}
            </PayButton>
          </>
        )}

      </PaymentMethodContent>
      
      </PaymentContent>

      <BackButton onClick={onBack}>
        Back to Payment Options
      </BackButton>
    </PaymentContainer>
  );
};

export default CashfreePayment;
