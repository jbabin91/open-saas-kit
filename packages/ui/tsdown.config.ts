import { tailwindPlugin } from '@bosh-code/tsdown-plugin-tailwindcss';
import { defineConfig } from 'tsdown';

export default defineConfig({
  attw: {
    // Ignore no-resolution for CSS files, CJS failures since we're ESM-only
    ignoreRules: ['no-resolution'],
    profile: 'esm-only',
  },
  dts: true,
  entry: [
    './src/index.ts',
    './src/components/ui/*/index.ts',
    './src/lib/utils.ts',
    './src/styles/theme.css',
    '!**/*.stories.{ts,tsx}',
  ],
  exports: {
    customExports(pkg) {
      const newExports: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(pkg)) {
        // Skip package.json export
        if (key === './package.json') {
          newExports[key] = value;
          continue;
        }

        // Handle CSS file
        if (key === './styles/theme') {
          newExports['./theme.css'] = './dist/styles/theme.css';
          continue;
        }

        // Shorten component paths: ./components/ui/button -> ./button
        const shortKey = key.replace('./components/ui/', './');

        // Rename ./lib/utils -> ./utils
        const finalKey = shortKey.replace('./lib/', './');

        // Add types condition for JS files
        if (typeof value === 'string' && value.endsWith('.js')) {
          const dtsPath = value.replace('.js', '.d.ts');
          newExports[finalKey] = {
            types: dtsPath,
            import: value,
          };
        } else {
          newExports[finalKey] = value;
        }
      }

      return newExports;
    },
  },
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    // Peer dependencies that consumers will provide
    'react-aria-components',
    'recharts',
    'sonner',
    'vaul',
    'next-themes',
  ],
  format: ['esm'],
  minify: process.env.NODE_ENV === 'production',
  outDir: 'dist',
  platform: 'browser',
  plugins: [tailwindPlugin()],
  publint: true,
  sourcemap: true,
  target: 'es2023',
});
