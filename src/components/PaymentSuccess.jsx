import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SuccessContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(74, 85, 104, 0.15);
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #c6f6d5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 40px;
`;

const SuccessTitle = styled.h1`
  color: #2f855a;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const SuccessMessage = styled.p`
  color: #4a5568;
  font-size: 18px;
  margin-bottom: 24px;
  line-height: 1.6;
`;

const OrderDetails = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  text-align: left;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #4a5568;
`;

const DetailValue = styled.span`
  color: #2d3748;
  font-family: monospace;
`;

const ActionButton = styled.button`
  background-color: #f79e31;
  color: #ffffff;
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 8px;
  
  &:hover {
    background-color: #c67e27;
    transform: translateY(-2px);
  }
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

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  const orderId = searchParams.get('order_id');

  useEffect(() => {
    // Simulate payment verification
    const verifyPayment = async () => {
      try {
        // In a real implementation, you would call your backend to verify the payment
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, assume payment is successful
        setPaymentStatus({
          success: true,
          order_id: orderId,
          amount: '1000', // This would come from your backend
          status: 'PAID'
        });
        setIsVerifying(false);
      } catch (err) {
        setError('Failed to verify payment status');
        setIsVerifying(false);
      }
    };

    if (orderId) {
      verifyPayment();
    } else {
      setError('No order ID found');
      setIsVerifying(false);
    }
  }, [orderId]);

  const handleMakeAnotherDonation = () => {
    navigate('/#donate');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (isVerifying) {
    return (
      <SuccessContainer>
        <LoadingSpinner />
        <SuccessMessage>Verifying your payment...</SuccessMessage>
      </SuccessContainer>
    );
  }

  if (error) {
    return (
      <SuccessContainer>
        <SuccessIcon style={{ background: '#fed7d7' }}>❌</SuccessIcon>
        <SuccessTitle style={{ color: '#c53030' }}>Payment Verification Failed</SuccessTitle>
        <SuccessMessage>{error}</SuccessMessage>
        <ActionButton onClick={handleGoHome}>Go Home</ActionButton>
      </SuccessContainer>
    );
  }

  return (
    <SuccessContainer>
      <SuccessIcon>✅</SuccessIcon>
      <SuccessTitle>Payment Successful!</SuccessTitle>
      <SuccessMessage>
        Thank you for your generous donation to Anukampa Foundation. 
        Your contribution will help us continue our mission of caring for cows and serving the community.
      </SuccessMessage>
      
      {paymentStatus && (
        <OrderDetails>
          <DetailRow>
            <DetailLabel>Order ID:</DetailLabel>
            <DetailValue>{paymentStatus.order_id}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Amount:</DetailLabel>
            <DetailValue>₹{paymentStatus.amount}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Status:</DetailLabel>
            <DetailValue>{paymentStatus.status}</DetailValue>
          </DetailRow>
        </OrderDetails>
      )}
      
      <div>
        <ActionButton onClick={handleMakeAnotherDonation}>
          Make Another Donation
        </ActionButton>
        <ActionButton onClick={handleGoHome}>
          Go Home
        </ActionButton>
      </div>
    </SuccessContainer>
  );
};

export default PaymentSuccess;
