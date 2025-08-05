"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

interface SpotifyTrack {
  spotifyUrl: string;
}

export const SpotifyCard = () => {
  const [trackUrl, setTrackUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch('/api/spotify');
        if (response.ok) {
          const trackData = await response.json();
          // Extract track ID from Spotify URL
          const trackId = trackData.spotifyUrl.split('/').pop();
          setTrackUrl(`https://open.spotify.com/embed/track/${trackId}`);
        } else {
          // Fallback to a default track
          setTrackUrl("https://open.spotify.com/embed/track/4MXE6VCvTsQitHWrAxj7Kg");
        }
      } catch (error) {
        console.error('Error fetching track:', error);
        // Fallback to a default track
        setTrackUrl("https://open.spotify.com/embed/track/4MXE6VCvTsQitHWrAxj7Kg");
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
  }, []);

  if (loading) {
    return (
      <Card className="col-span-4 row-span-1 sm:col-span-1 p-4">
        <CardBody className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-default-500">Loading the vibe...</p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="col-span-4 row-span-1 sm:col-span-1 p-4">
      <CardHeader>
        <h4 className="text-2xl font-black text-center w-full">top track this month</h4>
      </CardHeader>
      <CardBody className="p-0 bg-transparent border-none rounded-3xl">
        <iframe
          src={trackUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allow="encrypted-media"
        />
      </CardBody>
    </Card>
  );
}; 