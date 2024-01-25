export default class CurrencyapiService {

    _apiBase = 'https://v6.exchangerate-api.com/v6';
    _apiKey='ab3794320d091bbe1272c07c';
    getResource = async (url) => {
      const res = await fetch(`${this._apiBase}/${this._apiKey}${url}`);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
          `, received ${res.status}`)
      }
      return await res.json();
    };
  
    getAllCurrencyByBase = async (base) => {
      const curr = await this.getResource(`/latest/${base}`);
      return curr.conversion_rates
    };

    getCurrencyPair = async (base, to) => {
        const allCurr = await this.getAllCurrencyByBase(base);
        return allCurr[to]
    };
  }
  