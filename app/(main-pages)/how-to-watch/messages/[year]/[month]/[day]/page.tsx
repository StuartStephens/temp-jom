'use client';
import { Container } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import ReactPlayer from 'react-player';
import { useEffect, useState } from "react";

export default function Page() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [videoDetails, setVideoDetails] = useState<any>({});
    const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const API_ENDPOINT = 'https://lwcrmapi-mig2-east.azurewebsites.net/api/v2/Messages/GetMessages?org=joelosteen.com&feed=web';

        const fetchVideos = async () => {
            try {
                const response = await fetch(API_ENDPOINT);
                const data = await response.json();

                return data.hits;
            } catch (error) {
                console.error('Error fetching videos:', error);
                setError('Failed to load video details');
            }
        };

        const getVideos = async () => {
            const fetchedVideos = await fetchVideos();
            const video = fetchedVideos.find((video: any) => video.id === id);

            setVideoDetails(video);

            const remainingItems = fetchedVideos.filter((item: any) => item.id !== id);
            remainingItems.sort((a: any, b: any) => new Date(b.availableDate).getTime() - new Date(a.availableDate).getTime());

            const currentIndex = remainingItems.findIndex((item: any) => new Date(item.availableDate) < new Date(video.availableDate));

            let startIndex = Math.max(currentIndex + 3, 0);

            startIndex = Math.min(startIndex, Math.max(remainingItems.length - 3, 0));

            const relatedMessages = remainingItems.slice(currentIndex, startIndex);

            setRelatedVideos(relatedMessages);
        };

        getVideos();

    }, [id]);

    if (error) {
        return <Container fluid className="full-width"><h1>Error: {error}</h1></Container>;
    }

    if (videoDetails?.media?.url) {

        return (
            <>
                <Container fluid className="h-100 max-w-[1280px] w-5/6">
                    <div className="relative z-5">
                        <ReactPlayer
                            light={<img src={videoDetails.files[0].url} alt={videoDetails.metadata.messageTitle} />}
                            url={videoDetails.media.url}
                            controls
                            playing
                            width='100%'
                            height='100%'
                            playIcon={
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2">
                                    <div className="text-6xl i-mdi-play text-white " >
                                    </div></div>}
                        />
                    </div>
                    <div className="mt-12 flex flex-row w-11/12 mx-auto">
                        <div className="w-3/5 mr-4">
                            <p className="mb-6 uppercase">
                                <a href="/how-to-watch/messages" className="text-sm text-blue-600 font-bold">
                                    <div className="inline-block align-middle i-mdi-chevron-left" />
                                    Messages</a>
                            </p>
                            <h1 className="text-5xl font-light">{videoDetails.metadata.messageTitle}</h1>
                            <h2 className="uppercase text-lg mb-2 font-medium">{videoDetails.bios.speakers[0]}&apos;s message #{videoDetails.episode} - {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(videoDetails.availableDate))}</h2>
                            <div className="i-mdi-bookmark-outline text-2xl mb-4" />
                            <p>{videoDetails.description}</p>
                            <div className="flex flex-row text-lg my-4 text-gray-600">
                                <p className="font-medium">Share:</p>
                                <div className="font-bold mx-1 text-2xl i-mdi-facebook"></div>
                                <div className="font-bold mx-1 text-2xl i-mdi-twitter-circle"></div>
                                <div className="font-bold mx-1 text-2xl i-mdi-pinterest"></div>
                                <div className="font-bold mx-1 text-2xl i-mdi-email"></div>
                            </div>
                        </div>
                        <div className="mb-28 w-2/5 bg-blue-100 pa-8 text-gray-600">
                            <h4 className="text-xl font-bold mb-6">Donate to receive this message:</h4>
                            <p className="mb-4">We ask that you please help us deliver our messages to you and the rest of the world by supporting Joel Osteen Ministries.</p>
                            <hr />
                        </div>
                    </div >

                    <hr />

                    <div className="flex justify-between items-center">
                        <h5 className="my-6 text-3xl font-light">Related Messages</h5>
                        <a href="/how-to-watch/messages" className="uppercase float-right text-blue-600 font-bold">View all messages</a>
                    </div>

                    <div className="flex clear-both">
                        {relatedVideos.map((video: any) => (
                            <a key={video.id} href={`/how-to-watch/messages/${new Date(video.availableDate).getUTCFullYear()}/${(`0${new Date(video.availableDate).getUTCMonth() + 1}`).slice(-2)}/${(`0${new Date(video.availableDate).getUTCDate()}`).slice(-2)}?id=${video.pid}`}
                                className="mx-2"
                            >
                                <div className="relative">
                                    <img src={video.files[0].url} alt={video.metadata.messageTitle} className="mb-4" />
                                    <div
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2"
                                    >
                                        <div className="text-2xl i-mdi-play text-white" />
                                    </div>
                                </div>

                                <div className=" font-medium">
                                    <div className="flex flex-row justify-between items-start">
                                        <h4 className="mb-1 mt-0 font-medium text-2xl">{video.metadata.messageTitle}</h4>
                                        <div className="float-right i-mdi-bookmark-outline" ></div>
                                    </div>
                                    <div className="text-sm">{video.bios.speakers[0]}&apos;s message #{video.episode}</div>
                                    <div className="text-sm">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(video.availableDate))}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </Container >
                <div className="mt-4 py-8 bg-gray-300">
                    <Container fluid className="h-100 max-w-[1280px] w-5/6">
                        <div className="text-3xl text-center flex items-center justify-center"><div className="mr-2 font-thin inline-block i-radix-icons:plus-circled" />Join the Conversation</div>
                    </Container>
                </div>
            </>
        );
    }
    else {
        return <h1> Loading... </h1>
    }
}

