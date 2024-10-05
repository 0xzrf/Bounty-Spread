import CreateSignature from "./CreateSignature";

const MercuryoWidget = async (publicKey: string) => {
    
    const secret = 'secret';
    const baseUrl = 'https://exchange.mercuryo.io/';

    const signatureInput = `${publicKey}${secret}`;
    const signature = await CreateSignature(signatureInput);

    const params = {
      widget_id: 'a8c1dead-ed5f-4740-b9ce-c4ea7721c93b',
      type: 'buy',
      address: publicKey,
      network: 'SOLANA', 
      currency: 'SOL',
      signature: signature,
      fiatAmount: '300',
      fiatCurreny: 'USD',
    };

    const queryString = new URLSearchParams(params).toString();

    const finalUrl = `${baseUrl}?${queryString}&theme=haru_dark`;
    return finalUrl;
  };

  export default MercuryoWidget;


