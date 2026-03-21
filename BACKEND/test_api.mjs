import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

async function testUpdate() {
    try {
        // 1. Login
        const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
            email: 'omprakashkumarglb@gmail.com',
            password: 'password123', // I don't know the password...
            role: 'admin'
        });
        const cookies = loginRes.headers['set-cookie'];
        console.log("Logged in!");
        
        // 2. Upload image
        // Create a dummy image
        fs.writeFileSync('dummy.jpg', 'fake image content here');
        const form = new FormData();
        form.append('name', 'Omprakash');
        form.append('profileImage', fs.createReadStream('dummy.jpg'));

        const patchRes = await axios.patch('http://localhost:3000/api/auth/me', form, {
            headers: {
                ...form.getHeaders(),
                Cookie: cookies.join('; ')
            }
        });
        console.log("Update Success:", patchRes.data.success);
        console.log("Returned User Profile Image:", patchRes.data.data.profileImage);
        
    } catch(e) {
        console.error("Test failed:", e.response ? e.response.data : e.message);
    }
}
testUpdate();
