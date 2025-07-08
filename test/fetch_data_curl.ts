import https from 'https';
import { createWriteStream } from 'fs';
import { promisify } from 'util';

const sleep = promisify(setTimeout);
const writeFile = promisify(require('fs').writeFile);

async function fetchWithHttp(url: string, outputFile: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const fileStream = createWriteStream(outputFile);
    
    https.get(url, { headers: { 'User-Agent': 'CoinDataFetcher/1.0' } }, (response) => {
      // 检查状态码
      if (response.statusCode !== 200) {
        return reject(new Error(`HTTP 错误! 状态码: ${response.statusCode}`));
      }
      
      // 管道传输到文件
      response.pipe(fileStream);
      
      fileStream.on('finish', async () => {
        try {
          // 读取文件内容
          const rawData = require('fs').readFileSync(outputFile, 'utf-8');
          const data = JSON.parse(rawData);
          resolve(data);
        } catch (parseError) {
          reject(parseError);
        }
      });
      
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function robustHttpFetch(
  url: string,
  options: {
    outputFile?: string;
    retries?: number;
    timeout?: number;
  } = {}
): Promise<any> {
  const {
    outputFile = 'http-data.json',
    retries = 3,
    timeout = 120000
  } = options;
  
  let lastError: any = null;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[尝试 ${attempt}/${retries}] 开始 HTTP 下载...`);
      
      // 设置超时
      const timeoutController = new AbortController();
      const timeoutId = setTimeout(() => {
        timeoutController.abort();
        lastError = new Error(`HTTP 请求超时 (${timeout}ms)`);
      }, timeout);
      
      // 执行请求
      const data = await fetchWithHttp(url, outputFile);
      
      // 清除超时
      clearTimeout(timeoutId);
      
      console.log(`[尝试 ${attempt}/${retries}] 成功获取数据`);
      return data;
    } catch (error) {
      lastError = error;
      console.error(`[尝试 ${attempt}/${retries}] 请求失败:`, error);
      
      if (attempt < retries) {
        const waitTime = Math.pow(2, attempt) * 1000;
        console.log(`等待 ${waitTime}ms 后重试...`);
        await sleep(waitTime);
      }
    }
  }
  
  throw new Error(`所有 ${retries} 次尝试均失败: ${lastError.message}`);
}

// 使用示例
async function getCoinData() {
  try {
    const data = await robustHttpFetch(
      'https://api.coingecko.com/api/v3/coins/list?include_platform=true',
      {
        outputFile: 'coin_data.json',
        retries: 5,
        timeout: 180000 // 3分钟超时
      }
    );
    
    console.log(`成功获取 ${data.length} 个代币数据`);
    return data;
  } catch (error) {
    console.error('最终失败:', error);
    return [];
  }
}

getCoinData().then(console.log).catch(console.error);