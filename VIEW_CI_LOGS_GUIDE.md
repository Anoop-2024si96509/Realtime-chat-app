# How to View GitHub Actions Error Logs

## ?? Quick Access to Your Error Logs

### **Direct Link to Latest Workflow**
```
https://github.com/Anoop-2024si96509/Realtime-chat-app/actions
```

---

## ?? Step-by-Step: View Error Details

### **1. Open Actions Tab**

Click here or manually navigate:
```
GitHub Repository ? Actions Tab
```

### **2. Find the Failed Run**

Look for:
- ? Red X icon
- Commit message: "Fix: Update build script to actually build client for CI workflow"
- Time: Around 09:42 UTC (today)

### **3. View Job Details**

Click on the failed workflow run, then you'll see:

```
Backend Tests (18.x)     ? or ?
Backend Tests (20.x)     ? or ?
Frontend Tests (18.x)    ? or ?
Frontend Tests (20.x)    ? or ?
Build Check              ? (Most likely to fail)
Lint Summary             ? or ??
```

### **4. Expand Failed Step**

Click the failed job ? Find the red step ? Click to expand

---

## ?? Common Error Patterns & Solutions

### **Error 1: "missing script: build"**

**Log shows:**
```
npm ERR! missing script: build
```

**Solution:**
? Already fixed! Your latest commit updated the build script.

---

### **Error 2: "client/build directory not found"**

**Log shows:**
```
? Build failed - client/build directory not found
```

**Cause:** Build didn't run or failed

**Check:**
- Is the build script correct? ? Yes (just fixed)
- Did dependencies install? Check "Install dependencies" step
- Any React errors? Check build output

---

### **Error 3: "npm ci" fails**

**Log shows:**
```
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /home/runner/work/Realtime-chat-app/package-lock.json
```

**Solution:** Ensure `package-lock.json` exists and is committed

**Verify:**
```powershell
git ls-files package-lock.json
git ls-files client/package-lock.json
```

---

### **Error 4: Build out of memory**

**Log shows:**
```
FATAL ERROR: Ineffective mark-compacts near heap limit
```

**Solution:** Add to workflow:
```yaml
- name: Build frontend
  run: |
    cd client
    NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

## ??? **View Logs Using GitHub CLI** (If Installed)

### **Install GitHub CLI:**
```powershell
# Windows (using winget)
winget install --id GitHub.cli

# Or download from: https://cli.github.com/
```

### **View Latest Run:**
```powershell
# List recent runs
gh run list --repo Anoop-2024si96509/Realtime-chat-app

# View specific run
gh run view <run-id> --repo Anoop-2024si96509/Realtime-chat-app

# View logs of failed jobs
gh run view <run-id> --log-failed --repo Anoop-2024si96509/Realtime-chat-app
```

---

## ?? **View on Mobile**

1. Install GitHub mobile app
2. Navigate to your repository
3. Tap "Actions" tab
4. Tap the failed run
5. View logs on phone

---

## ?? **Monitor Real-Time**

### **Watch Current Run:**

1. Go to Actions tab
2. Click on the in-progress run (?? yellow dot)
3. Click on a job to watch it live
4. Logs stream in real-time

---

## ?? **Quick Checklist for Debugging**

When a CI job fails:

- [ ] Go to Actions tab on GitHub
- [ ] Click the failed run (red ?)
- [ ] Note which job failed
- [ ] Expand the failed step
- [ ] Read the error message (usually in red)
- [ ] Check if it's one of the common errors above
- [ ] Apply the fix
- [ ] Commit and push
- [ ] Watch new run

---

## ?? **Your Specific Error**

Based on the log timestamp `2026-01-28T09_42_26_157Z`, this was from:

**Workflow:** CI - Tests and Lint
**Triggered by:** Push to main branch
**Commit:** One of your recent fixes

**Most Likely Failed Step:**
```
Build Check ? Build frontend
```

**Reason:**
The previous build script was a placeholder. Your latest fix should resolve this!

---

## ? **Expected Outcome After Your Fix**

After your latest commit (`f81c8c9`), the CI should:

1. ? Install dependencies successfully
2. ? Run tests (6 tests pass)
3. ? Build client (React app compiles)
4. ? Verify build directory exists
5. ? Complete successfully

**Check here:**
```
https://github.com/Anoop-2024si96509/Realtime-chat-app/actions
```

---

## ?? **Get Email Notifications**

To receive error logs via email:

1. Go to GitHub Settings ? Notifications
2. Enable "Actions" notifications
3. Choose "Only failures"
4. Get email with error summary

---

## ?? **Visual Guide**

```
GitHub.com
    ?
Your Repository
    ?
Actions Tab ? Click here
    ?
Failed Run (?)
    ?
Click "Build Check" job
    ?
Expand red step
    ?
Read error logs
    ?
Fix and push
    ?
Watch new run ?
```

---

## ?? **Your Current Status**

| Item | Status |
|------|--------|
| Latest Commit | ? Pushed (f81c8c9) |
| Build Script | ? Fixed |
| CI Triggered | ? Should be running |
| Expected Result | ? Should pass now |

**Check your latest run:**
```
https://github.com/Anoop-2024si96509/Realtime-chat-app/actions
```

The new run should show a green checkmark ? this time!

---

**Note:** The npm debug log on the runner is temporary and gets deleted after the run. Always use GitHub's web interface to view logs!
