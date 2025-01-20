'use client';

export default function OfflinePage() {
  const handleRetry = () => {
    if (navigator.onLine) {
      window.location.href = '/';
    } else {
      alert('You are still offline. Please check your connection.');
    }
  };
  return (
    <div>
      <h1>You are offline</h1>
      <p>Please check your internet connection and try again.</p>
      <button onClick={handleRetry}>Retry</button>
    </div>
  );
}
