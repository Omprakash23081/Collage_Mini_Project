const facultyData = [
    { name: "Dr. Alice Smith", department: "cs", designation: "Professor" },
    { name: "Dr. Bob Johnson", department: "math", designation: "Assistant Professor" },
    { name: "Dr. Charlie Lee", department: "physics", designation: "Lecturer" },
    { name: "Dr. Diana Brown", department: "cs", designation: "Assistant Professor" },
];

document.querySelector('.search-button').addEventListener('click', () => {
    const name = document.querySelector('.input-name').value.toLowerCase();
    const department = document.querySelector('.input-department').value;
    const designation = document.querySelector('.input-designation').value;
    const resultsContainer = document.querySelector('.results');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Filter data
    const filteredData = facultyData.filter(faculty => {
        const matchesName = faculty.name.toLowerCase().includes(name);
        const matchesDepartment = department ? faculty.department === department : true;
        const matchesDesignation = designation ? faculty.designation === designation : true;
        return matchesName && matchesDepartment && matchesDesignation;
    });

    // Display results
    if (filteredData.length > 0) {
        filteredData.forEach(faculty => {
            const card = document.createElement('div');
            card.classList.add('faculty-card');
            card.innerHTML = `
                <h3>${faculty.name}</h3>
                <p>Department: ${faculty.department.toUpperCase()}</p>
                <p>Designation: ${faculty.designation}</p>
            `;
            resultsContainer.appendChild(card);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
});
