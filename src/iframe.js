const Iframe = {
  create() {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    return iframe;
  },

  remove(iframe) {
    document.body.removeChild(iframe);
  },

  captureMessage(iframe, src) {
    return new Promise((resolve, reject) => {
      const handleMessage = (event) => {
        if (event.origin === window.location.origin) {
          return;
        }

        resolve(event.data);

        window.removeEventListener('message', handleMessage);
      };

      window.addEventListener('message', handleMessage);

      iframe.src = src;
    });
  },
};

export default Iframe;
