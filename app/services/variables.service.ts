import { propWorldsContract } from "../common/constants/token.constant";
import { contractApiClient } from "../config/contractApiClient";

const getVariables = async (planetName: string) => {
  return contractApiClient.v1.chain.get_table_rows({
    code: propWorldsContract,
    scope: planetName,
    table: "configs",
    json: true,
    limit: 1,
  });
};

export { getVariables };
