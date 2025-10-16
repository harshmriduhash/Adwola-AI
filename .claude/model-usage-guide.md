# Claude Model Usage Guide for Adwola Project

## 🎯 **Quick Model Selection Reference**

### **Daily Development Scenarios**

#### **🏗️ Starting Development Session**
```bash
# Use Sonnet 3.7 for codebase understanding
/model claude-sonnet-3.7
/user:adwola:dev-setup
/user:adwola:status codebase
```

#### **🐛 Bug Fixing Session**
```bash
# Use Sonnet 3.5 for standard debugging
/model claude-3.5-sonnet-20241022
# Analyze the issue, implement fix, test
```

#### **🚀 Architecture Planning**
```bash
# Use Sonnet 4 for complex decisions
/model claude-sonnet-4
"Design a new microservice architecture for our analytics system"
```

#### **⚡ Quick Tasks**
```bash
# Use Haiku 3.5 for simple operations
/model claude-haiku-3.5
/user:adwola:commit "fix: minor typo in documentation"
```

## 📋 **Model Decision Matrix**

| **Task Type** | **Complexity** | **Recommended Model** | **Example Commands** |
|---------------|----------------|---------------------|---------------------|
| **Code Review** | Medium | Sonnet 3.5 (2024-10-22) | Review PR changes, suggest improvements |
| **Architecture Design** | High | Sonnet 4 | System design, migration planning |
| **Codebase Exploration** | Medium | Sonnet 3.7 | Find files, understand structure |
| **Simple Edits** | Low | Haiku 3.5 | Fix typos, update comments |
| **Performance Analysis** | High | Sonnet 4 | Optimize database queries, analyze bottlenecks |
| **Feature Implementation** | Medium | Sonnet 3.5 (2024-10-22) | Build components, add functionality |
| **Documentation** | Low-Medium | Sonnet 3.7 | Generate docs, explain code |
| **Status Checks** | Low | Haiku 3.5 | Git status, project overview |

## 🧠 **When to Use Each Model**

### **Claude Sonnet 4 - The Architect**
**Best for:**
- Migration strategy planning
- Performance optimization strategies
- Security architecture review
- Complex debugging across multiple systems
- Database schema design decisions
- API architecture planning

**Example Tasks:**
```bash
/model claude-sonnet-4

"Analyze our current Supabase RLS policies and recommend security improvements"
"Design a caching strategy for our analytics dashboard"
"Plan the migration from our current auth system to enterprise SSO"
"Optimize our database performance across all tables and queries"
```

### **Claude Sonnet 3.5 (2024-10-22) - The Developer**
**Best for:**
- Feature implementation
- Component development
- API integration
- Testing implementation
- Bug fixing
- Code refactoring

**Example Tasks:**
```bash
/model claude-3.5-sonnet-20241022

"Implement a new dashboard component with real-time updates"
"Add error handling to our Stripe payment integration"
"Refactor the analytics dashboard for better performance"
"Write comprehensive tests for the user authentication flow"
```

### **Claude Sonnet 3.7 - The Explorer**
**Best for:**
- Codebase analysis and exploration
- Understanding existing code patterns
- Documentation generation
- Code quality assessment
- Dependency analysis

**Example Tasks:**
```bash
/model claude-sonnet-3.7

"Analyze all our React components and identify reusable patterns"
"Generate documentation for our Supabase edge functions"
"Find all instances where we're using deprecated React patterns"
"Create a dependency map of our component library"
```

### **Claude Haiku 3.5 - The Assistant**
**Best for:**
- Quick questions and answers
- Simple file operations
- Status checks
- Basic explanations
- Minor fixes

**Example Tasks:**
```bash
/model claude-haiku-3.5

"What's the current git status?"
"Fix this TypeScript type error in Button.tsx"
"Read the package.json and list all dependencies"
"Show me the current branch name"
```

## 💾 **Smart Caching Strategy**

### **High-Value Cached Operations (2+ hours)**
- Architecture analysis and recommendations
- Migration strategy documents
- Performance optimization plans
- Security audit results
- Complete codebase analysis

### **Medium-Value Cached Operations (30-60 minutes)**
- Component documentation
- Code pattern analysis
- API integration guides
- Testing strategies
- Dependency maps

### **Low-Value Cached Operations (5-15 minutes)**
- File content summaries
- Simple explanations
- Status overviews
- Quick Q&A responses

### **Never Cached**
- Real-time data queries
- Live debugging sessions
- Dynamic status updates
- Interactive development sessions

## 🔄 **Model Switching Best Practices**

### **Within a Single Session**
```bash
# Start with exploration (Sonnet 3.7)
/model claude-sonnet-3.7
"Show me the structure of our dashboard components"

# Switch to development (Sonnet 3.5)
/model claude-3.5-sonnet-20241022
"Now implement a new analytics card component"

# Switch for complex decisions (Sonnet 4)
/model claude-sonnet-4
"Should we refactor this into a microservice architecture?"

# Quick final tasks (Haiku 3.5)
/model claude-haiku-3.5
"Commit these changes with a proper message"
```

### **Task-Specific Sessions**
```bash
# Deep Analysis Session (Sonnet 4 only)
/model claude-sonnet-4
# Focus on architecture, performance, security

# Development Sprint (Sonnet 3.5 primary)
/model claude-3.5-sonnet-20241022
# Build features, fix bugs, implement tests

# Maintenance Session (mix of Sonnet 3.7 + Haiku 3.5)
/model claude-sonnet-3.7  # for analysis
/model claude-haiku-3.5   # for quick fixes
```

## 📊 **Performance Optimization Tips**

### **Cost Optimization**
1. **Always start with the right model** - don't use Sonnet 4 for simple tasks
2. **Leverage caching** - check if similar analysis was done recently
3. **Batch similar tasks** - group related operations under one model
4. **Use Haiku for confirmations** - simple yes/no questions don't need power

### **Speed Optimization**
1. **Haiku 3.5 for immediate responses** - status checks, quick reads
2. **Cache frequently accessed analysis** - don't re-analyze the same code
3. **Pre-load common operations** - keep model context warm for active development

### **Quality Optimization**
1. **Sonnet 4 for critical decisions** - architecture, security, performance
2. **Sonnet 3.5 for production code** - features that ship to users
3. **Sonnet 3.7 for understanding** - before making changes to unfamiliar code

## ✅ **Model Configuration Verification**

### **Test Your Setup**
```bash
# Test each model works
/model claude-sonnet-4
"Test message for Sonnet 4"

/model claude-3.5-sonnet-20241022
"Test message for Sonnet 3.5"

/model claude-sonnet-3.7
"Test message for Sonnet 3.7"

/model claude-haiku-3.5
"Test message for Haiku 3.5"
```

### **Verify Caching**
```bash
# Run the same complex query twice - second should be faster
/model claude-sonnet-4
"Analyze the complete architecture of our Supabase setup"

# Wait 30 seconds, then run again
"Analyze the complete architecture of our Supabase setup"
```

This intelligent model configuration ensures you always have the right tool for the job while optimizing for speed, cost, and quality!