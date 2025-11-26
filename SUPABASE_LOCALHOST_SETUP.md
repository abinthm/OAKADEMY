# Supabase Localhost Setup Guide

## Issue: Redirecting to Production Instead of Localhost

If you're being redirected to a hosted/production URL after login instead of staying on localhost, you need to configure Supabase properly.

## Steps to Fix

### 1. Check Supabase Dashboard Settings

Go to your Supabase project dashboard:

1. **Authentication → URL Configuration**
   - **Site URL**: Should be `http://localhost:5173` (or your Vite dev server port)
   - **Redirect URLs**: Add these URLs:
     ```
     http://localhost:5173/**
     http://localhost:5173/voice-of-oak/auth/callback
     http://127.0.0.1:5173/**
     http://127.0.0.1:5173/voice-of-oak/auth/callback
     ```

2. **Authentication → Providers → Google**
   - Make sure **Authorized redirect URIs** includes:
     ```
     http://localhost:5173/voice-of-oak/auth/callback
     http://127.0.0.1:5173/voice-of-oak/auth/callback
     ```

### 2. Check Your Vite Dev Server Port

If you're using a different port (not 5173), update the URLs above to match your port.

To check your port, look at the terminal when you run `npm run dev` - it will show something like:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 3. Clear Browser Cache and Storage

1. Open DevTools (F12)
2. Go to **Application** tab
3. Clear:
   - **Local Storage** → Delete `auth-storage` key
   - **Session Storage** → Clear all
   - **Cookies** → Clear all for localhost
4. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### 4. Verify Environment Variables

Make sure your `.env` file has the correct Supabase URLs:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Important**: These should point to your Supabase project, NOT a production URL.

### 5. Test the Fix

1. Start your dev server: `npm run dev`
2. Open browser console (F12) to see logs
3. Try logging in
4. Watch the console for:
   - `AuthStore: Current origin: http://localhost:5173`
   - `AuthCallback: Current location: http://localhost:5173/...`
5. You should stay on localhost after login

### 6. If Still Redirecting

If you're still being redirected to production:

1. **Check Supabase Site URL**: It might be set to production URL
2. **Check OAuth Provider Settings**: Google OAuth might have production URL configured
3. **Check Browser Extensions**: Some extensions can redirect URLs
4. **Check Network Tab**: See what URL the redirect is going to

### 7. Temporary Workaround

If you can't change Supabase settings immediately, you can:

1. Use email/password login instead of Google OAuth (it doesn't redirect)
2. Or manually navigate back to localhost after OAuth redirect

## Common Issues

### Issue: "redirect_uri_mismatch" error
**Solution**: Make sure the redirect URL in your code matches exactly what's in Supabase dashboard (including http vs https, port number, trailing slashes)

### Issue: Redirects to production domain
**Solution**: Check Supabase Site URL setting - it should be localhost for development

### Issue: OAuth works but then redirects away
**Solution**: Check the `redirectTo` parameter in the code - it should use `window.location.origin` which we've already fixed

## Verification

After making changes, verify:

1. ✅ Site URL in Supabase is `http://localhost:5173`
2. ✅ Redirect URLs include localhost patterns
3. ✅ Browser storage is cleared
4. ✅ Console shows localhost URLs in logs
5. ✅ Login stays on localhost

If all these are correct, you should be able to login and stay on localhost!


