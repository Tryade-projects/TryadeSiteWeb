import fetchData from '../utils/fetchData';
const PAGE_SIZE_RULES = 1;

const fetchRulesSectionsPage = async ({ pageParam = 0 }) => {
  const data = await fetchData(
    'https://tryade-site-web-server.vercel.app/rulesSections'
  );
  if (data) {
    const sectionIndex = pageParam * PAGE_SIZE_RULES;
    return data.slice(sectionIndex, sectionIndex + PAGE_SIZE_RULES);
  }
};

const fetchRulesSections = async () => {
  const data = await fetchData(
    'https://tryade-site-web-server.vercel.app/rulesSections'
  );
  return data;
};

const fetchUpdatesSectionsPage = async ({ pageParam = 0 }) => {
  const data = await fetchData(
    `https://tryade-site-web-server.vercel.app/updatesSections?cursor=${pageParam}`
  );
  return data;
};

async function fetchUpdatesSections() {
  const data = await fetchData(
    'https://tryade-site-web-server.vercel.app/updatesSections'
  );
  return data;
}

async function fetchUpdateSection(id) {
  const data = await fetchData(
    `https://tryade-site-web-server.vercel.app/updatesSections/${id}`
  );
  return data;
}

const fetchStreamersSectionsPage = async ({ pageParam = 0 }) => {
  const data = await fetchData(
    `https://tryade-site-web-server.vercel.app/streamersSections?cursor=${pageParam}`
  );
  return data;
};

async function fetchStreamersSections() {
  const data = await fetchData(
    'https://tryade-site-web-server.vercel.app/streamersSections'
  );
  return data;
}

export {
  fetchRulesSectionsPage,
  fetchRulesSections,
  fetchUpdatesSectionsPage,
  fetchUpdatesSections,
  fetchUpdateSection,
  fetchStreamersSectionsPage,
  fetchStreamersSections,
};
