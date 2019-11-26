const fs = require('fs');
const HDWalletProvider = require('truffle-hdwallet-provider');

const secret = JSON.parse(fs.readFileSync("./.secret").toString().trim());

/**
 * @desc load modern provider
 * @param network
 */
const hdwProvider = function(network='mainnet') {
  return new HDWalletProvider(
    secret[network].mnemonic,
    `https://${secret[network].infuranetwork}.infura.io/v3/${secret[network].infurakey}`,
    secret[network].hdwalletid,
    1,
    true,
    "m/44'/60'/0'/0/"
  )
};


module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      gas: 5000000,
      gasPrice: 20000000000  // 20 gwei (in wei) (default: 100 gwei)
    },
    live: {
      provider: hdwProvider('mainnet'),
      network_id: '1',
      gas: 5000000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 3000000000,  // 20 gwei (in wei) (default: 100 gwei)
    },
    rinkeby: {
      provider: hdwProvider('rinkeby'),
      network_id: '4',
      gas: 5000000,
      gasPrice: 20000000000  // 20 gwei (in wei) (default: 100 gwei)
    }

  },

  mocha: {
    useColors: true
  },

  compilers: {
    solc: {
      version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
      docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  }
}
