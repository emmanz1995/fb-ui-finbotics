import type { useState, useEffect } from 'react';
/**
 * @function useAccountTimer
 * A Custom hook to help manage and track the time limit for 
 * accounts before expiry and another account refresh
 * @param object accountProps - An object containing account details such as ownerName and accountId
 * @returns object - An object containing the time left in days, hours, minutes, and seconds
*/
const useAccountTimer = async (accountProps: object): Promise<object> => {
  console.log(accountProps);
  
  // TODO: make a new date instance for the current time
  const currentDate = new Date().getTime();

  const seconds = Math.floor((currentDate % (1000 * 60)) / 1000);
  console.log(seconds);

  const minutes = Math.floor((currentDate % (1000 * 60 * 60)) / (1000 * 60));
  console.log(minutes);

  const hours = Math.floor((currentDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  console.log(hours);

  const formattedCurrentDate = `${hours}:${minutes}:${seconds}`;
  console.log(formattedCurrentDate);
  console.log(currentDate);
  // console.log(currentDateInFormat);
  
  // TODO: use the user agreement time to calculate the expiry time
  const expiryDate = currentDate + 90 * 24 * 60 * 60 * 1000; // 90 days from now
  console.log(new Date(expiryDate).toISOString());

  const timeLeft = expiryDate - currentDate;
  console.log(timeLeft);
  
  // TODO: add timer logic to count down from 3 days to the expiry time
  // TODO: return the time left in days, hours, minutes, seconds
  return {}
};

export default useAccountTimer;