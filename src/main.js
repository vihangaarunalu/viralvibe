async function generateAd() {
    const product = document.getElementById('product').value;
    const tone = document.getElementById('tone').value;
    const platform = document.getElementById('platform').value;
  
    const response = await fetch('http://localhost:3000/generate-ad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, tone, platform }),
    });
  
    const data = await response.json();
    document.getElementById('output').innerHTML = `<p>${data.ad}</p>`;
  }
  