# Claude Model Configuration for Adwola Project

## 🎯 **Intelligent Model Selection Strategy**

### **Model Priority Mapping**

| **Task Type** | **Primary Model** | **Fallback Model** | **Use Cases** |
|---------------|------------------|-------------------|---------------|
| **Standard Development** | Claude Sonnet 3.5 (2024-10-22) | Claude Sonnet 3.7 | Code review, bug fixes, routine tasks |
| **Codebase Analysis** | Claude Sonnet 3.7 | Claude Sonnet 3.5 (2024-10-22) | Indexing, file exploration, structure analysis |
| **Deep Thinking** | Claude Sonnet 4 | Claude Sonnet 3.5 (2024-10-22) | Architecture decisions, complex problem solving |
| **Quick Tasks** | Claude Haiku 3.5 | Claude Sonnet 3.7 | Simple questions, status checks, quick fixes |

### **Task Classification Rules**

#### **🚀 Claude Sonnet 4 (Maximum Thinking Power)**
- Complex architectural decisions
- Deep analysis and debugging
- Migration strategy planning
- Performance optimization strategies
- Security architecture review
- Multi-system integration planning
- Advanced algorithm design
- Strategic technical decisions

#### **⚡ Claude Sonnet 3.5 (2024-10-22) (Primary Workhorse)**
- Feature implementation
- Code refactoring
- Component development
- API integration
- Testing strategy
- UI/UX improvements
- Database query optimization
- Standard debugging

#### **🔍 Claude Sonnet 3.7 (Codebase Specialist)**
- Codebase indexing and exploration
- File structure analysis
- Code pattern recognition
- Legacy code understanding
- Documentation generation
- Code quality assessment
- Dependency analysis
- Technical debt evaluation

#### **💨 Claude Haiku 3.5 (Quick Tasks)**
- Status checks
- Simple questions
- Quick fixes
- Basic explanations
- File reading
- Simple edits
- Command execution
- Quick documentation updates

## 📋 **Implementation Configuration**

### **Project-Specific Model Rules**

```yaml
# Adwola Project Model Configuration
models:
  default: "claude-3.5-sonnet-20241022"
  
  task_mapping:
    # Deep thinking patterns
    - pattern: ["architecture", "design", "strategy", "migration", "optimization"]
      model: "claude-sonnet-4"
      cache: true
      max_tokens: 8192
      
    # Standard development
    - pattern: ["implement", "refactor", "debug", "test", "component"]
      model: "claude-3.5-sonnet-20241022"
      cache: true
      max_tokens: 4096
      
    # Codebase analysis
    - pattern: ["index", "analyze", "explore", "search", "structure"]
      model: "claude-sonnet-3.7"
      cache: true
      max_tokens: 4096
      
    # Quick tasks
    - pattern: ["status", "read", "check", "simple", "quick"]
      model: "claude-haiku-3.5"
      cache: false
      max_tokens: 2048

# Caching Strategy
caching:
  enabled: true
  strategies:
    - type: "read_operations"
      ttl: 3600  # 1 hour
      models: ["all"]
      
    - type: "code_analysis"
      ttl: 1800  # 30 minutes
      models: ["claude-sonnet-3.7", "claude-3.5-sonnet-20241022"]
      
    - type: "architecture_decisions"
      ttl: 7200  # 2 hours
      models: ["claude-sonnet-4"]
```

## 🛠️ **Custom Command Model Assignments**

### **Adwola Command Model Mapping**

| **Command** | **Assigned Model** | **Reasoning** |
|-------------|-------------------|---------------|
| `/user:adwola:dev-setup` | Claude Sonnet 3.7 | Codebase understanding needed |
| `/user:adwola:commit` | Claude Haiku 3.5 | Quick message formatting |
| `/user:adwola:feature-branch` | Claude Haiku 3.5 | Simple git operations |
| `/user:adwola:supabase` | Claude Sonnet 3.5 (2024-10-22) | Database operations require precision |
| `/user:adwola:qa` | Claude Sonnet 3.5 (2024-10-22) | Comprehensive testing workflow |
| `/user:adwola:analytics` | Claude Sonnet 4 | Deep performance analysis |
| `/user:adwola:deploy` | Claude Sonnet 3.5 (2024-10-22) | Critical deployment workflow |
| `/user:adwola:status` | Claude Sonnet 3.7 | Comprehensive project analysis |

