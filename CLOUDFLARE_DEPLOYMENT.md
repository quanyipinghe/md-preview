# Cloudflare Pages Configuration

This project is configured for automatic deployment on Cloudflare Pages.

## Build Settings

When setting up your Cloudflare Pages project, use these settings:

### Framework preset
- **Framework**: `Vite`

### Build configuration
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty or use `/`)

### Environment variables
- **Node version**: `20` or higher (add environment variable: `NODE_VERSION=20`)

## Manual Setup Instructions

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
2. Click "Create a project"
3. Connect your GitHub repository
4. Configure build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Add environment variable (if needed):
   - `NODE_VERSION` = `20`
6. Click "Save and Deploy"

## Local Testing

Before deploying, you can test the build locally:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Preview the build
npm run preview
```

## Troubleshooting

If deployment fails:

1. **Check Node version**: Ensure Cloudflare Pages is using Node 18 or higher
   - Add environment variable: `NODE_VERSION=20`

2. **Check build logs**: Look for TypeScript or build errors in the Cloudflare Pages dashboard

3. **Test locally**: Run `npm run build` locally to catch any build errors before deploying

4. **Clear build cache**: In Cloudflare Pages settings, try "Retry deployment" with cache cleared
