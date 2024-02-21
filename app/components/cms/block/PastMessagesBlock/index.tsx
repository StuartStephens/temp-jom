"use client";
import { useEffect, useState } from "react";
import {
  IPastContentBlockProps,
  IPastContentFilter,
} from "../../../../types";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../../components/shared/layouts/PageGutterLayout";

export interface IPastMessagesBlockProps extends IPastContentBlockProps { }

export function PastMessagesBlock(props: IPastMessagesBlockProps) {
  const [filterValues, setFilterValues] = useState<
    IPastContentFilter | undefined
  >(props.filterProps);

  const API_ENDPOINT = 'https://lwcrmapi-mig2-east.azurewebsites.net/api/v2/Messages/GetMessages?org=joelosteen.com&feed=web';

  const fetchVideos = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      return data.hits;
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    const getVideos = async () => {
      const fetchedVideos = await fetchVideos();
      setPastMessages(fetchedVideos);
    };

    getVideos();
  }, []);

  const [pastMessages, setPastMessages] = useState<any>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2">
      {pastMessages?.map((video: any) => (
        <div key={video.id} className="card rounded hover:shadow hover:pointer">

          <a href={`/how-to-watch/messages/${new Date(video.availableDate).getUTCFullYear()}/${(`0${new Date(video.availableDate).getUTCMonth() + 1}`).slice(-2)}/${(`0${new Date(video.availableDate).getUTCDate()}`).slice(-2)}?id=${video.pid}`}>
            <img src={video.files[0].url} alt={video.metadata.messageTitle} className="w-full h-auto" />
          </a>

          <div className="p-4">
            <div className="flex flex-row justify-between">
              <h2 className="mb-2 text-3xl font-bold">{video.metadata.messageTitle}</h2>
              <div className="float-right i-mdi-bookmark-outline" ></div>
            </div>

            <div>{video.bios.speakers[0]}&apos;s message #{video.episode} - {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(video.availableDate))}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
