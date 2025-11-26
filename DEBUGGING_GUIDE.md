# Debugging Guide for Admin Dashboard Issues

## Issues Identified and Fixes Applied

### 1. Admin Status Not Showing
**Problem**: Admin account status not being recognized after login.

**Fixes Applied**:
- Added `refreshUser()` function to authStore to refresh user state with latest admin status
- Updated AdminDashboard to call `refreshUser()` after verifying admin status
- Removed early return that was hiding content when `user?.isAdmin` was false

**To Verify**:
1. Check browser console for logs showing admin status check
2. Verify in Supabase that your user's `is_admin` field is set to `true` in the `profiles` table
3. Check localStorage - the auth store persists user data, so clear it if needed

### 2. Posts Not Loading
**Problem**: Posts from database not loading in AdminDashboard.

**Possible Causes**:
1. Foreign key reference issue in blogStore query
2. Database connection issue
3. RLS (Row Level Security) policies blocking access

**To Debug**:
1. Open browser console and check for errors when loading AdminDashboard
2. Check Network tab to see if the Supabase query is failing
3. Verify RLS policies allow admins to read posts

**Quick Fix**: The blogStore query uses foreign key references. If they're failing, we may need to adjust the query.

### 3. News Management Section Not Showing
**Problem**: NewsManagement component not visible.

**Fixes Applied**:
- Removed the early return that was hiding content
- NewsManagement is now always rendered after admin verification
- Component doesn't depend on `user?.isAdmin` check since AdminDashboard already verified

**To Verify**:
1. Scroll down on AdminDashboard - NewsManagement should appear below "Pending Posts"
2. Check browser console for any errors from NewsManagement component

## Database Setup Required

### 1. Create news_items Table
Run the SQL migration file: `migrations/create_news_items_table.sql` in your Supabase SQL Editor.

### 2. Verify Admin Status
Run this query in Supabase to check your admin status:
```sql
SELECT id, email, name, is_admin FROM profiles WHERE email = 'your-email@example.com';
```

To set yourself as admin:
```sql
UPDATE profiles SET is_admin = true WHERE email = 'your-email@example.com';
```

### 3. Check RLS Policies
Verify that your RLS policies allow:
- Admins to read/write posts
- Admins to read/write news_items
- Public to read approved posts

## Testing Steps

1. **Clear Browser Storage**:
   - Open DevTools → Application → Local Storage
   - Clear the `auth-storage` key
   - Refresh the page

2. **Login as Admin**:
   - Login with your admin account
   - Check console for "User state set" logs
   - Verify `user.isAdmin` is `true` in the logs

3. **Access Admin Dashboard**:
   - Navigate to `/voice-of-oak/admin`
   - Should see:
     - "Pending Posts" section
     - "News Items Management" section below it

4. **Test News Management**:
   - Click "Add News Item"
   - Fill in the form and upload an image
   - Should see the news item appear in the grid

5. **Check Posts Loading**:
   - Check if pending posts appear
   - If not, check console for errors
   - Verify database has posts with `status = 'pending'`

## Common Issues

### Issue: "No user found" error
**Solution**: Make sure you're logged in and the session is active. Try logging out and back in.

### Issue: "Permission denied" error
**Solution**: Check RLS policies in Supabase. Admins should have full access.

### Issue: Posts query returns empty array
**Solution**: 
- Verify posts exist in database
- Check if posts have the correct status
- Verify foreign key relationships are correct

### Issue: News items not saving
**Solution**:
- Verify `news_items` table exists
- Check RLS policies allow admin insert
- Verify image upload bucket `blog-images` exists and is public

## Next Steps

If issues persist:
1. Check browser console for specific error messages
2. Check Supabase logs for database errors
3. Verify all environment variables are set correctly
4. Ensure database migrations have been run


