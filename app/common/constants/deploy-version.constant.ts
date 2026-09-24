// Footer stamp: V. YYYYMMDD.N
// Same calendar day as last dest/prod ship → bump N.
// New calendar day → set DEPLOY_DATE to that day and N to 1.
export const DEPLOY_DATE = "20260924";
export const DEPLOY_SEQ = 1;
export const DEPLOY_VERSION = `V. ${DEPLOY_DATE}.${DEPLOY_SEQ}`;
