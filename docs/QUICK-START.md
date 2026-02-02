# ✅ Quick Start - Almost Ready!

## What We Have:

✅ **API Token**: `c035c60b6a535c7f515627cd15fd76d4a7a25231`  
✅ **Simpro Subdomain**: `fyrup`  
✅ **Simpro URL**: https://fyrup.simprosuite.com  
✅ **N8N Instance**: https://n8n.juanbp.com/  

✅ **Company ID**: `0` (Found!)

---

## 📝 Ready to Test!

### Step 1: Test Your API Connection NOW

1. Open PowerShell
2. Navigate to this folder:
   ```powershell
   cd "C:\Users\tree1\Desktop\Cursor\Fyrup"
   ```

3. Run the test (everything is already configured!):
   ```powershell
   .\test-simpro-api.ps1
   ```

4. If you see quote data, **YOU'RE READY FOR N8N!** 🎉

### Step 2: Set Up N8N

Follow the complete guide in: **`YOUR-SETUP-INSTRUCTIONS.md`**

Quick steps:
1. Create Header Auth credential in N8N
2. Import the workflow
3. Update 3 HTTP Request nodes with:
   - Subdomain: `fyrup`
   - Company ID: `[Your Company ID]`
4. Configure email settings
5. Test and go live!

---

## 🚀 Summary of Your Configuration:

| Item | Value |
|------|-------|
| N8N URL | https://n8n.juanbp.com/ |
| Simpro URL | https://fyrup.simprosuite.com |
| API Token | `c035c60b6a535c7f515627cd15fd76d4a7a25231` |
| Subdomain | `fyrup` ✅ |
| Company ID | `0` ✅ |
| **Full API Endpoint** | `https://fyrup.simprosuite.com/api/v1.0/companies/0/quotes/` |

---

## 🎯 Authorization Header (for N8N):

```
Header Name: Authorization
Header Value: Bearer c035c60b6a535c7f515627cd15fd76d4a7a25231
```

---

## 📞 Files to Use:

1. **`YOUR-SETUP-INSTRUCTIONS.md`** - Complete setup guide
2. **`test-simpro-api.ps1`** - Test your API connection (update Company ID first!)
3. **`simpro-overdue-quotes-workflow-headerauth.json`** - The N8N workflow

---

**🚀 Next Action**: Run `.\test-simpro-api.ps1` in PowerShell RIGHT NOW to test your API connection!
