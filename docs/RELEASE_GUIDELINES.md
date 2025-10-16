# GitHub Release Guidelines for AmplifyAI

## 🏷️ Tagging Standards

### Version Naming Convention

It's common practice to prefix your version names with the letter **v**. Some good tag names might be:

- `v1.0.0` - Major release
- `v2.3.4` - Minor/patch release
- `v0.2.0-alpha` - Pre-release version
- `v5.9-beta.3` - Beta release

### Pre-release Versions

If the tag isn't meant for production use, add a pre-release version after the version name:

- `v0.2.0-alpha` - Alpha testing version
- `v5.9-beta.3` - Beta testing version
- `v1.0.0-rc.1` - Release candidate

## 📋 Semantic Versioning

If you're new to releasing software, we highly recommend to learn more about [semantic versioning](https://semver.org/).

### Version Format: MAJOR.MINOR.PATCH

- **MAJOR** version when you make incompatible API changes
- **MINOR** version when you add functionality in a backwards compatible manner  
- **PATCH** version when you make backwards compatible bug fixes

### AmplifyAI Version History

- **v2.7.0** - Critical duplicate code cleanup (MINOR - new shared utilities)
- **v2.6.0** - UX refactoring and visual optimization (MINOR - new features)
- **v2.5.0** - Complete performance and accessibility optimization (MINOR - new features)
- **v2.4.0** - Dashboard modernization and advanced UX (MINOR - new features)
- **v2.3.x** - Security hardening and performance optimization (PATCH - fixes and improvements)

## 🚀 Release Process

### 1. Prepare Release

```bash
# Update version in package.json
pnpm version minor  # or major/patch

# Update documentation
# - CHANGELOG.md
# - README.md 
# - CLAUDE.md
# - TECHNICAL_SPECS.md

# Run quality checks
pnpm lint && pnpm build

# Commit changes
git add .
git commit -m "chore(release): prepare v2.7.0 release"
```

### 2. Create GitHub Release

1. **Go to Releases**: Navigate to your repository's releases page
2. **Create New Release**: Click "Create a new release"
3. **Choose Tag**: Create a new tag (e.g., `v2.7.0`)
4. **Target Branch**: Usually `main` for production releases
5. **Release Title**: Use descriptive title (e.g., "v2.7.0 - Critical Duplicate Code Cleanup")
6. **Release Notes**: Include changelog content

### 3. Release Settings

- **Latest Release**: A newly published release will automatically be labeled as the latest release for this repository
- **Pre-release**: If 'Set as the latest release' is unchecked, the latest release will be determined by higher semantic version and creation date
- **Discussion**: Enable discussions for community feedback

[Learn more about release settings](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

## 📝 Release Notes Template

```markdown
## 🎉 What's New in v2.7.0

### 🧹 Critical Duplicate Code Cleanup
- Eliminated 4,900+ lines of duplicate code
- Created shared status utilities module
- Improved maintainability by 40-60%

### 🔧 Technical Improvements
- Component consolidation and optimization
- Modern import organization
- Zero breaking changes

### 📊 Impact
- Bundle size reduction: 15-25%
- Code quality: Zero ESLint warnings
- Developer experience: Cleaner architecture

## 🔗 Links
- [Full Changelog](CHANGELOG.md)
- [Technical Specifications](docs/TECHNICAL_SPECS.md)
- [Development Guide](docs/DEVELOPMENT_GUIDE.md)

## ⬆️ Migration
This release maintains full backward compatibility. No migration steps required.
```

## 🎯 Release Checklist

### Pre-Release
- [ ] Update version in `package.json`
- [ ] Update all documentation files
- [ ] Run quality checks (`pnpm lint && pnpm build`)
- [ ] Test critical functionality
- [ ] Update CHANGELOG.md with release notes
- [ ] Commit all changes

### Release
- [ ] Create GitHub release with proper tag (v2.7.0)
- [ ] Include comprehensive release notes
- [ ] Set appropriate release type (latest/pre-release)
- [ ] Attach any release assets if needed

### Post-Release
- [ ] Verify release appears correctly on GitHub
- [ ] Update any external documentation
- [ ] Announce release in relevant channels
- [ ] Monitor for any issues or feedback

## 🏆 Best Practices

### Tag Management
- Always use semantic versioning
- Include descriptive release notes
- Tag stable, tested code only
- Use pre-release tags for testing

### Documentation
- Keep CHANGELOG.md updated
- Include migration guides for breaking changes
- Document new features and improvements
- Reference GitHub issues and PRs

### Quality Assurance
- Never release with failing tests
- Ensure zero linting warnings
- Test on multiple environments
- Verify all critical functionality

---

**Maintainer**: Sayem Abdullah Rihan (@code-craka)  
**Repository**: [AmplifyAI](https://github.com/code-craka/amplifyai)  
**Last Updated**: June 28, 2025