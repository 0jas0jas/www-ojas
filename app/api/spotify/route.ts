import { NextResponse } from 'next/server';

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  spotifyUrl: string;
  previewUrl?: string;
}

export async function GET() {
  try {
    // You'll need to set these environment variables
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      console.error('Missing Spotify credentials:', {
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret,
        hasRefreshToken: !!refreshToken
      });
      return NextResponse.json(
        { error: 'Spotify credentials not configured' },
        { status: 500 }
      );
    }

    // Get access token using refresh token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error('Token response error:', tokenData);
      return NextResponse.json(
        { error: 'Failed to get access token', details: tokenData },
        { status: 500 }
      );
    }

    // Get top tracks
    const tracksResponse = await fetch(
      'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1&offset=0',
      {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const tracksData = await tracksResponse.json();

    if (!tracksData.items || tracksData.items.length === 0) {
      return NextResponse.json(
        { error: 'No tracks found' },
        { status: 404 }
      );
    }

    const track = tracksData.items[0];
    
    const spotifyTrack: SpotifyTrack = {
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      albumArt: track.album.images[0]?.url || '',
      spotifyUrl: track.external_urls.spotify,
      previewUrl: track.preview_url || undefined,
    };

    return NextResponse.json(spotifyTrack);
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch track data' },
      { status: 500 }
    );
  }
} 