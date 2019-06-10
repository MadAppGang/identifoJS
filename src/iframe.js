const Iframe = {
  create() {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    return iframe;
  },

  remove(iframe) {
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 0);
  },

  captureMessage(iframe, src) {
    return new Promise((resolve) => {
      const handleMessage = (event) => {
        if (event.origin === window.location.origin) {
          return;
        }

        resolve(event.data);

        window.removeEventListener('message', handleMessage);
      };

      window.addEventListener('message', handleMessage, false);

      iframe.src = src;
    });
  },
};

export default Iframe;
