const config = window.w3lib ? window.w3lib.countdownTimer || {} : {};

Object.keys(config).forEach(key => {
  const value = config[key];
  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = value.date.getTime() - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById(
      key
    ).innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    if (distance < 0) {
      clearInterval(interval);
      document.getElementById(key).innerHTML = value.expired;
    }
  }, 1000);
});
