import dayjs from "dayjs";

export const useFunFacts = () => {
  // TODO: take this from database
  const FIRST_JOB = "2004-07-01";
  const FIRST_FULL_TIME_JOB = "2005-08-01";
  const FIRST_COFFEE = "2010-03-01";

  function calculateWorkingHours() {
    // 1. start of the first full time job
    const diffMonths = dayjs().diff(
      dayjs(FIRST_FULL_TIME_JOB),
      "months",
      false,
    );
    // 2. assume working hours per month at around 140
    const workingHours = diffMonths * 140;
    // 3. format number
    return new Intl.NumberFormat("en-US").format(workingHours);
  }

  function calculateCoffeeConsumed() {
    // 1. determine the date when I've started regularly drinking coffee
    // 2. count days from that day
    const diffDays = dayjs().diff(dayjs(FIRST_COFFEE), "days", false);
    // 3. multiply by approx 1.5 coffees per day 🤪
    const consumedCoffees = Math.ceil(diffDays * 1.5);
    // 4. format number
    return new Intl.NumberFormat("en-US").format(consumedCoffees);
  }

  function calculateYearsOfExperience() {
    return dayjs().diff(dayjs(FIRST_JOB), "years", false);
  }

  return {
    workingHours: calculateWorkingHours(),
    coffeeConsumed: calculateCoffeeConsumed(),
    yearsOfExperience: calculateYearsOfExperience(),
    // TODO: fetch that
    gitHubRepos: 41,
  };
};
