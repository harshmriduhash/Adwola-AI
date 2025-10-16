# 🔐 Secure Deployment Guide - AmplifyAI

## 🎯 **Dual AI Provider Setup (OpenAI + Vertex AI)**

### Step 1: Secure Credential Management

#### **A. Add Credentials to Supabase Vault**

1. Navigate to [Supabase Dashboard - Vault](https://supabase.com/dashboard/project/qtuvihlcscigrllotjde/settings/vault)

2. Add the following secrets:

##### OpenAI Configuration
```
Secret Name: OPENAI_API_KEY
Secret Value: [YOUR_OPENAI_API_KEY_HERE]
```

##### Vertex AI Configuration
```
Secret Name: VERTEX_AI_PROJECT_ID
Secret Value: gen-lang-client-0003297013
```

```
Secret Name: VERTEX_AI_LOCATION
Secret Value: us-central1
```

```
Secret Name: VERTEX_AI_CREDENTIALS
Secret Value: [PASTE_YOUR_VERTEX_AI_SERVICE_ACCOUNT_JSON_HERE]
```

> **🔐 CRITICAL SECURITY NOTE**: 
> - NEVER commit actual API keys or service account credentials to version control
> - Use placeholders in documentation
> - Store all credentials securely in Supabase Vault
> - Rotate credentials regularly (every 90 days)

#### **B. Local Environment Setup**

Update your `.env.local` file:
```bash
# AI Provider APIs - Dual Setup for Enhanced Reliability
OPENAI_API_KEY=your_actual_openai_key_here
VERTEX_AI_PROJECT_ID=gen-lang-client-0003297013
VERTEX_AI_LOCATION=us-central1
```

### Step 2: Deploy Enhanced Edge Functions

The codebase now includes enterprise-grade AI integration with:
- Dual AI provider system (OpenAI + Vertex AI)
- Intelligent failover and retry logic
- Enhanced error handling and monitoring

**Deploy via Supabase CLI:**
```bash
cd /Users/rihan/all-coding-project/amplify-ai
supabase functions deploy
```

### Step 3: Verify Deployment

1. **Test Content Generation**: Create a new campaign
2. **Test Regeneration**: Use the regenerate button on posts
3. **Monitor Logs**: Check Edge Function logs for AI provider usage
4. **Verify Fallback**: Confirm failover works if one provider fails

## 🏢 **Enterprise Security Features**

### **GitHub Security (Active)**
- ✅ Push Protection: Blocks commits with secrets
- ✅ Secret Scanning: Monitors for leaked credentials
- ✅ Dependency Scanning: Security vulnerability detection

### **Application Security**
- ✅ Row Level Security (RLS) on all database tables
- ✅ API key management via Supabase Vault
- ✅ Rate limiting (100 requests/minute per user)
- ✅ Input validation and sanitization

### **Infrastructure Security**
- ✅ HTTPS-only communication
- ✅ Environment variable encryption
- ✅ Secure credential storage
- ✅ Audit logging

## 📊 **AI Provider Strategy**

### **Smart Provider Selection**
- **Strategy Generation**: Vertex AI Gemini (superior reasoning)
- **Copywriting**: OpenAI GPT-4 (creative excellence)
- **Image Generation**: DALL-E primary, Imagen backup
- **Automatic Fallback**: Seamless provider switching

### **Cost Optimization**
- Intelligent model selection based on task complexity
- Automatic retry with exponential backoff
- Provider health monitoring and selection
- Usage tracking and optimization recommendations

## 🔄 **Monitoring & Maintenance**

### **Health Checks**
- AI provider response times
- Error rates and failover frequency
- Resource utilization metrics
- User experience indicators

### **Security Monitoring**
- Failed authentication attempts
- Unusual API usage patterns
- Credential rotation schedules
- Compliance audit trails

---

## ✅ **Deployment Checklist**

- [ ] Supabase Vault credentials configured
- [ ] Edge Functions deployed successfully
- [ ] Storage buckets created and configured
- [ ] Local environment variables updated
- [ ] AI provider functionality tested
- [ ] Security monitoring enabled
- [ ] Backup and recovery procedures verified

## 🚨 **Emergency Procedures**

### **If AI Provider Fails**
1. Check provider status pages
2. Verify API keys in Supabase Vault
3. Check rate limits and quotas
4. Failover to secondary provider manually if needed

### **If Security Incident Detected**
1. Immediately rotate affected credentials
2. Review audit logs for suspicious activity
3. Update security measures as needed
4. Document incident and response

---

**Your AmplifyAI platform is now ready for enterprise deployment with dual AI integration!** 🚀