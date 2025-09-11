/**
 * Extracts the account number and sort code from a 14-digit scan code.
 * @param scan - The 14-digit scan code.
 * @returns {object} An object containing the account number and sort code.
 * @throws {Error} If the scan code is not exactly 14 digits long.
 */
export const extractAccountNumber = (
  scan: string
): { accountNumber: string; sortCode: string } => {
  console.log(scan);
  console.log(scan?.length);

  // if (!(/^\d{14}$/.test(scan))) {
  //   throw new Error('scan code has to be 14 digits long');
  // }
  const sortCodeRaw = scan?.slice(0, 6);
  const accountNumber = scan?.slice(6, 14);

  const sortCode = `${sortCodeRaw?.slice(0, 2)}-${sortCodeRaw?.slice(2, 4)}-${sortCodeRaw?.slice(4, 6)}`;

  return {
    accountNumber,
    sortCode,
  };
};
