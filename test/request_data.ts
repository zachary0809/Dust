import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

async function axios_get(url: string) {
    try {
        const proxyUrl = 'http://127.0.0.1:7890';
        const httpsAgent = new HttpsProxyAgent(proxyUrl);
        
        const response = await axios.get(url, {
            httpsAgent,
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive'
            },
            timeout: 30000
        });
        
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data).substring(0, 200) + '...');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            }
        } else {
            console.error('Error:', error);
        }
        throw error;
    }
}

// Test the request
axios_get("https://api.coingecko.com/api/v3/coins/list?include_platform=true")
    .catch(error => console.error('Request failed:', error));

async function createProxyRequest(url: string) {
    try {
        const proxyUrl = `https://127.0.0.1:7890`;
        const agent = new HttpsProxyAgent(proxyUrl);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                "Content-Type": 'application/json; charset=utf-8',
                'Content-Encoding': 'gzip,deflate,br',
                "Accept":'*/*',
                "Connection":'keep-alive'
                // 'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                // 'access-control-allow-methods': 'POST, PUT, DELETE, GET, OPTIONS',
                // 'access-control-allow-origin': '*',
                // 'access-control-expose-headers':'link, per-page, total',
                // 'access-control-request-method':'*'
            },
            // @ts-ignore - agent is valid but not in RequestInit type
            agent,
            // timeout: 60000 // 30 second timeout
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        console.log('Response received:', data.substring(0, 200) + '...'); // Log first 200 chars
        return data;
    } catch (error) {
        console.error('Proxy request failed:', error);
        throw error;
    }
}

// Test the request
// createProxyRequest("https://api.coingecko.com/api/v3/coins/list?include_platform=true")
//     .catch(error => console.error('Request failed:', error));

  