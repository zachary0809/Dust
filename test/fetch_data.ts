async function fetchLargeText(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = '';
  
      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        
        result += decoder.decode(value, { stream: true });
        // 可选：分块处理逻辑（如实时解析或存储）
        console.log("Received chunk:", result.length);
      }
      console.log("完整数据长度:", result.length);
    } catch (error) {
      console.error("请求失败:", error);
    }
  }
  
  // 调用示例
  fetchLargeText("https://api.coingecko.com/api/v3/coins/list?include_platform=true");