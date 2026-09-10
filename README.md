# Git Lab Exercise

## 1. Local Git Configuration

```bash
# Set user name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default editor
git config --global core.editor "code --wait"

# Verify configuration
git config --list
```

## 2. Initialize Repository

```bash
# Create and initialize a new repository
mkdir my-project
cd my-project
git init

# Clone an existing repository
git clone https://github.com/user/repo.git
```

## 3. Basic Workflow

```bash
# Check status
git status

# Add files to staging
git add filename.txt
git add .  # Add all files

# Commit changes
git commit -m "Initial commit: Add README"

# View commit history
git log --oneline
```

## 4. Branching Strategies

### Feature Branch Workflow
```bash
# Create and switch to a new branch
git checkout -b feature/login

# List branches
git branch

# Switch branches
git checkout main

# Delete branch
git branch -d feature/login
```

### Gitflow Strategy
```
main (production)
  |
develop (integration)
  |
feature branches
  |
release branches
  |
hotfix branches
```

## 5. Merging

```bash
# Merge a branch into current branch
git checkout main
git merge feature/login

# Merge with commit message
git merge feature/login -m "Merge feature/login into main"
```

## 6. Resolving Conflicts

```bash
# When conflict occurs, Git marks the file:
<<<<<<< HEAD
Current branch changes
=======
Incoming branch changes
>>>>>>> feature/branch

# Steps to resolve:
# 1. Edit the file to resolve conflicts
# 2. Remove conflict markers
# 3. Stage the resolved file
git add filename.txt
# 4. Complete the merge
git commit
```

## 7. Pull Requests (GitHub/GitLab)

```bash
# Push branch to remote
git push origin feature/login

# Create pull request on GitHub/GitLab:
# 1. Go to repository
# 2. Click "New Pull Request"
# 3. Select base and compare branches
# 4. Add title and description
# 5. Request review
# 6. Merge after approval
```

## 8. Remote Operations

```bash
# Add remote
git remote add origin https://github.com/user/repo.git

# Push to remote
git push origin main

# Pull from remote
git pull origin main

# Fetch remote changes
git fetch origin
```

## 10. Pull Request Workflow (GitHub CLI)

```bash
# Create the repo and push
gh repo create git-lab-exercise --source . --push

# Open a pull request
gh pr create --base master --title "Feature" --body "Description"

# Review a pull request
gh pr review --approve

# Merge a pull request
gh pr merge --merge
```