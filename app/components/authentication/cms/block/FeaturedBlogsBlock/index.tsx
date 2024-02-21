import { IBlog, ISpeaker } from "../../../../../app/types";
import { FeaturedBlogs } from "../../../FeaturedBlog";
import { IXHTMLString } from "../../types/core/CoreTypes";

export interface IFeaturedBlogsBlockProps {}

export function FeaturedBlogsBlock(props: IFeaturedBlogsBlockProps) {
  const featuredBlog: IBlog = {
    id: "FEATURED1",
    author: {
      firstName: "Joel",
      lastName: "Olsteen",
    } as ISpeaker,
    content: {
      Data: "We all have times in life when we're at a disadvantage. We don't see how we can accomplish our dream, the medical report is not   good, or a child is off course. We’ve done all we can in our own  power, but nothing has changed. We’re dealing with the anxiety,   and it’s tempting to get discouraged and settle where we are. But   there is a supernatural flow that you can tap into. There is a  flow of healing that will turn the medical report around. There is   a flow of favor that will open doors and bring the right people.   There is a flow of freedom that will break the addiction. This   flow is within reach, but here’s the key: It has to be activated   by expecting God’s favor, by declaring His promises, by believing   He’s working when you don’t see any sign of it. ",
    } as IXHTMLString,
    overview: {
      Data: "We all have times in life when we're at a disadvantage. We don't see how we can accomplish our dream, the medical report is not   good, or a child is off course. We’ve done all we can in our own  power, but nothing has changed. We’re dealing with the anxiety,   and it’s tempting to get discouraged and settle where we are. But   there is a supernatural flow that you can tap into. There is a  flow of healing that will turn the medical report around. There is   a flow of favor that will open doors and bring the right people.   There is a flow of freedom that will break the addiction. This   flow is within reach, but here’s the key: It has to be activated   by expecting God’s favor, by declaring His promises, by believing   He’s working when you don’t see any sign of it. ",
    } as IXHTMLString,
    isFeatured: true,
    publishDate: "2-23-23",
    title: "A Supernatural Flow",
  };

  const additional_blog_1: IBlog = {
    id: "additional 1",
    author: {
      firstName: "Victoria",
      lastName: "Olsteen",
    } as ISpeaker,
    content: {
      Data: "<p>When I stand beneath the beautiful oak tree in my front yard and gaze up at its wide-spreading limbs that seem to span forever, it’s hard for me to comprehend that once upon a time a single acorn gave it birth. I see big and majestic and strong, but it had to start as a small seed. It makes me think about how God works in our lives. He takes the small, and He goes big.</p><p>You may be familiar with the story in Matthew 14. A crowd of thousands had followed Jesus to a remote place, and He had spent the whole day healing the sick. As evening approached, the disciples asked Jesus to send the people away so they could go into the villages and buy themselves food. But Jesus said, “That isn’t necessary—you feed them.” They said, “Sorry, but we only have five loaves of bread and two fish!” What the disciples thought was small, what they thought was too big to handle, was not a problem for Jesus. He said, “Bring them to Me.” “And He took the five loaves and the two fish, and looking up to heaven, He blessed and broke and gave the loaves to the disciples; and the disciples gave to the multitudes” (Matthew 14:19). Jesus took the small and let the disciples go big. He increased what they had in their hands to feed the multitudes.</p><p>God wants to increase us, but oftentimes we overlook the small things because we want to go big. We may even think that we don’t have to deal with something small because it’s not going to make that much difference anyway. It’s easy to think that how we’re treating our spouse or all the complaining we do about our job doesn’t really matter. Perhaps we go to the office late and leave early, thinking the boss isn’t looking. That may seem like small stuff, but God says our attitudes and what we believe are very important. The small things matter to Him, and if we don’t learn to handle the small, we’ll never go big. Perhaps you need to forgive someone or ask someone to forgive you for something you said. That may seem small, but it’s only through the “five loaves and two fish” that you can go big. You want a great marriage. You want the promotion. You have to do what’s right in the small things.</p><p>If you learn to handle the small things in your life, He’ll enlarge your capacity for more. The secret is to bring them all to Jesus. Let Him break them and bless them, and He’ll go big in your life. The next time He says, “You feed them,” just put those small things into His hands.</p>",
    } as IXHTMLString,
    overview: {
      Data: "This is a summary block of text",
    } as IXHTMLString,
    isFeatured: true,
    publishDate: "2-23-23",
    title: "The Small Is Big",
  };

  const additional_blog_2: IBlog = {
    id: "additional 2",
    author: {
      firstName: "Victoria",
      lastName: "Olsteen",
    } as ISpeaker,
    content: {
      Data: "<p>When I stand beneath the beautiful oak tree in my front yard and gaze up at its wide-spreading limbs that seem to span forever, it’s hard for me to comprehend that once upon a time a single acorn gave it birth. I see big and majestic and strong, but it had to start as a small seed. It makes me think about how God works in our lives. He takes the small, and He goes big.</p><p>You may be familiar with the story in Matthew 14. A crowd of thousands had followed Jesus to a remote place, and He had spent the whole day healing the sick. As evening approached, the disciples asked Jesus to send the people away so they could go into the villages and buy themselves food. But Jesus said, “That isn’t necessary—you feed them.” They said, “Sorry, but we only have five loaves of bread and two fish!” What the disciples thought was small, what they thought was too big to handle, was not a problem for Jesus. He said, “Bring them to Me.” “And He took the five loaves and the two fish, and looking up to heaven, He blessed and broke and gave the loaves to the disciples; and the disciples gave to the multitudes” (Matthew 14:19). Jesus took the small and let the disciples go big. He increased what they had in their hands to feed the multitudes.</p><p>God wants to increase us, but oftentimes we overlook the small things because we want to go big. We may even think that we don’t have to deal with something small because it’s not going to make that much difference anyway. It’s easy to think that how we’re treating our spouse or all the complaining we do about our job doesn’t really matter. Perhaps we go to the office late and leave early, thinking the boss isn’t looking. That may seem like small stuff, but God says our attitudes and what we believe are very important. The small things matter to Him, and if we don’t learn to handle the small, we’ll never go big. Perhaps you need to forgive someone or ask someone to forgive you for something you said. That may seem small, but it’s only through the “five loaves and two fish” that you can go big. You want a great marriage. You want the promotion. You have to do what’s right in the small things.</p><p>If you learn to handle the small things in your life, He’ll enlarge your capacity for more. The secret is to bring them all to Jesus. Let Him break them and bless them, and He’ll go big in your life. The next time He says, “You feed them,” just put those small things into His hands.</p>",
    } as IXHTMLString,
    overview: {
      Data: "This is a summary block of text",
    } as IXHTMLString,
    isFeatured: true,
    publishDate: "2-23-23",
    title: "The Small Is Big",
  };

  const additional_blog_3: IBlog = {
    id: "additional 3",
    author: {
      firstName: "Victoria",
      lastName: "Olsteen",
    } as ISpeaker,
    content: {
      Data: "<p>When I stand beneath the beautiful oak tree in my front yard and gaze up at its wide-spreading limbs that seem to span forever, it’s hard for me to comprehend that once upon a time a single acorn gave it birth. I see big and majestic and strong, but it had to start as a small seed. It makes me think about how God works in our lives. He takes the small, and He goes big.</p><p>You may be familiar with the story in Matthew 14. A crowd of thousands had followed Jesus to a remote place, and He had spent the whole day healing the sick. As evening approached, the disciples asked Jesus to send the people away so they could go into the villages and buy themselves food. But Jesus said, “That isn’t necessary—you feed them.” They said, “Sorry, but we only have five loaves of bread and two fish!” What the disciples thought was small, what they thought was too big to handle, was not a problem for Jesus. He said, “Bring them to Me.” “And He took the five loaves and the two fish, and looking up to heaven, He blessed and broke and gave the loaves to the disciples; and the disciples gave to the multitudes” (Matthew 14:19). Jesus took the small and let the disciples go big. He increased what they had in their hands to feed the multitudes.</p><p>God wants to increase us, but oftentimes we overlook the small things because we want to go big. We may even think that we don’t have to deal with something small because it’s not going to make that much difference anyway. It’s easy to think that how we’re treating our spouse or all the complaining we do about our job doesn’t really matter. Perhaps we go to the office late and leave early, thinking the boss isn’t looking. That may seem like small stuff, but God says our attitudes and what we believe are very important. The small things matter to Him, and if we don’t learn to handle the small, we’ll never go big. Perhaps you need to forgive someone or ask someone to forgive you for something you said. That may seem small, but it’s only through the “five loaves and two fish” that you can go big. You want a great marriage. You want the promotion. You have to do what’s right in the small things.</p><p>If you learn to handle the small things in your life, He’ll enlarge your capacity for more. The secret is to bring them all to Jesus. Let Him break them and bless them, and He’ll go big in your life. The next time He says, “You feed them,” just put those small things into His hands.</p>",
    } as IXHTMLString,
    overview: {
      Data: "This is a summary block of text",
    } as IXHTMLString,
    isFeatured: true,
    publishDate: "2-23-23",
    title: "The Small Is Big",
  };
  return (
    <>
      <FeaturedBlogs
        bannerProps={{
          backgroundImgUrl:
            "https://int.joelosteen.com/globalassets/images/jom/home/home-article-bg-png/largedisplay.png",
        }}
        featuredBlog={featuredBlog}
        additionalBlogs={[
          additional_blog_1,
          additional_blog_2,
          additional_blog_3,
        ]}
      />
    </>
  );
}
