# Dual Publishing: npm + GitHub Packages

## ?? Overview

Your package is now configured to publish to **TWO** registries simultaneously:
1. **npm** (npmjs.com) - Public npm registry
2. **GitHub Packages** - GitHub's package registry

---

## ?? Where Your Package Will Be Available

### **1. npm Registry**
```
https://www.npmjs.com/package/@anoopgeorgebits/realtime-chat-app
```

**Installation:**
```sh
npm install @anoopgeorgebits/realtime-chat-app
```

### **2. GitHub Packages**
```
https://github.com/Anoop-2024si96509/Realtime-chat-app/packages
```

**Installation:**
```sh
# Configure npm to use GitHub Packages
npm config set @anoop-2024si96509:registry https://npm.pkg.github.com

# Install
npm install @anoop-2024si96509/realtime-chat-app
```

---

## ?? How It Works

When you create a GitHub Release or trigger the workflow:

```
1. Workflow Triggered
   ?
2. Two Jobs Run in Parallel:
   ??? Job 1: Publish to npm
   ?   ??? Uses NPM_TOKEN secret
   ?
   ??? Job 2: Publish to GitHub Packages
       ??? Uses GITHUB_TOKEN (automatic)
   ?
3. Package Available on Both!
```

---

## ? **What Was Configured**

### **1. Workflow Updated** (`.github/workflows/publish-npm.yml`)

Added two jobs:
- ? `publish-npm` - Publishes to npmjs.com
- ? `publish-github-packages` - Publishes to GitHub Packages

### **2. Package.json Updated**

Added:
```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Anoop-2024si96509/Realtime-chat-app.git"
  },
  "bugs": {
    "url": "https://github.com/Anoop-2024si96509/Realtime-chat-app/issues"
  },
  "homepage": "https://github.com/Anoop-2024si96509/Realtime-chat-app#readme"
}
```

### **3. Permissions Configured**

GitHub Packages job has:
```yaml
permissions:
  contents: read
  packages: write
```

---

## ?? **How to Publish**

### **Option 1: Create GitHub Release**

1. Go to:
```
https://github.com/Anoop-2024si96509/Realtime-chat-app/releases/new
```

2. Fill in:
   - **Tag:** `v0.1.1` (or next version)
   - **Title:** `v0.1.1 - Dual Publishing`
   - **Description:** Release notes

3. Click **"Publish release"**

4. **Both jobs run automatically!**

### **Option 2: Manual Trigger**

1. Go to Actions tab
2. Select "Publish to npm and GitHub Packages"
3. Click "Run workflow"
4. Select branch: `main`
5. Click "Run workflow"

---

## ?? **Publishing Flow**

```
Create Release / Trigger Workflow
         ?
    [Checkout Code]
         ?
    [Install Dependencies]
         ?
    [Run Tests]
         ?
    [Build Client]
         ?
    ?????????????????????????????????????????
    ?                 ?                     ?
[npm Job]    [GitHub Packages Job]    [Both Parallel]
    ?                 ?
npm publish      npm publish
  (npmjs.com)      (GitHub Packages)
    ?                 ?
    ?????????????????????????????????????????
                      ?
         [? Published to Both!]
```

---

## ?? **Authentication**

### **npm Registry**
- **Token:** `NPM_TOKEN` (secret you created)
- **Scope:** `@anoopgeorgebits`
- **Registry:** `https://registry.npmjs.org`

### **GitHub Packages**
- **Token:** `GITHUB_TOKEN` (automatic, no setup needed!)
- **Scope:** `@anoop-2024si96509`
- **Registry:** `https://npm.pkg.github.com`

**No additional secrets needed for GitHub Packages!** ?

---

## ?? **Installing from Each Registry**

### **From npm (Default - Easier)**

```sh
# Install directly (most users will use this)
npm install @anoopgeorgebits/realtime-chat-app
```

### **From GitHub Packages**

```sh
# Step 1: Create .npmrc in your project
echo "@anoop-2024si96509:registry=https://npm.pkg.github.com" >> .npmrc

# Step 2: Authenticate (if private)
# For public packages, this may not be needed
npm login --registry=https://npm.pkg.github.com

# Step 3: Install
npm install @anoop-2024si96509/realtime-chat-app
```

---

## ?? **Why Publish to Both?**

