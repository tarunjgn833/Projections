const API_URL = import.meta.env.VITE_API_URL;

const fetchColumns = async () => {
  const response = await fetch(`${API_URL}/all-columns`);
  const data = await response.json();
  return data;
};

const fetchHistogramData = async (column) => {
  const response = await fetch(`${API_URL}/${column}/raw`);
  const data = await response.json();
  return data;
};

export { fetchColumns, fetchHistogramData };
