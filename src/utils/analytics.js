// Google Analytics utility functions

// Track page views
export const trackPageView = (pageName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-CXZN4D08YL', {
      page_title: pageName,
      page_location: window.location.href
    });
  }
};

// Track donation events
export const trackDonation = (amount, paymentMethod, donorName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'donation', {
      event_category: 'engagement',
      event_label: 'donation_made',
      value: amount,
      custom_parameters: {
        payment_method: paymentMethod,
        donor_name: donorName
      }
    });
  }
};

// Track payment method selection
export const trackPaymentMethod = (method) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'payment_method_selected', {
      event_category: 'engagement',
      event_label: method,
      value: 1
    });
  }
};

// Track form interactions
export const trackFormInteraction = (formName, action) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_interaction', {
      event_category: 'engagement',
      event_label: `${formName}_${action}`,
      value: 1
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName, location) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      event_category: 'engagement',
      event_label: buttonName,
      custom_parameters: {
        location: location
      }
    });
  }
};

// Track scroll depth
export const trackScrollDepth = (depth) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth
    });
  }
};

const analytics = {
  trackPageView,
  trackDonation,
  trackPaymentMethod,
  trackFormInteraction,
  trackButtonClick,
  trackScrollDepth
};

export default analytics;