## 💡 **Usage Guidelines**

### **When to Override Default Model Selection**

#### **Force Claude Sonnet 4 for:**
```bash
/model claude-sonnet-4 "Analyze the complete migration strategy for moving from shadcn/ui to Adwola design system"
/model claude-sonnet-4 "Design a comprehensive performance monitoring architecture"
/model claude-sonnet-4 "Create a security audit framework for our Supabase implementation"
```

#### **Use Claude Sonnet 3.7 for:**
```bash
/model claude-sonnet-3.7 "Index all component files and create a dependency map"
/model claude-sonnet-3.7 "Analyze code patterns across the entire codebase"
/model claude-sonnet-3.7 "Generate comprehensive documentation for the project structure"
```

#### **Use Claude Haiku 3.5 for:**
```bash
/model claude-haiku-3.5 "What's the current git status?"
/model claude-haiku-3.5 "Fix this simple TypeScript type error"
/model claude-haiku-3.5 "Read the package.json file"
```

### **Intelligent Caching Strategy**

#### **High Cache Priority (2+ hours):**
- Project architecture diagrams
- Complex migration strategies
- Performance optimization plans
- Security frameworks

#### **Medium Cache Priority (30-60 minutes):**
- Codebase analysis results
- Component documentation
- API integration guides
- Testing strategies

#### **Low Cache Priority (5-15 minutes):**
- File content reads
- Simple status checks
- Quick explanations
- Basic debugging steps

#### **No Cache:**
- Real-time data queries
- Dynamic status updates
- Live debugging sessions
- Interactive development

## 📊 **Performance Optimization**

### **Model Selection Flowchart**

```
User Request → Task Analysis → Model Selection
     ↓
Is it architectural/strategic? → Yes → Claude Sonnet 4
     ↓ No
Is it codebase analysis? → Yes → Claude Sonnet 3.7
     ↓ No
Is it standard development? → Yes → Claude Sonnet 3.5 (2024-10-22)
     ↓ No
Is it a quick task? → Yes → Claude Haiku 3.5
     ↓ No
Default: Claude Sonnet 3.5 (2024-10-22)
```

### **Cost Optimization Guidelines**

1. **Use Claude Haiku 3.5** for:
   - Quick status checks
   - Simple file reads
   - Basic explanations
   - Routine confirmations

2. **Use Claude Sonnet 3.7** for:
   - Codebase exploration
   - Pattern analysis
   - Documentation generation
   - Code structure understanding

3. **Use Claude Sonnet 3.5 (2024-10-22)** for:
   - Feature development
   - Bug fixing
   - Testing implementation
   - Standard refactoring

4. **Reserve Claude Sonnet 4** for:
   - Complex architectural decisions
   - Migration strategies
   - Performance optimization
   - Security framework design

## 🔧 **Implementation Commands**

### **Set Model for Current Session**
```bash
/model claude-sonnet-4        # For deep thinking tasks
/model claude-sonnet-3.7      # For codebase analysis
/model claude-3.5-sonnet-20241022  # For standard development
/model claude-haiku-3.5       # For quick tasks
```

### **Model-Specific Custom Commands**
```bash
# Architecture and Strategy (Sonnet 4)
/user:adwola:analytics performance  # Auto-uses Sonnet 4

# Codebase Analysis (Sonnet 3.7)
/user:adwola:status codebase        # Auto-uses Sonnet 3.7

# Development (Sonnet 3.5 2024-10-22)
/user:adwola:qa                     # Auto-uses Sonnet 3.5

# Quick Tasks (Haiku 3.5)
/user:adwola:commit "quick fix"     # Auto-uses Haiku 3.5
```

## ✅ **Configuration Complete**

This intelligent model selection ensures:

- **Optimal Performance**: Right model for the right task
- **Cost Efficiency**: Avoid over-powered models for simple tasks
- **Speed Optimization**: Fast models for quick operations
- **Quality Assurance**: Powerful models for complex decisions
- **Smart Caching**: Reduce redundant operations
- **Project Alignment**: Adwola-specific optimization

The configuration automatically routes tasks to the most appropriate Claude model while maintaining development efficiency and cost optimization.