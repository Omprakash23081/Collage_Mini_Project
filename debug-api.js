async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/pyq');
        const data = await response.json();
        console.log("PYQ Data Structure (First Item):");
        if (Array.isArray(data) && data.length > 0) {
            console.log(JSON.stringify(data[0], null, 2));
        } else if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
            console.log(JSON.stringify(data.data[0], null, 2));
        } else {
            console.log("No data found or unexpected structure:", data);
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

fetchData();
