const splitString = (str, splitSymbol) => str.split(splitSymbol);

const getQueryParams = (url) => {
  const splittedUrl = splitString(url, "?");
  const [baseUrl, queryParams] = splittedUrl;

  return { baseUrl, queryParams };
};

const getProperValue = (input) => {
  const isValueABoolean = input === "true" || input === "false";

  if (isValueABoolean) return input === "true";

  const isValueANumber = isNaN(Number(input)) === false;

  if (isValueANumber) return Number(input);

  return input;
};

function paramsToObject(queryParams) {
  const result = {};
  const urlParams = new URLSearchParams(queryParams);

  for (const [key, value] of urlParams) {
    result[key] = getProperValue(value);
  }

  return result;
}

const getHash = (format, instance) => {
  const values = splitString(format, "/");
  const { baseUrl, queryParams } = getQueryParams(instance);
  const instanceValues = splitString(baseUrl, "/");

  const hash = values.reduce((acc, curr, index) => {
    const isValueADynamicValue = curr.includes(":");
    if (isValueADynamicValue) {
      const normalisedValue = curr.replace(":", "");
      const param = instanceValues[index];
      acc[normalisedValue] = getProperValue(param);
    }
    return acc;
  }, {});

  if (queryParams) {
    const queryParamsObj = paramsToObject(queryParams);
    return { ...hash, ...queryParamsObj };
  }

  return hash;
};

export default getHash;