| Feature | npm | GitHub Packages | Winner |
|---------|-----|-----------------|--------|
| **Ease of Use** | ? Very easy | ?? Requires config | npm |
| **Visibility** | ? Public, searchable | ?? Less discoverable | npm |
| **Integration** | ?? Separate from repo | ? Integrated with GitHub | GitHub |
| **CI/CD** | ?? Requires token | ? Automatic token | GitHub |
| **Free Private Packages** | ? Paid | ? Free | GitHub |
| **Bandwidth** | ? Unlimited | ?? Limited | npm |

**Recommendation:** Publish to both!
- npm for public distribution
- GitHub Packages for repository integration

---

## ?? **Package Name Differences**

### **npm Registry**
```json
{
  "name": "@anoopgeorgebits/realtime-chat-app"
}
```

### **GitHub Packages**
```json
{
  "name": "@anoop-2024si96509/realtime-chat-app",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

**The workflow automatically updates the name for GitHub Packages!** ?

---

## ?? **Verify Publication**

### **Check npm**
```sh
npm view @anoopgeorgebits/realtime-chat-app
```

Or visit:
```
https://www.npmjs.com/package/@anoopgeorgebits/realtime-chat-app
```

### **Check GitHub Packages**
```sh
npm view @anoop-2024si96509/realtime-chat-app --registry=https://npm.pkg.github.com
```

Or visit:
```
https://github.com/Anoop-2024si96509/Realtime-chat-app/packages
```

---

## ?? **Important Notes**

### **1. Version Must Match**
Both registries will have the same version (e.g., 0.1.0)

### **2. No Extra Secrets Needed**
- npm uses `NPM_TOKEN`
- GitHub Packages uses built-in `GITHUB_TOKEN` ?

### **3. Parallel Publishing**
Both jobs run at the same time (faster!)

### **4. Independent Failures**
If one fails, the other can still succeed

---

## ?? **Expected Results**

After triggering the workflow:

```
? Package published to npm
   ? https://www.npmjs.com/package/@anoopgeorgebits/realtime-chat-app

? Package published to GitHub Packages
   ? https://github.com/Anoop-2024si96509/Realtime-chat-app/packages

?? Users can install from either registry!
```

---

## ?? **Workflow Jobs**

| Job | Registry | Time | Token |
|-----|----------|------|-------|
| `publish-npm` | npmjs.com | ~5 min | NPM_TOKEN |
| `publish-github-packages` | GitHub Packages | ~5 min | GITHUB_TOKEN |

**Total Time:** ~5 minutes (parallel execution)

---

## ?? **Update Process**

When you release a new version:

```sh
# 1. Update version
npm version patch  # 0.1.0 ? 0.1.1

# 2. Commit
git add package.json
git commit -m "Bump version to 0.1.1"
git push origin main

# 3. Create release on GitHub
# Tag: v0.1.1

# 4. Workflow runs automatically
# ? Published to both registries!
```

---

## ?? **Testing Before Publishing**

Test the workflow without publishing:

```sh
# Dry run for npm
npm publish --dry-run

# Check what files will be included
npm pack
tar -xvzf *.tgz
ls -la package/
```

---

## ?? **Best Practices**

1. ? Always test locally before releasing
2. ? Use semantic versioning (0.1.0 ? 0.1.1)
3. ? Write meaningful release notes
4. ? Tag releases properly (v0.1.1)
5. ? Monitor both registries after publishing

---

## ?? **Documentation Links**

- **npm Registry:** https://docs.npmjs.com/
- **GitHub Packages:** https://docs.github.com/en/packages
- **Publishing Workflow:** `.github/workflows/publish-npm.yml`

---

## ? **Quick Reference**

```sh
# Check if published on npm
npm view @anoopgeorgebits/realtime-chat-app

# Check if published on GitHub Packages
npm view @anoop-2024si96509/realtime-chat-app \
  --registry=https://npm.pkg.github.com

# Install from npm (default)
npm install @anoopgeorgebits/realtime-chat-app

# Install from GitHub Packages
npm install @anoop-2024si96509/realtime-chat-app \
  --registry=https://npm.pkg.github.com
```

---

## ?? **You're All Set!**

Your package will now be published to **both npm AND GitHub Packages** automatically when you:
- Create a GitHub Release
- Trigger the workflow manually

**No additional setup or secrets needed!** ?

Users can choose which registry to install from based on their preference! ????
