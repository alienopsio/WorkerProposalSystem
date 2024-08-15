import { contractApiClient } from "../config/contractApiClient";

const getProposals = async (planetName: string) => {
  return contractApiClient.v1.chain.get_table_rows({
    code: "prop.worlds",
    scope: planetName,
    table: "proposals",
    json: true,
    limit: 1000,
  });
};

export { getProposals };
