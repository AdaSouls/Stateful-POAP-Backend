const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid(
        "production",
        "dev",
        "development",
        "local",
        "staging",
        "beta",
        "test"
      )
      .required(),
    PORT: Joi.number().default(5000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  db: {
    migrations: envVars.DB_MIGRATION || "pending",
    sync: envVars.DB_SYNC || "none",
  },
  errorHandling: {
    alwaysStackTrace: envVars.ERROR_ALWAYS_STACK_TRACE == 1,
  },
  bugsnag: envVars.BUGSNAG_KEY,
  appState: {
    down: envVars.APP_STATE != 1,
    downMsg: envVars.APP_DOWN_MESSAGE,
    whitelist: (envVars.APP_DOWN_IP_WHITELIST || "").split(","),
  },
  postgresql: {
    user: envVars.POSTGRESQL_USER,
    host: envVars.POSTGRESQL_HOST,
    database: envVars.POSTGRESQL_DB_NAME,
    password: envVars.POSTGRESQL_PASSWORD,
    port: envVars.POSTGRESQL_PORT,
    schema: envVars.POSTGRESQL_SCHEMA,
    url: envVars.POSTGRESQL_URL,
  },
  functionCodes: {
    master: envVars.CODE_MASTER,
  },
  logging: {
    slack: {
      webhook: envVars.SLACK_WEBHOOK_URL,
    },
  },
  logger: {
    file: envVars.LOG_FILE,
  },
  walletContentMethod: envVars.WALLET_CONTENT_METHOD,
  walletContentErc20: envVars.WALLET_CONTENT_ERC20 == 1,
  graphqlEndpoint: envVars.GRAPHQL_ENDPOINT,
  web3: {
    chain: envVars.CHAIN,
    networkRpcUrl: envVars.NETWORK_RPC_URL,
    mintManagerAddress: envVars.MINT_MANAGER_SMART_CONTRACT,
    alchemy: {
      apiKey: envVars.ALCHEMY_API_KEY,
      maxContractsPerCall: parseInt(envVars.ALCHEMY_MAX_CONTRACTS_PER_CALL),
    },
  },
  redis: {
    // we favour TLS connections - sometimes the Heroku addon only
    // sets REDIS_URL, but it's the rediss:// tls endpoint?!??
    endpoint: envVars.REDIS_TLS_URL || envVars.REDIS_URL,
    source: envVars.REDIS_SOURCE,
    ttl: envVars.REDIS_TTL,
  },
  tmAnalyticsApi: {
    baseUrl: envVars.TM_ANALYTICS_API_BASE_URL,
    functionCodes: {
      master: envVars.TM_ANALYTICS_API_CODE_MASTER,
    },
  },
  tmGamingApi: {
    baseUrl: envVars.TM_GAMING_API_BASE_URL,
    functionCodes: {
      master: envVars.TM_GAMING_API_CODE_MASTER,
    },
  },
  cacheTimeToLive: envVars.CACHE_TTL,
};
