import { propWorldsContract } from "../common/constants/token.constant";
import { contractApiClient } from "../config/contractApiClient";

const getArbiters = async (planetName: string) => {
  
  return contractApiClient.v1.chain.get_table_rows({
    code: propWorldsContract,
    scope: planetName,
    table: "arbwhitelist",
    json: true,
    limit: 1000,
  });
};

export { getArbiters };
