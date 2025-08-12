import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentPanel = ({ bookingDetails, groupMembers, onPaymentMethodSelect, selectedPaymentMethod }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [saveCard, setSaveCard] = useState(false);
  const [splitPayment, setSplitPayment] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Pay with your PayPal account'
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: 'Smartphone',
      description: 'Touch ID or Face ID'
    },
    {
      id: 'google',
      name: 'Google Pay',
      icon: 'Smartphone',
      description: 'Pay with Google'
    }
  ];

  const savedCards = [
    {
      id: 'card1',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 'card2',
      last4: '5555',
      brand: 'Mastercard',
      expiry: '08/26',
      isDefault: false
    }
  ];

  const calculateTotal = () => {
    const basePrice = bookingDetails?.price || 45;
    const tax = basePrice * 0.08; // 8% tax
    const serviceFee = 2.50;
    const total = basePrice + tax + serviceFee;
    
    return {
      basePrice,
      tax,
      serviceFee,
      total,
      perPerson: groupMembers?.length > 0 ? total / (groupMembers?.length + 1) : total
    };
  };

  const pricing = calculateTotal();

  const handleCardInputChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    if (v?.length >= 2) {
      return v?.substring(0, 2) + '/' + v?.substring(2, 4);
    }
    return v;
  };

  return (
  <div className="pt-20"> {/* Added padding top */}
    <div className="bg-card rounded-athletic border border-border shadow-athletic">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-athletic-bold text-text-primary flex items-center">
          <Icon name="CreditCard" size={20} className="mr-2" />
          Payment Details
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Secure payment processing with 256-bit encryption
        </p>
      </div>
      <div className="p-4 space-y-6">
        {/* Payment Method Selection */}
        <div>
          <h4 className="font-athletic-bold text-text-primary mb-3">Payment Method</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paymentMethods?.map(method => (
              <button
                key={method?.id}
                onClick={() => onPaymentMethodSelect(method?.id)}
                className={`
                  p-3 rounded-athletic border text-left transition-athletic
                  ${selectedPaymentMethod === method?.id
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-border/80 text-text-primary'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={method?.icon} size={20} />
                  <div>
                    <div className="font-athletic-medium">{method?.name}</div>
                    <div className="text-xs text-text-secondary">{method?.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Saved Cards (if card payment selected) */}
        {selectedPaymentMethod === 'card' && savedCards?.length > 0 && (
          <div>
            <h4 className="font-athletic-bold text-text-primary mb-3">Saved Cards</h4>
            <div className="space-y-2">
              {savedCards?.map(card => (
                <button
                  key={card?.id}
                  className="w-full p-3 rounded-athletic border border-border hover:border-primary/50 text-left transition-athletic"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                        <Icon name="CreditCard" size={16} />
                      </div>
                      <div>
                        <div className="font-athletic-medium text-text-primary">
                          {card?.brand} •••• {card?.last4}
                        </div>
                        <div className="text-xs text-text-secondary">Expires {card?.expiry}</div>
                      </div>
                    </div>
                    {card?.isDefault && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-3">
              <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left">
                Add New Card
              </Button>
            </div>
          </div>
        )}

        {/* Card Details Form (if new card) */}
        {selectedPaymentMethod === 'card' && (
          <div className="space-y-4">
            <h4 className="font-athletic-bold text-text-primary">Card Information</h4>
            
            <Input
              label="Card Number"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails?.number}
              onChange={(e) => handleCardInputChange('number', formatCardNumber(e?.target?.value))}
              maxLength={19}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                type="text"
                placeholder="MM/YY"
                value={cardDetails?.expiry}
                onChange={(e) => handleCardInputChange('expiry', formatExpiry(e?.target?.value))}
                maxLength={5}
              />
              <Input
                label="CVV"
                type="text"
                placeholder="123"
                value={cardDetails?.cvv}
                onChange={(e) => handleCardInputChange('cvv', e?.target?.value?.replace(/\D/g, ''))}
                maxLength={4}
              />
            </div>
            
            <Input
              label="Cardholder Name"
              type="text"
              placeholder="John Doe"
              value={cardDetails?.name}
              onChange={(e) => handleCardInputChange('name', e?.target?.value)}
            />
            
            <Checkbox
              label="Save this card for future bookings"
              checked={saveCard}
              onChange={(e) => setSaveCard(e?.target?.checked)}
            />
          </div>
        )}

        {/* Split Payment Option */}
        {groupMembers?.length > 0 && (
          <div className="bg-muted/50 rounded-athletic p-4">
            <Checkbox
              label="Split payment with group members"
              description={`Each person pays $${pricing?.perPerson?.toFixed(2)}`}
              checked={splitPayment}
              onChange={(e) => setSplitPayment(e?.target?.checked)}
            />
            
            {splitPayment && (
              <div className="mt-3 space-y-2">
                <p className="text-sm text-text-secondary">
                  Payment requests will be sent to all confirmed group members
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-text-secondary">
                    You'll only be charged once everyone confirms
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pricing Breakdown */}
        <div className="bg-gradient-athletic-depth rounded-athletic p-4">
          <h4 className="font-athletic-bold text-text-primary mb-3">Booking Summary</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Court rental (1 hour)</span>
              <span className="text-text-primary">${pricing?.basePrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Service fee</span>
              <span className="text-text-primary">${pricing?.serviceFee?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Tax</span>
              <span className="text-text-primary">${pricing?.tax?.toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between font-athletic-bold">
                <span className="text-text-primary">Total</span>
                <span className="text-text-primary">${pricing?.total?.toFixed(2)}</span>
              </div>
              {groupMembers?.length > 0 && splitPayment && (
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Your share</span>
                  <span>${pricing?.perPerson?.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="flex items-center justify-center space-x-6 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} className="text-success" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} className="text-success" />
            <span>PCI Compliant</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span>Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default PaymentPanel;


