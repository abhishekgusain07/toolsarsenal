// components/ScreenshotTaker.js
'use client';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ScreenshotTaker() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const takeScreenshot = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/screenshot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to capture screenshot');
      }

      // Convert response to blob and create URL
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      // Download the image and store it in the @public folder
    //   const randomName = `screenshot-${Date.now()}.png`;
    //   const link = document.createElement('a');
    //   link.href = imageUrl;
    //   link.download = randomName;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);

      // Display the image on the same page
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.alt = 'Screenshot';
      imgElement.style.maxWidth = '100%';
      const container = document.querySelector('.p-4');
      if (container) {
        container.appendChild(imgElement);
      }

      // Create a download button for the image
      const downloadButton = document.createElement('a');
      downloadButton.href = imageUrl;
      downloadButton.download = randomName;
      downloadButton.textContent = 'Download Image';
      downloadButton.classList.add('block', 'mt-4', 'text-blue-500');
      const container2 = document.querySelector('.p-4');
      if (container2) {
        container2.appendChild(downloadButton);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to capture screenshot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={takeScreenshot}
        disabled={loading || !url}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {loading ? 'Taking Screenshot' : 'Take Screenshot'}
        {loading && <Loader2 className='size-4 animate-spin'/>}
      </button>
    </div>
  );
}