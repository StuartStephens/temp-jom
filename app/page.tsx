import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Joel Osteen Ministries",
  icons: ["https://int.joelosteen.com/Areas/Jom/img/favicon.ico"],
};

// export default async function Home() {
//   return <>ROOT</>;
// }

export default async function RootPage() {
  // try {
  redirect("/home-page");
  // } catch (e) {
  //   console.error("ROOT PAGE REDIRECT", e);
  // }
  // ...
}
//
// 'use client';
// import React from 'react';
// // import ReactPlayer from 'react-player';
// import "./App.scss";
// import "bootstrap-icons/font/bootstrap-icons.min.css";
// import { Metadata } from "next";
// // import Banner from "../../components/shared/Banner/Banner";
// // import {
// //   PAGE_GUTTER,
// //   PageGutterLayout,
// // } from "../../components/shared/layouts/PageGutterLayout";
// import { IXHTMLString } from "./components/cms/types/core/CoreTypes";
// import { IBlog, ISpeaker } from "./types";
// // import { FeaturedBlogs } from "../../components/FeaturedBlog";
// // import { LastMessages } from "../../components/LastMessages";
// // import { LastMessagesBlock } from "../../components/cms/block/LastMessagesBlock";
// // import FeaturedContentCarousel from "../../components/FeaturedContentCarousel";
// // import { FeaturedContentCarouselBlock } from "../../components/cms/block/FeaturedContentCarouselBlock";
// // import { CommunityLayout } from "../../../src/layouts/CommunityLayout";
// // import { Community } from "../../components/Community";
//
// import ReactDOM from "react-dom/client";
// // import "./index.scss";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
//
// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   // <React.StrictMode>
//   <App />
//   // </React.StrictMode>
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
//
// // export const metadata: Metadata = {
// //   title: "Joel Osteen Ministries",
// //   icons: ["https://int.joelosteen.com/Areas/Jom/img/favicon.ico"],
// // };
//
//
//
// // const API_ENDPOINT = 'https://lwcrmapi-mig2-east.azurewebsites.net/api/v2/Messages/GetMessages?org=joelosteen.com&feed=web';
//
//
// export default function RootPage() {
//
//   const featuredBlog: IBlog = {
//     id: "FEATURED1",
//     author: {
//       firstName: "Joel",
//       lastName: "Olsteen",
//     } as ISpeaker,
//     content: {
//       Data: "We all have times in life when we're at a disadvantage. We don't see how we can accomplish our dream, the medical report is not   good, or a child is off course. We’ve done all we can in our own  power, but nothing has changed. We’re dealing with the anxiety,   and it’s tempting to get discouraged and settle where we are. But   there is a supernatural flow that you can tap into. There is a  flow of healing that will turn the medical report around. There is   a flow of favor that will open doors and bring the right people.   There is a flow of freedom that will break the addiction. This   flow is within reach, but here’s the key: It has to be activated   by expecting God’s favor, by declaring His promises, by believing   He’s working when you don’t see any sign of it. ",
//     } as IXHTMLString,
//     overview: {
//       Data: "We all have times in life when we're at a disadvantage. We don't see how we can accomplish our dream, the medical report is not   good, or a child is off course. We’ve done all we can in our own  power, but nothing has changed. We’re dealing with the anxiety,   and it’s tempting to get discouraged and settle where we are. But   there is a supernatural flow that you can tap into. There is a  flow of healing that will turn the medical report around. There is   a flow of favor that will open doors and bring the right people.   There is a flow of freedom that will break the addiction. This   flow is within reach, but here’s the key: It has to be activated   by expecting God’s favor, by declaring His promises, by believing   He’s working when you don’t see any sign of it. ",
//     } as IXHTMLString,
//     isFeatured: true,
//     publishDate: "2-23-23",
//     title: "A Supernatural Flow",
//   };
//
//   const additional_blog_1: IBlog = {
//     id: "additional 1",
//     author: {
//       firstName: "Victoria",
//       lastName: "Olsteen",
//     } as ISpeaker,
//     content: {
//       Data: "<p>When I stand beneath the beautiful oak tree in my front yard and gaze up at its wide-spreading limbs that seem to span forever, it’s hard for me to comprehend that once upon a time a single acorn gave it birth. I see big and majestic and strong, but it had to start as a small seed. It makes me think about how God works in our lives. He takes the small, and He goes big.</p><p>You may be familiar with the story in Matthew 14. A crowd of thousands had followed Jesus to a remote place, and He had spent the whole day healing the sick. As evening approached, the disciples asked Jesus to send the people away so they could go into the villages and buy themselves food. But Jesus said, “That isn’t necessary—you feed them.” They said, “Sorry, but we only have five loaves of bread and two fish!” What the disciples thought was small, what they thought was too big to handle, was not a problem for Jesus. He said, “Bring them to Me.” “And He took the five loaves and the two fish, and looking up to heaven, He blessed and broke and gave the loaves to the disciples; and the disciples gave to the multitudes” (Matthew 14:19). Jesus took the small and let the disciples go big. He increased what they had in their hands to feed the multitudes.</p><p>God wants to increase us, but oftentimes we overlook the small things because we want to go big. We may even think that we don’t have to deal with something small because it’s not going to make that much difference anyway. It’s easy to think that how we’re treating our spouse or all the complaining we do about our job doesn’t really matter. Perhaps we go to the office late and leave early, thinking the boss isn’t looking. That may seem like small stuff, but God says our attitudes and what we believe are very important. The small things matter to Him, and if we don’t learn to handle the small, we’ll never go big. Perhaps you need to forgive someone or ask someone to forgive you for something you said. That may seem small, but it’s only through the “five loaves and two fish” that you can go big. You want a great marriage. You want the promotion. You have to do what’s right in the small things.</p><p>If you learn to handle the small things in your life, He’ll enlarge your capacity for more. The secret is to bring them all to Jesus. Let Him break them and bless them, and He’ll go big in your life. The next time He says, “You feed them,” just put those small things into His hands.</p>",
//     } as IXHTMLString,
//     overview: {
//       Data: "This is a summary block of text",
//     } as IXHTMLString,
//     isFeatured: true,
//     publishDate: "2-23-23",
//     title: "The Small Is Big",
//   };
//
//   const fetchVideos = async () => {
//     try {
//       const response = await fetch(API_ENDPOINT);
//       const data = await response.json();
//       return data.hits;
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//     }
//   };
//
//
//   // useEffect(() => {
//   //   const getVideos = async () => {
//   //     const fetchedVideos = await fetchVideos();
//   //     setVideos(fetchedVideos);
//   //   };
//   //
//   //   getVideos();
//   // }, []);
//
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2">
//
//       {/* videos?.map(video => (
//         <div key={video.id} className="card bg-gray rounded shadow">
//           <img src={video.files[0].url} alt={video.metadata.messageTitle} className="w-full h-auto" />
//           <div className="p-4">
//             <h2 className="text-xl font-bold">{video.metadata.messageTitle}</h2>
//             <p>{video.description}</p>
//             <ReactPlayer url={video.media.url} controls />
//           </div>
//         </div>
//       )) */}
//     </div>
//   )
// }
