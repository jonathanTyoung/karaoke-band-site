# Decap CMS Setup Instructions

## What is Decap CMS?
Decap CMS (formerly Netlify CMS) is a content management system that allows you to easily manage your website content through a user-friendly admin interface.

## Setup Steps

### 1. Enable Netlify Identity
1. Go to your Netlify dashboard
2. Navigate to your site
3. Go to **Settings** → **Identity**
4. Click **Enable Identity**

### 2. Configure Git Gateway
1. In Identity settings, scroll to **Services** → **Git Gateway**
2. Click **Enable Git Gateway**
3. This allows Decap CMS to commit changes to your GitHub repo

### 3. Enable Identity Widget (Already Added)
The identity widget script is already included in your `index.html` (you'll need to add it).

Add this before the closing `</body>` tag in your `index.html`:
```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

### 4. Invite Users
1. Go to **Identity** tab in Netlify
2. Click **Invite users**
3. Enter the email address(es) of people who should have admin access
4. They'll receive an email to set up their account

### 5. Access the Admin Panel
Once deployed, access your CMS at: `https://yoursite.com/admin/`

## What You Can Manage

### Gallery Images
- Upload event photos
- Add titles, descriptions, and event types
- Mark images as featured
- Organize by date

### Site Settings
- **General Settings**: Band name, contact info, social media links
- **About Section**: Edit about text and feature cards
- **Services**: Manage service offerings

### Testimonials
- Add client testimonials
- Rate experiences (1-5 stars)
- Upload client photos
- Mark testimonials as featured

## Workflow

The CMS uses **Editorial Workflow** by default:
1. **Draft**: Create new content
2. **In Review**: Submit for review
3. **Ready**: Approve and publish

Change to `publish_mode: simple` in `config.yml` for immediate publishing.

## Local Development (Optional)

To test CMS locally:
1. Uncomment `local_backend: true` in `admin/config.yml`
2. Install: `npx decap-server`
3. Run: `npx decap-server`
4. Visit: `http://localhost:8080/admin/`

## File Structure

```
/
├── admin/
│   ├── index.html          # CMS admin interface
│   └── config.yml          # CMS configuration
├── content/
│   ├── gallery/            # Gallery images (markdown files)
│   ├── settings/           # Site settings (JSON files)
│   └── testimonials/       # Client testimonials
├── images/
│   └── uploads/            # Uploaded media files
└── index.html              # Your main site
```

## Next Steps

1. Deploy to Netlify
2. Enable Identity + Git Gateway
3. Invite yourself as admin user
4. Access `/admin/` and start managing content!

## Support

- Decap CMS Docs: https://decapcms.org/docs/intro/
- Netlify Identity Docs: https://docs.netlify.com/visitor-access/identity/