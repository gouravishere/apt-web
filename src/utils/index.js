export function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', options);
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

  return `${formattedDate} • ${formattedTime}`;
}

export const formatIndianCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN").format(amount);
};

export const formatIndianCurrencyZero = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};