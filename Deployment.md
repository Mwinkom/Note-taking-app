# Documentation: Deploying an Angular Note-taking Application on AWS Using S3 and CloudFront

## 1. Introduction
This documentation outlines the process of deploying an Angular single-page application (SPA) on AWS using Amazon S3 for hosting static files and Amazon CloudFront as a Content Delivery Network (CDN). It also explains the rationale for choosing these services, cost considerations, and the security measures applied.

## 2. AWS Resources Used
🔹 **Amazon S3 (Simple Storage Service)**
- Used to store and host the compiled Angular static files (index.html, main.js, CSS, assets, etc.).  
- Provides highly available and durable storage.  
- Eliminates the need for managing servers.  

🔹 **Amazon CloudFront**
- Acts as a Content Delivery Network (CDN) in front of the S3 bucket.  
- Delivers content globally with low latency.  
- Provides HTTPS by default via AWS Certificate Manager (ACM).  
- Allows custom error handling (e.g., redirecting 404 and 403 errors to index.html for Angular routing).  

## 3. Deployment Process
**Step 1: Build Angular Project**  
```bash
ng build --configuration production
```
- Output files are generated inside the `dist/` folder.

**Step 2: Create S3 Bucket**
- Created a new S3 bucket (e.g., `note-taking-app-bucket`).  
- Set Block Public Access to **On** (access is controlled via CloudFront).  
- Uploaded Angular build files (`dist/browser/`) to the bucket.  

**Step 3: Configure CloudFront Distribution**
- **Origin**: S3 bucket (configured as private).  
- **Default Root Object**: `index.html`.  
- **Viewer Protocol Policy**: Redirect HTTP → HTTPS.  
- Added **Custom Error Page**:  
  - HTTP Error Code: 404 & 403  
  - Response Page Path: `/index.html`  
  - HTTP Response Code: 200  

🌟 This ensures Angular handles client-side routes instead of returning an S3 404 error.

**Step 4: Test the Application**
- Accessed the CloudFront distribution URL.  
- Verified that navigation works correctly, including Angular routes like `/notes`, `/posts`, etc.  

## 4. Why I Chose S3 + CloudFront
- **Cost-Effective**
  - S3 storage costs only around $0.023 per GB/month.  
  - CloudFront free tier provides 50 GB data transfer out + 2M requests per month for 12 months.  
  - Much cheaper than running EC2 or Elastic Beanstalk for a static Angular SPA.  

- **Scalability**
  - No need to manage servers.  
  - Handles sudden traffic spikes automatically.  

- **Performance**
  - CloudFront caches content at global edge locations → low latency delivery.  

- **Security**
  - HTTPS enabled by default with SSL/TLS.  
  - Origin Access Control (OAC) or Origin Access Identity (OAI) ensures the S3 bucket is private and only accessible via CloudFront.  
  - Ability to add WAF (Web Application Firewall) for additional protection.  

- **Best Practice for SPAs**
  - Using custom error pages in CloudFront ensures Angular routing works correctly (`/index.html` fallback).  
  - Recommended setup by AWS and Angular community.  

## 5. Cost Considerations
- **S3 Storage**: ~$0.023 per GB/month (storing Angular app files, usually <100 MB).  
- **CloudFront**: Free Tier → 50 GB/month for 12 months, then ~$0.085 per GB (region dependent).  
- **ACM SSL Certificate**: Free.  
- **Route 53 (Optional)**: If using a custom domain, domain registration costs ~$12/year.  

🌟 This setup is almost free for personal/student projects within the Free Tier.

## 6. Security Implementations
- S3 bucket kept private (no public access).  
- CloudFront distribution serves all requests over HTTPS.  
- Custom Error Handling prevents exposure of raw S3 404 errors.  
- Optional: IAM roles and fine-grained permissions to control who can upload/update files.  

## 7. Conclusion
Deploying the Angular SPA on S3 + CloudFront provided a cost-effective, secure, scalable, and globally optimized solution. The configuration ensures that Angular handles client-side routing properly, while CloudFront delivers the content securely and efficiently.  

🌟 This approach is ideal for production-ready SPAs without the overhead of managing servers.
