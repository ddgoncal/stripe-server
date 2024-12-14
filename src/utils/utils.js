export const parseCorsOrigins = () => {
  const corsOriginString = process.env.CORS_ORIGIN;

  if (!corsOriginString) {
    return []; // Return an empty array if the environment variable is not defined
  }

  const origins = corsOriginString
    .split(',')           // Split the string by commas
    .map(origin => origin.trim())  // Trim whitespace from each value
    .filter(origin => origin !== ''); // Remove empty strings that may occur with double commas

  return origins;
}
const corsOrigins = parseCorsOrigins();