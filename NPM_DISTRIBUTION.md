# NPM Package Distribution Guide

## ?? Package Information

**Package Name:** `@anoop-2024si96509/realtime-chat-app`  
**Version:** `0.1.0`  
**License:** MIT  
**Repository:** https://github.com/Anoop-2024si96509/Realtime-chat-app

---

## ?? Publishing to npm

### Prerequisites

1. **npm Account**
   - Create account at https://www.npmjs.com/signup
   - Verify your email address

2. **npm CLI Login**
   ```sh
   npm login
   ```
   Enter your username, password, and email

3. **Verify Login**
   ```sh
   npm whoami
   ```

---

## ?? Pre-Publish Checklist

Before publishing, ensure:

- ? All tests pass: `npm run test:backend`
- ? Linting passes: `npm run lint`
- ? Client builds: `npm run build:client`
- ? Version updated: `npm version <major|minor|patch>`
- ? Git tag created: `git tag v0.1.0`
- ? Changes committed: `git commit -am "Release v0.1.0"`
- ? README.md updated with version info
- ? CHANGELOG.md updated (if exists)

---

## ?? Build Process

The package includes a `prepublishOnly` script that automatically:

1. Runs backend tests
2. Runs ESLint checks
3. Builds the React client

```sh
npm run prepublishOnly
```

This runs automatically when you execute `npm publish`.

---

## ?? Publishing Steps

### Option 1: Standard Publish

```sh
# 1. Ensure everything is committed
git status

# 2. Run tests and build
npm run prepublishOnly

# 3. Publish to npm
npm publish --access public
```

### Option 2: Dry Run (Test First)

```sh
# See what would be published
npm publish --dry-run

# Check package contents
npm pack
tar -xvzf *.tgz
ls -la package/
```

### Option 3: Beta/Alpha Release

```sh
# Publish as beta
npm version 0.1.0-beta.1
npm publish --tag beta --access public

# Publish as alpha
npm version 0.1.0-alpha.1
npm publish --tag alpha --access public
```

---

## ?? Package Contents

The published package includes:

```
@anoop-2024si96509/realtime-chat-app/
??? server/                 # Backend source code
??? client/build/           # Built React application
??? bin/cli.js             # CLI executable
??? LICENSE                # MIT License
??? README.md              # Documentation
??? package.json           # Package metadata
```

### Excluded Files (via .npmignore)

- Source code: `client/src/`, `__tests__/`
- Documentation: `*.md` (except README.md)
- CI/CD configs: `.github/`, workflows
- IDE files: `.vscode/`, `.vs/`
- Environment files: `.env`, `.env.*`
- Test files: `*.test.js`, `*.spec.js`

---

## ?? Package Size Optimization

### Check Package Size

```sh
# See package tarball size
npm pack --dry-run

# Analyze bundle size
npx package-size @anoop-2024si96509/realtime-chat-app
```

### Optimize

1. **Exclude unnecessary files** - Update `.npmignore`
2. **Use `files` field** in `package.json`
3. **Pre-build client** - Include only `client/build/`
4. **Remove dev dependencies** from production bundle

---

## ?? Scoped Package

This package is scoped to `@anoop-2024si96509/`.

**Benefits:**
- Prevents name conflicts
- Groups related packages
- Can be private or public

**Publishing Scoped Packages:**
```sh
npm publish --access public
```

---

## ?? Version Management

### Semantic Versioning

Follow SemVer: `MAJOR.MINOR.PATCH`

```sh
# Patch release (0.1.0 ? 0.1.1)
npm version patch

# Minor release (0.1.0 ? 0.2.0)
npm version minor

# Major release (0.1.0 ? 1.0.0)
npm version major

# Pre-release (0.1.0 ? 0.1.1-beta.0)
npm version prerelease --preid=beta
```

### Version with Git Tag

```sh
# Version bump + git tag + commit
npm version 0.1.0 -m "Release v%s"

# Push tags
git push origin main --tags
```

