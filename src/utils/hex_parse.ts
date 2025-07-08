export function hexFloatToDecimal(hexString: string, precision: number = 4): number {
    const [intPart, fracPart = ''] = hexString.split('.');
    const integer = parseInt(intPart, 16);
    
    // 小数部分处理
    let fraction = 0;
    for (let i = 0; i < fracPart.length; i++) {
      const digitValue = parseInt(fracPart[i], 16);
      fraction += digitValue * Math.pow(16, -(i + 1));
    }
    
    return parseFloat((integer + fraction).toFixed(precision));
  }