export default () => ({
  databaseUrl: process.env.DATABASE_URL,
  emailValidationKey: process.env.EMAIL_VALIDATION_KEY,
  emailValidationUrl: process.env.EMAIL_VALIDATION_URL,
});
