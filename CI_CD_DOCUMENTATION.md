# CI/CD Documentation

## Overview
This project uses GitHub Actions for Continuous Integration and Continuous Deployment. The CI pipeline automatically runs tests and linting checks on every push and pull request.

---

## Workflow Configuration

### Location
`.github/workflows/ci.yml`

### Triggers
- **Push** to `main` and `develop` branches
- **Pull Requests** to `main` and `develop` branches

---

## CI Pipeline Jobs

### 1. Backend Tests (`backend-tests`)
**Purpose:** Run backend unit tests with Jest and Supertest

**Steps:**
- Checkout code
- Setup Node.js (18.x, 20.x)
- Install dependencies
- Run backend linting
- Run backend tests
- Upload coverage to Codecov

**Test Command:**
```bash
npm run test:backend
```

**Coverage:** 74% on authentication routes

---

### 2. Frontend Tests (`frontend-tests`)
**Purpose:** Run frontend React component tests

**Steps:**
- Checkout code
- Setup Node.js (18.x, 20.x)
- Install dependencies
- Run frontend linting
- Run frontend tests
- Upload coverage to Codecov

**Test Command:**
```bash
cd client && npm test -- --watchAll=false --coverage
```

---

### 3. Build Check (`build-check`)
**Purpose:** Verify the React app builds successfully

**Steps:**
- Checkout code
- Setup Node.js 20.x
- Install all dependencies
- Build frontend
- Verify build artifacts

**Build Command:**
```bash
cd client && npm run build
```

**Dependencies:** Runs after `backend-tests` and `frontend-tests` complete

---

### 4. Lint Summary (`lint-summary`)
**Purpose:** Run ESLint checks on all code

**Steps:**
- Checkout code
- Setup Node.js 20.x
- Install dependencies
- Run backend linting
- Run frontend linting

**Lint Commands:**
```bash
# Backend
npm run lint:backend

# Frontend
cd client && npm run lint
```

---

## Node.js Version Matrix

The pipeline tests against multiple Node.js versions:
- **Node.js 18.x** (LTS)
- **Node.js 20.x** (Latest LTS)

This ensures compatibility across different Node.js versions.

---

## Linting Configuration

### Backend ESLint (`.eslintrc.js`)
```javascript
{
  env: node, es2021, jest
  extends: eslint:recommended
  rules: no-console: off, semi: warn, quotes: single
}
```

**Ignored:** `node_modules/`, `client/`, `coverage/`

### Frontend ESLint (`client/.eslintrc.json`)
```json
{
  extends: ["react-app", "react-app/jest"]
}
```

---

## Running Locally

### All Tests
```bash
# Backend tests
npm run test:backend

# Frontend tests
cd client && npm test -- --watchAll=false

# All tests
npm run test:all
```

### Linting
```bash
# Backend lint
npm run lint:backend

# Backend lint with auto-fix
npm run lint:fix

# Frontend lint
cd client && npm run lint

# Frontend lint with auto-fix
cd client && npm run lint:fix
```

### Build Check
```bash
# Build frontend
cd client && npm run build
```

---

## Coverage Reports

### Codecov Integration
Coverage reports are automatically uploaded to Codecov after tests run.

**Flags:**
- `backend` - Backend test coverage
- `frontend` - Frontend test coverage

**Files:**
- Backend: `./coverage/lcov.info`
- Frontend: `./client/coverage/lcov.info`

---

## Status Badges

Add these badges to your README:

```markdown
![CI Status](https://github.com/Anoop-2024si96509/Realtime-chat-app/workflows/CI%20-%20Tests%20and%20Lint/badge.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Coverage](https://codecov.io/gh/Anoop-2024si96509/Realtime-chat-app/branch/main/graph/badge.svg)
```

---

## Workflow Success Criteria

All jobs must pass for the workflow to succeed:

? Backend tests pass (all test cases)
? Frontend tests pass (all test cases)
? Build completes successfully
? Linting passes (warnings allowed, errors fail)

---

## Troubleshooting

### Tests Failing in CI but Passing Locally
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility
- Verify environment variables (use GitHub Secrets)

### Linting Errors
```bash
# Auto-fix linting issues
npm run lint:fix
cd client && npm run lint:fix
```

### Build Failures
- Check for missing environment variables
- Ensure all imports are correct
- Verify build command works locally

---

## GitHub Actions Features Used

- ? **Matrix Strategy** - Test on multiple Node.js versions
- ? **Caching** - Cache npm dependencies for faster builds
- ? **Artifacts** - Upload coverage reports
- ? **Dependencies** - Jobs run in sequence/parallel
- ? **Continue on Error** - Linting warnings don't fail build

---

## Future Enhancements

Potential CI/CD improvements:

- [ ] Add deployment workflow (Heroku/Vercel/Railway)
- [ ] Add security scanning (Snyk/Dependabot)
- [ ] Add code quality checks (SonarCloud)
- [ ] Add performance testing
- [ ] Add E2E testing with Cypress
- [ ] Add Docker image building
- [ ] Add staging environment deployment
- [ ] Add automatic PR labeling

---

## Monitoring

### View Workflow Runs
https://github.com/Anoop-2024si96509/Realtime-chat-app/actions

### Check Status
- Green checkmark ? - All checks passed
- Red X ? - One or more checks failed
- Yellow dot ?? - Workflow in progress

---

## Best Practices

1. **Always run tests locally** before pushing
2. **Fix linting issues** before committing
3. **Keep dependencies updated** for security
4. **Monitor workflow run times** for optimization
5. **Review failed workflows** promptly

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `npm run test:backend` | Run backend tests |
| `npm run test:frontend` | Run frontend tests |
| `npm run test:all` | Run all tests |
| `npm run lint` | Run backend linting |
| `npm run lint:backend` | Run backend linting with fix |
| `npm run lint:fix` | Auto-fix backend lint issues |
| `cd client && npm run lint` | Run frontend linting |
| `cd client && npm run lint:fix` | Auto-fix frontend lint issues |

---

**CI/CD Pipeline:** Fully automated and running on every push! ??
