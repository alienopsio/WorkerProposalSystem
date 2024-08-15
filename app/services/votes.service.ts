import { contractApiClient } from "../config/contractApiClient";

const getVotes = async (planetName: string) => {
  return contractApiClient.v1.chain.get_table_rows({
    code: "prop.worlds",
    scope: planetName,
    table: "propvotes",
    json: true,
    limit: 1000,
  });
};

export { getVotes };
