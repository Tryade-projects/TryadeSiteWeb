import fetchData from '../utils/fetchData';
const PAGE_SIZE_RULES = 1;

const fetchRulesSectionsPage = async ({ pageParam = 0 }) => {
  const data = await fetchData('http://localhost:5000/rulesSections');
  if (data) {
    const sectionIndex = pageParam * PAGE_SIZE_RULES;
    return data.slice(sectionIndex, sectionIndex + PAGE_SIZE_RULES);
  }
};

const fetchRulesSections = async () => {
  const data = await fetchData('http://localhost:5000/rulesSections');
  return data;
};

async function fetchUpdatesSections() {
  const data = await fetchData('http://localhost:5000/updatesSections');
  return data;
}

async function fetchStreamersSections() {
  const data = await fetchData('http://localhost:5000/streamersSections');
  return data;
}

export {
  fetchRulesSectionsPage,
  fetchRulesSections,
  fetchUpdatesSections,
  fetchStreamersSections,
};
