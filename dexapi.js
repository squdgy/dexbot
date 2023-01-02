// Contains methods for interacting with the off-chain DEX API
const dexApiRoot = 'https://metal-dexdb.global.binfra.one/dex';
const lightApiRoot = 'https://lightapi.eosamsterdam.net/api';

/**
 * Generic GET request to the DEX API
 * @param {string} path - path for data, ex. /v1/markets/all
 * @returns {Promise<object>} - json data
 */
const fetchFromAPI = async (path) => {
  const url = `${dexApiRoot}${path}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson.data;
};

/**
 * Generic GET request to the Proton light API
 * @param {string} path - path for data, ex. fetchFromLightAPI
 * @returns {Promise<object>} - jsoon data
 */
const fetchFromLightAPI = async (path) => {
  const url = `${lightApiRoot}${path}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};

/**
 * Get all available markets
 * @returns {Promise<array>} - list of all markets available on ProtonDEX
 */
export const fetchMarkets = async () => {
  const marketData = await fetchFromAPI('/v1/markets/all');
  return marketData;
};

/**
 * Return an orderbook for the provided market. Use a higher step number for low priced currencie.
 * @param {string} symbol - market symbol
 * @param {number} limit - maximum number of records to return
 * @param {number} step - controls aggregation by price; ex. 0.01, 0.1, 1, 10, 100
 * @returns {Promise<object>} - asks and bids for the market
 */
export const fetchOrderBook = async (symbol, limit = 100, step = 1000) => {
  const orderBook = await fetchFromAPI(`/v1/orders/depth?symbol=${symbol}&limit=${limit}&step=${step}`);
  return orderBook;
};

/**
 * Get all open orders for a given user
 * @param {string} username - name of proton user/account to retrieve orders for
 * @returns  {Promise<array>} - list of all open orders
 */
export const fetchOpenOrders = async (username) => {
  const openOrders = await fetchFromAPI(`/v1/orders/open?limit=100&offset=0&account=${username}`);
  return openOrders;
};

/**
 * Return history of unopened orders for a given user
 * @param {string} username - name of proton user/account to retrieve history for
 * @param {number} limit - maximum number of records to return
 * @param {number} offset - where to start in the list - used for paging
 * @returns {Promise<array>} - returns an array of orders, most recent first
 */
export const fetchOrderHistory = async (username, limit = 100, offset = 0) => {
  const orderHistory = await fetchFromAPI(`/v1/orders/history?limit=${limit}&offset=${offset}&account=${username}`);
  return orderHistory;
};

/**
 *
 * @param {string} username - name of proton user/account to retrieve history for
 * @returns {Promise<array>} - array of balances,
 * ex. {"decimals":"4","contract":"eosio.token","amount":"123.4567","currency":"XPR"}
 */
export const fetchBalances = async (username) => {
  const response = await fetchFromLightAPI(`/balances/proton/${username}`);
  return response.balances;
};