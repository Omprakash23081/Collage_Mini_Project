async function getEvents() {
  try {
    const res = await fetch('http://localhost:3000/api/events');
    const data = await res.json();
    data.data.forEach(e => console.log(`Event: ${e.name} | Image: ${e.image}`));
  } catch(e) {
    console.error(e);
  }
}
getEvents();
