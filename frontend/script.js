// script.js

const urlInput = document.getElementById('urlInput');
const shortenBtn = document.getElementById('shortenBtn');
const shortenedUrlDisplay = document.getElementById('shortenedUrl');

shortenBtn.addEventListener('click', async () => {
  const url = urlInput.value.trim();
  if (!url) {
    alert('Please enter a valid URL.');
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url }) // Send URL in the request body as JSON
    });
    const data = await response.json();
    if (response.ok) {
      shortenedUrlDisplay.textContent = `Shortened URL: http://localhost:8000/${data.shortId}`;
    } else {
      // Display error message if the response is not OK
      console.error('Error:', data.message);
      alert('An error occurred. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});
