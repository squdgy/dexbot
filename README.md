# dexbot

This is code for a basic trading bot against the Proton DEX, https://protondex.com/.

## Getting Started

### prerequisites
- a proton account (https://www.proton.org/wallet/)
- enough funds in your account in the markets that you want to trade in

### run the code
1. `npm install`
1. update config in dexrpc.js to use your own username and private key
1. edit the main method in index.js to use the market you would like to trade in
1. `npm run bot`

### coding references
- basics for a simple limit order placement, including signing: https://www.docs.protondex.com/developers-dex/submit-dex-order
- instructions on finding your private key: https://help.proton.org/hc/en-us/articles/4410313687703-How-do-I-backup-my-private-key-in-the-WebAuth-Wallet-
- actions available on the DEX contract: https://www.docs.protondex.com/developers-dex/actions
- general documentation on interacting with proton contracts: https://docs.protonchain.com/built-with-proton.html#sdks

## Actions available in this bot code base

### Markets
- **fetchMarkets** - retrieves all markets that exist on the proton dex
```
    const response = await fetchMarkets();
    logger.info(response);
```
- **fetchOrderBook** - retrieves order book data for a single market
```
    const response = await fetchOrderBook('XBTC_XUSDC', 100, 0.01);
    logger.info(response);
```

### Orders
- **cancelOrder** - cancel a single order
```
    const orderId = 966550;
    cancelOrder(orderId);
```
- **cancelAllOrders** - cancel all orders for a given user one by one (not in bulk)
```
    cancelAllOrders();
```
- **fetchOpenOrders** - retrieve all open orders for a given user
```
    const response = await fetchOpenOrders(username);
    logger.info(response);
```
- **fetchOrderHistory** - retrieves order history for a given user
```
    const response = await fetchOrderHistory('metallicus', 20, 0);
    logger.info(response);
```
- **submitLimitOrder** - submit a buy or sell limit order to the dex in postonly mode (ensure it is a maker trade)
```
    // place an order to sell XPR into USDC
    const quantity = 570;
    const price = 0.002020;
    submitLimitOrder('XPR_XUSDC', ORDERSIDES.SELL, quantity, price);
```

### Accounts
- **fetchBalances** - retrieves all balances for a given user
```    
    const response = await fetchBalances('metallicus');
    logger.info(response);
```