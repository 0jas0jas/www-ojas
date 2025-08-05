# Spotify API Setup Guide

To get your Spotify card working with real data, follow these steps:

## 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in the app details:
   - App name: "Ojas Website"
   - App description: "Personal website integration"
   - Redirect URI: `http://localhost:3000/api/spotify/callback` (for development)
4. Save the app

## 2. Get Your Credentials

From your Spotify app dashboard, copy:
- **Client ID**
- **Client Secret**

## 3. Get a Refresh Token

You'll need to get a refresh token. The easiest way is:

1. Go to [Spotify Web API Console](https://devel~oper.spotify.com/console/get-users-top-artists-and-tracks/)
2. Click "Get Token"
3. Select these scopes:
   - `user-top-read`
4. Click "Request Token"
5. Copy the refresh token from the response

## 4. Set Environment Variables

Create a `.env.local` file in your project root with:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

## 5. Test the Integration

The Spotify card will now:
- Fetch your top track from the last 4 weeks
- Display the track info with album art
- Link to the track on Spotify
- Fall back to "Maple Syrup" by The Backseat Lovers if the API fails

## Notes

- The refresh token doesn't expire, so you only need to get it once
- The API fetches your top track from the last 4 weeks (`short_term`)
- The component has error handling and will show fallback data if the API fails 
