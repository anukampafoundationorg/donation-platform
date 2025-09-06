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
import { createOrder, generateOrderData } from '../utils/cashfreeApi';

// Styled components for the payment form
const PaymentContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(74, 85, 104, 0.15);
  animation: slideIn 0.5s ease-in-out;
`;

const PaymentHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const PaymentTitle = styled.h3`
  color: #f79e31;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 700;
`;

const PaymentSubtitle = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`;

const DonationSummary = styled.div`
  background: #f4f4f3;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  text-align: center;
  border: 1px solid #e2e8f0;
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
  background-color: ${props => props.disabled ? '#a0a0a0' : '#f79e31'};
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(74, 85, 104, 0.2);
  
  &:hover {
    background-color: ${props => props.disabled ? '#a0a0a0' : '#c67e27'};
    transform: ${props => props.disabled ? 'none' : 'scale(1.02)'};
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
`;

const PaymentMethodTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 16px;
`;

const PaymentMethodTab = styled.button`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 14px;
  flex: 1;
  
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

const PaymentMethodContent = styled.div`
  min-height: 200px;
`;

const PaymentMethodTitle = styled.h4`
  color: #f79e31;
  margin-bottom: 16px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

const UpiInstructions = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  text-align: center;
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

  const handlePayment = async () => {
    // For card payments, check if form is complete
    if (selectedPaymentMethod === 'card' && !isComplete) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // Generate order data for Cashfree
      const orderData = generateOrderData(donationData);
      
      // Create order with Cashfree
      const orderResponse = await createOrder(orderData);
      
      if (orderResponse.success) {
        // For non-card payments, redirect to Cashfree payment page
        if (selectedPaymentMethod !== 'card') {
          console.log('Redirecting to Cashfree payment page:', orderResponse.payment_url);
          
          // Show redirecting message
          setSuccess('Redirecting to payment page... Please complete your payment.');
          setIsProcessing(false);
          
          // Redirect to Cashfree payment page
          if (orderResponse.payment_url) {
            // Use the actual payment URL from Cashfree
            window.location.href = orderResponse.payment_url;
          } else {
            // Fallback: construct payment URL using payment_session_id
            const paymentUrl = `https://merchant.cashfree.com/merchant/pg?payment_session_id=${orderResponse.payment_session_id}`;
            window.location.href = paymentUrl;
          }
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
        <SuccessMessage>{success}</SuccessMessage>
        <BackButton onClick={onBack}>
          Make Another Donation
        </BackButton>
      </PaymentContainer>
    );
  }

  return (
    <PaymentContainer>
      <PaymentHeader>
        <PaymentTitle>Card Payment</PaymentTitle>
        <PaymentSubtitle>Complete your donation securely</PaymentSubtitle>
      </PaymentHeader>
      
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
          💳 Card
        </PaymentMethodTab>
        <PaymentMethodTab
          $active={selectedPaymentMethod === 'upi'}
          onClick={() => setSelectedPaymentMethod('upi')}
        >
          📱 UPI
        </PaymentMethodTab>
        <PaymentMethodTab
          $active={selectedPaymentMethod === 'netbanking'}
          onClick={() => setSelectedPaymentMethod('netbanking')}
        >
          🏦 Net Banking
        </PaymentMethodTab>
        <PaymentMethodTab
          $active={selectedPaymentMethod === 'app'}
          onClick={() => setSelectedPaymentMethod('app')}
        >
          📱 App
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

        {selectedPaymentMethod === 'netbanking' && (
          <>
            <PaymentMethodTitle>Net Banking</PaymentMethodTitle>
            <UpiInstructions>
              <UpiStep>
                <UpiStepNumber>1</UpiStepNumber>
                Click "Pay with Net Banking" to open Cashfree's secure payment page
              </UpiStep>
              <UpiStep>
                <UpiStepNumber>2</UpiStepNumber>
                Select your bank from the list and complete payment
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
                'Pay with Net Banking'
              )}
            </PayButton>
          </>
        )}

        {selectedPaymentMethod === 'app' && (
          <>
            <PaymentMethodTitle>App Payment</PaymentMethodTitle>
            <UpiInstructions>
              <UpiStep>
                <UpiStepNumber>1</UpiStepNumber>
                Click "Pay with App" to open Cashfree's secure payment page
              </UpiStep>
              <UpiStep>
                <UpiStepNumber>2</UpiStepNumber>
                Select your preferred payment app (Paytm, PhonePe, Google Pay, etc.) and complete payment
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
                'Pay with App'
              )}
            </PayButton>
          </>
        )}
      </PaymentMethodContent>

      <BackButton onClick={onBack}>
        Back to Payment Options
      </BackButton>
    </PaymentContainer>
  );
};

export default CashfreePayment;
