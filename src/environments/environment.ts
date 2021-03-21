// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
