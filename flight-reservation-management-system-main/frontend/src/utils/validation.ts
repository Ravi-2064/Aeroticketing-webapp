export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters long';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters long';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) return null; // Phone is optional
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (!phoneRegex.test(phone)) return 'Invalid phone number format';
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value) return `${fieldName} is required`;
  return null;
};

export const validateDate = (date: Date | null): string | null => {
  if (!date) return 'Date is required';
  if (date < new Date()) return 'Date cannot be in the past';
  return null;
};

export const validateCity = (city: string): string | null => {
  if (!city) return 'City is required';
  if (city.length < 2) return 'City must be at least 2 characters long';
  return null;
};

export const validateSeatNumber = (seatNumber: string): string | null => {
  if (!seatNumber) return 'Seat number is required';
  const seatRegex = /^[A-Z]\d{1,2}$/;
  if (!seatRegex.test(seatNumber)) return 'Invalid seat number format (e.g., A1, B12)';
  return null;
}; 