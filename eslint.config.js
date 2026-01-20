import baseConfig from '@oakoss/eslint-config/base';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  globalIgnores(['apps/**', 'packages/**']),
  ...baseConfig,
);
