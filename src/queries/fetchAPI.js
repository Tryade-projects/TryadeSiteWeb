import fetchData from '../utils/fetchData';
const PAGE_SIZE_RULES = 1;

const fetchRulesSections = async ({ pageParam = 0 }) => {
  const data = await fetchData('/mockedData/rules.json');
  if (data) {
    const sectionIndex = pageParam * PAGE_SIZE_RULES;
    return data.slice(sectionIndex, sectionIndex + PAGE_SIZE_RULES);
  }
};

const fetchRules = async () => {
  const data = await fetchData('/mockedData/rules.json');
  return data;
};

const fetchUpdates = async () => {
  const data = await fetchData('/mockedData/updates.json');
  return data;
};

export { fetchRulesSections, fetchRules, fetchUpdates };