---

## ?? Update & Republish

### Patch Update

```sh
# 1. Make changes and commit
git add .
git commit -m "Fix: bug description"

# 2. Bump version
npm version patch

# 3. Publish
npm publish --access public

# 4. Push to git
git push origin main --tags
```

### Feature Update

```sh
npm version minor
npm publish --access public
git push origin main --tags
```

---

## ?? Installation for Users

Once published, users can install via:

### npm
```sh
npm install @anoop-2024si96509/realtime-chat-app
```

### yarn
```sh
yarn add @anoop-2024si96509/realtime-chat-app
```

### pnpm
```sh
pnpm add @anoop-2024si96509/realtime-chat-app
```

---

## ??? CLI Usage

After installation, users can run:

```sh
# Global installation
npm install -g @anoop-2024si96509/realtime-chat-app

# Use CLI
realtime-chat start
realtime-chat dev
realtime-chat test
realtime-chat setup
realtime-chat help
```

---

## ?? Package.json Key Fields

### Essential Fields

```json
{
  "name": "@anoop-2024si96509/realtime-chat-app",
  "version": "0.1.0",
  "description": "Production-ready real-time chat with MERN + Socket.io",
  "main": "server/server.js",
  "bin": {
    "realtime-chat": "./bin/cli.js"
  },
  "files": [
    "server/",
    "client/build/",
    "bin/",
    "LICENSE",
    "README.md"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Anoop-2024si96509/Realtime-chat-app.git"
  },
  "keywords": [
    "chat",
    "realtime",
    "socket.io",
    "MERN"
  ]
}
```

---

## ?? Verify Published Package

### Check on npm

```sh
# View package info
npm view @anoop-2024si96509/realtime-chat-app

# View specific version
npm view @anoop-2024si96509/realtime-chat-app@0.1.0

# View all versions
npm view @anoop-2024si96509/realtime-chat-app versions
```

### Test Installation

```sh
# Install in a test directory
mkdir test-install
cd test-install
npm init -y
npm install @anoop-2024si96509/realtime-chat-app
```

---

## ?? Unpublish (Use Carefully!)

### Unpublish Specific Version

```sh
npm unpublish @anoop-2024si96509/realtime-chat-app@0.1.0
```

### Unpublish Entire Package

```sh
npm unpublish @anoop-2024si96509/realtime-chat-app --force
```

**?? Warning:** 
- Can only unpublish within 72 hours
- Cannot republish the same version
- Breaks dependents

---

## ?? Package Statistics

### npm Package Page

After publishing: https://www.npmjs.com/package/@anoop-2024si96509/realtime-chat-app

**Shows:**
- Download stats
- Dependents
- Versions
- GitHub stats
- README preview

---

## ?? Continuous Deployment

### Automate with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm test
      - run: npm run build:client
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

---

## ?? Best Practices

1. ? **Test before publish** - Run all tests
2. ? **Version properly** - Follow SemVer
3. ? **Update docs** - Keep README current
4. ? **Use .npmignore** - Exclude unnecessary files
5. ? **Tag releases** - Create git tags
6. ? **Write CHANGELOG** - Document changes
7. ? **Set peer dependencies** - Avoid version conflicts
8. ? **Test installation** - Install from npm after publishing

---

## ?? Support

### Issues
https://github.com/Anoop-2024si96509/Realtime-chat-app/issues

### npm Support
https://docs.npmjs.com/

---

## ? Quick Publish Checklist

```sh
# 1. Update version
npm version patch

# 2. Build client
npm run build:client

# 3. Test everything
npm run test:all

# 4. Dry run
npm publish --dry-run

# 5. Publish
npm publish --access public

# 6. Push to git
git push origin main --tags

# 7. Create GitHub release
# Visit: https://github.com/Anoop-2024si96509/Realtime-chat-app/releases
```

---

**Ready to publish your package to npm! ??**
