# Deploying to Vercel

This guide will help you deploy your Next.js Starter Template to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. All external services set up:
   - Supabase project
   - Clerk application
   - Stripe account

## Deployment Steps

### 1. Connect Your Repository to Vercel

1. Log in to your Vercel account
2. Click "Add New" > "Project"
3. Import your Git repository
4. Select the repository containing your Next.js Starter Template

### 2. Configure Project Settings

1. **Framework Preset**: Vercel should automatically detect Next.js
2. **Build and Output Settings**: The default settings should work, but you can customize if needed
3. **Root Directory**: Leave as `.` if your project is at the root of the repository

### 3. Environment Variables

Add all the environment variables from your `.env.production` file to Vercel:

1. In the project settings, navigate to the "Environment Variables" tab
2. Add each variable from your `.env.production` file:
   - **App URL**: Set `NEXT_PUBLIC_APP_URL` to your Vercel deployment URL (you can update this after the first deployment)
   - **Supabase**: Add all Supabase-related environment variables
   - **Clerk**: Add all Clerk-related environment variables
   - **Stripe**: Add all Stripe-related environment variables

### 4. Deploy

1. Click "Deploy"
2. Wait for the build and deployment to complete
3. Once deployed, Vercel will provide you with a URL for your application

### 5. Post-Deployment Configuration

After your first deployment:

1. **Update Webhook URLs**:
   - Update your Clerk webhook URL to point to your production domain
   - Update your Stripe webhook URL to point to your production domain
2. **Update App URL**:
   - If you're using a custom domain, update `NEXT_PUBLIC_APP_URL` in your Vercel environment variables

### 6. Custom Domain (Optional)

1. In your Vercel project, go to "Settings" > "Domains"
2. Add your custom domain and follow the instructions to configure DNS

### 7. Continuous Deployment

Vercel automatically deploys your application when you push changes to your repository. You can configure this behavior in the "Git" section of your project settings.

## Troubleshooting

### Build Failures

If your build fails:

1. Check the build logs for specific errors
2. Ensure all environment variables are correctly set
3. Verify that your application builds locally with `npm run build`

### Runtime Errors

If your application deploys but doesn't work correctly:

1. Check the Function Logs in Vercel
2. Verify that all environment variables are correctly set
3. Ensure all external services (Supabase, Clerk, Stripe) are properly configured

## Production Optimizations

Consider these optimizations for production:

1. **Caching**: Review and adjust the caching headers in `vercel.json` as needed
2. **Analytics**: Set up Vercel Analytics for monitoring
3. **Edge Functions**: Consider using Vercel Edge Functions for improved performance

## Support

If you encounter issues with your Vercel deployment, refer to:

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment) 