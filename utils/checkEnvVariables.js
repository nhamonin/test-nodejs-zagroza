const requiredEnvVariables = ['PORT', 'JWT_SECRET_KEY', 'PG_CONNECTION_STRING'];

export function testEnvVariables() {
  const missingEnvVariables = requiredEnvVariables.filter(
    (envVariable) => !process.env[envVariable]
  );

  if (missingEnvVariables.length) {
    console.log(
      `Missing environment variables: ${missingEnvVariables.join(', ')}`
    );
    process.exit(1);
  }
}
