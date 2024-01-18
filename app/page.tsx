'use client';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const API_ENDPOINT = 'https://lwcrmapi-mig2-east.azurewebsites.net/api/v2/Messages/GetMessages?org=joelosteen.com&feed=web';


export default function Home() {

  const fetchVideos = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      return data.hits; // assuming 'hits' contains the videos
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const fetchedVideos = await fetchVideos();
      setVideos(fetchedVideos);
    };

    getVideos();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2">
      {videos?.map(video => (
        <div key={video.id} className="card bg-gray rounded shadow">
          <img src={video.files[0].url} alt={video.metadata.messageTitle} className="w-full h-auto" />
          <div className="p-4">
            <h2 className="text-xl font-bold">{video.metadata.messageTitle}</h2>
            <p>{video.description}</p>
            <ReactPlayer url={video.media.url} controls />
          </div>
        </div>
      ))}
    </div>
  )
}
