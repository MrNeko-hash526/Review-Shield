// Frontend connectivity test script for Review Shield
// This script tests the backend connection from the frontend

const BACKEND_URL = 'http://localhost:5000';

async function testBackendConnection() {
    console.log('🔍 Testing Review Shield Backend Connection...');
    console.log('================================================');
    
    try {
        // Test 1: Health Check
        console.log('1. Testing health endpoint...');
        const healthResponse = await fetch(`${BACKEND_URL}/health`);
        
        if (healthResponse.ok) {
            const healthData = await healthResponse.json();
            console.log('✅ Health check passed:', healthData);
        } else {
            console.log('❌ Health check failed:', healthResponse.status);
        }
        
        // Test 2: API Endpoint
        console.log('2. Testing API endpoint...');
        const apiResponse = await fetch(`${BACKEND_URL}/api/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: 'https://www.flipkart.com/test-product'
            })
        });
        
        if (apiResponse.ok) {
            const apiData = await apiResponse.json();
            console.log('✅ API endpoint accessible:', apiData);
        } else {
            console.log('❌ API endpoint error:', apiResponse.status);
        }
        
    } catch (error) {
        console.log('❌ Connection failed:', error.message);
        console.log('');
        console.log('💡 Troubleshooting steps:');
        console.log('1. Make sure the backend server is running');
        console.log('2. Check if Flask is installed: pip install flask');
        console.log('3. Start the backend: python app.py');
        console.log('4. Verify the server is listening on port 5000');
    }
}

// Run the test
testBackendConnection();
