import React from 'react';
import { CreditCard, Smartphone, Truck } from 'lucide-react';
import { PaymentMethod } from '../../types';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange
}) => {
  const paymentMethods = [
    {
      id: PaymentMethod.COD,
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: <Truck className="h-6 w-6" />,
      fee: 5000,
      feeText: 'Shipping Rp 5000'
    },
    {
      id: PaymentMethod.BANK_MANDIRI,
      name: 'Bank Mandiri Transfer',
      description: 'Transfer to Bank Mandiri account',
      icon: <CreditCard className="h-6 w-6" />,
      fee: 0,
      feeText: 'Free Shipping'
    },
    
  ];

  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className={`border rounded-xl p-4 cursor-pointer transition-all ${
            selectedMethod === method.id
              ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-accent-50 shadow-md'
              : 'border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
          }`}
          onClick={() => onMethodChange(method.id)}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => onMethodChange(method.id)}
              className="h-4 w-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
            />
            <div className="ml-3 flex items-center flex-grow">
              <div className={`p-2 rounded-lg mr-3 ${
                selectedMethod === method.id 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-neutral-100 text-primary-500'
              }`}>
                {method.icon}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-neutral-900">{method.name}</h3>
                <p className="text-sm text-neutral-600">{method.description}</p>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  method.fee === 0 ? 'text-green-600' : 'text-neutral-600'
                }`}>
                  {method.feeText}
                </div>
                {method.fee === 0 && (
                  <div className="text-xs text-green-500">Save money!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodSelector;