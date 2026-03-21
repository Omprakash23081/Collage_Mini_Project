const axios = require('axios');
axios.get('http://localhost:3000/api/events')
  .then(r => {
    const events = r.data.data;
    events.forEach(e => {
      console.log(`Event: ${e.name} | Image: ${e.image}`);
    });
  }).catch(console.error);
