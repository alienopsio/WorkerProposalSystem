import {
  mainTokenContract,
  testTokenContract,
} from "../common/constants/token.constant";
import { contractApiClient } from "../config/contractApiClient";

const getBalances = async (planetName: string, accountName: string) => {
  const isTestaPlanet = planetName === "testa";
  const tokenAccount = isTestaPlanet ? testTokenContract : mainTokenContract;

  return contractApiClient.v1.chain.get_table_rows({
    code: tokenAccount,
    scope: accountName,
    table: "accounts",
    json: true,
    limit: 1000,
  });
};

export { getBalances };
