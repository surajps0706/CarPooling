import { format, parseISO } from 'date-fns';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateString: string, formatStr: string = 'dd MMM yyyy'): string {
  try {
    return format(parseISO(dateString), formatStr);
  } catch {
    return dateString;
  }
}

export function getStatusBadgeVariant(status: string): {
  bg: string;
  text: string;
  label: string;
} {
  switch (status) {
    case 'CONFIRMED':
      return { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', label: 'Confirmed' };
    case 'ACCEPTED':
      return { bg: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-700', label: 'Partner Assigned' };
    case 'ON_THE_WAY':
      return { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', label: 'On The Way' };
    case 'ARRIVED':
      return { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700', label: 'Arrived at Location' };
    case 'IN_PROGRESS':
      return { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-800', label: 'Service In Progress' };
    case 'QUALITY_CHECK':
      return { bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700', label: 'Quality Check' };
    case 'COMPLETED':
      return { bg: 'bg-green-50 border-green-200', text: 'text-green-700', label: 'Completed' };
    case 'CANCELLED_BY_CUSTOMER':
    case 'CANCELLED_BY_ADMIN':
    case 'CANCELLED_BY_SYSTEM':
      return { bg: 'bg-red-50 border-red-200', text: 'text-red-700', label: 'Cancelled' };
    default:
      return { bg: 'bg-gray-50 border-gray-200', text: 'text-gray-700', label: status };
  }
}
