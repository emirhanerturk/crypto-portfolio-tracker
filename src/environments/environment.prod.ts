export const environment = {
  production: true,
  /**
   * IMPORTANT!
   * Defining your API key here creates a security risk.
   * In a project that you will publish in a public, you must make these requests on the backend side.
   */
  coinMarketCap: {
    host: 'https://pro-api.coinmarketcap.com',
    version: 'v1',
    apiKey: 'XXXX-XXXX-XXXX'
  }
};
