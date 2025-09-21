import { useActionState } from 'react';
import { z } from 'zod';

// Types for the form state
type FormState = {
  status: string;
  message: string;
  error: string;
  fieldErrors: {
    donorName?: string;
    email?: string;
    phone?: string;
    amount?: string;
    donationType?: string;
    paymentMethod?: string;
    message?: string;
  };
};

// Zod schema for donation form validation
const donationSchema = z.object({
  donorName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val.replace(/[\s\-\(\)]/g, '')), {
      message: 'Please enter a valid phone number'
    }),
  amount: z.string()
    .transform((val) => Number.parseFloat(val))
    .refine((val) => !Number.isNaN(val) && val > 0, 'Amount must be greater than 0')
    .refine((val) => val <= 1000000, 'Amount must be less than $1,000,000'),
  donationType: z.enum(['one-time', 'monthly', 'yearly'], {
    message: 'Please select a valid donation type'
  }),
  paymentMethod: z.enum(['credit-card', 'debit-card', 'paypal', 'bank-transfer'], {
    message: 'Please select a valid payment method'
  }),
  message: z.string().max(500, 'Message must be less than 500 characters').optional()
});

// Action function for handling form submission
async function submitDonation(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    // Extract form data
    const formValues = {
      donorName: formData.get('donorName'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      amount: formData.get('amount'),
      donationType: formData.get('donationType'),
      paymentMethod: formData.get('paymentMethod'),
      message: formData.get('message') || ''
    };

    // Validate with Zod
    const validatedData = donationSchema.parse(formValues);

    // Replace with your actual API endpoint
    const response = await fetch('/api/donations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });

    if (response.ok) {
      return {
        status: 'success',
        message: 'Thank you! Your donation has been submitted successfully.',
        error: '',
        fieldErrors: {}
      };
    }
    
    return {
      status: 'error',
      message: 'There was an error processing your donation. Please try again.',
      error: 'Server error',
      fieldErrors: {}
    };
  } catch (error) {
    console.error('Submission error:', error);
    
    // Handle Zod validation errors
   if (error instanceof z.ZodError) {
      const fieldErrors: FormState['fieldErrors'] = {};
      for (const err of error.issues) {
        if (err.path.length > 0) {
          const fieldName = err.path[0] as keyof FormState['fieldErrors'];
          fieldErrors[fieldName] = err.message;
        }
      }
      
      return {
        status: 'validation_error',
        message: 'Please correct the errors below.',
        error: 'Validation failed',
        fieldErrors
      };
    }
    
    return {
      status: 'error',
      message: 'There was an error processing your donation. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
      fieldErrors: {}
    };
  }
}

export const DonateForm = () => {
  const [state, formAction, isPending] = useActionState(submitDonation, {
    status: '',
    message: '',
    error: '',
    fieldErrors: {}
  } as FormState);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="donorName" className="block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            type="text"
            id="donorName"
            name="donorName"
            required
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              state.fieldErrors?.donorName ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {state.fieldErrors?.donorName && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.donorName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              state.fieldErrors?.email ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              state.fieldErrors?.phone ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {state.fieldErrors?.phone && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Donation Amount ($) *
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="1"
            step="0.01"
            required
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              state.fieldErrors?.amount ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {state.fieldErrors?.amount && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.amount}</p>
          )}
        </div>

        <div>
          <label htmlFor="donationType" className="block text-sm font-medium text-gray-700">
            Donation Type
          </label>
          <select
            id="donationType"
            name="donationType"
            defaultValue="one-time"
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              state.fieldErrors?.donationType ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          {state.fieldErrors?.donationType && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.donationType}</p>
          )}
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            defaultValue="credit-card"
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              state.fieldErrors?.paymentMethod ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
          {state.fieldErrors?.paymentMethod && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.paymentMethod}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              state.fieldErrors?.message ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Any special message or dedication..."
          />
          {state.fieldErrors?.message && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Processing...' : 'Donate Now'}
        </button>

        {state.status === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">{state.message}</p>
          </div>
        )}

        {(state.status === 'error' || state.status === 'validation_error') && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{state.message}</p>
          </div>
        )}
      </form>
    </div>
  );
};