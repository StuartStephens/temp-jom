function generateStoreProduct(type, index) {
  const generic = generateGenericContent(type, index);
  let imgurl = "";
  switch (generic.contentType) {
    case "BOOK":
      imgurl =
        "https://lwcrmapi-mig2-east.azurewebsites.net/api/Product/ImageSrc/c26b58a7-f918-ed11-80f0-000d3a700f55";
      break;
    case "MUSIC":
      imgurl =
        "https://lwcrmapi-mig2-east.azurewebsites.net/api/Product/ImageSrc/3b3f070f-bbe5-eb11-80f1-000d3a7075d4";
      break;
    case "SERIES":
      imgurl =
        "https://lwcrmapi.lakewoodchurch.com/api/Product/ImageSrc/9a65af71-01aa-ec11-80ec-000d3a700f55";
      break;
    case "GIFT":
      imgurl =
        "https://lwcrmapi.lakewoodchurch.com/api/Product/ImageSrc/7f8121b4-800c-9ec9-b5d1-7c20e0445e2f";
      break;
  }
  return {
    ...generic,
    ...{
      AuthorOrProducer: generic.speaker,
      AvailableQuantity: 100,
      CreatedOn: generic.date,
      CurrentCategory: "",
      Description: "DESCRIPTIONS" + generic.contentType + "_" + index,
      Detail1: "DETAIL 1 for  " + generic.contentType + "_" + index,
      Detail2: "Details 2  for  " + generic.contentType + "_" + index,
      DisplayOrder: index,
      DownloadURL: generic.launchUrl,
      EndDate: "",
      Id: "SOME ID" + index,
      Image: {
        Url: imgurl,
        Title: generic.contentType + " IMAGE TITLE",
      },
      IsBackordered: false,
      IsDiscountAllowed: false,
      IsDonation: false,
      IsDownloadable: true,
      IsFeatured: true,
      IsNew: true,
      IsOnSale: true,
      IsPreorder: true,
      MSRP: 29.99,
      ModifedOn: "",
      Name: generic.title,
      Price: 25,
      SKU: "SKU 1234 " + index,
      Type: generic.contentType,
    },
  };
}
function generateBook(type, index) {
  return generateStoreProduct(type, index);
}
function generateMusic(type, index) {
  return generateStoreProduct(type, index);
}
function generateSeries(type, index) {
  return generateStoreProduct(type, index);
}
function generateGift(type, index) {
  return generateStoreProduct(type, index);
}

function generateShoutOfPraiseContent(type, index) {
  return {
    ...generateGenericContent(type, index),
    ...{
      contentType: type,
      thumbnailUrl:
        "http://www.joelosteen.com/contentassets/ddb0eb5bb0f048439eae44cb946ac9ec/jo004-1920x1080.png",
      title:
        contentType +
        " - " +
        (index % 2 == 0
          ? "Dreams" + index
          : "A title here that is fairly long of the following type and we need some text that is so long that it will wrap around and go to the next line. " +
            type +
            " " +
            index),
      speaker:
        index % 2 == 0
          ? "Joel Osteen"
          : index % 3 == 0
          ? "Jonathan Olsteen"
          : "Victoria Olsteen",
      //topic: (index % 2 == 0 ? "Dreams" : "Faith") + "_" + index,
      topics: topics,
      messageID: type + "_ID_" + index,
      date: "5/" + (1 + (index % 30)) + "/2023",
      bookmarkUrl: "#BOOKMARK_" + type + "_ID_" + index,
      launchUrl: "#LAUNCH_" + type + "_ID_" + index,
      availableFormats: ["Desktop/Tablet (Horozontal)", "Mobile (Vertical)"],
    },
  };
}
function generateDailyDevotion(type, index) {
  return {
    ...generateGenericContent(type, index),
    ...{
      prayer: {
        Data:
          "A PRAYER numbered" +
          index +
          " with some text so that we can see it in action",
      },
      scripture: {
        Data:
          "This represents the text of the scripture numbered for no apparent reason as " +
          index,
      },
      scriptureSource: "Psalm 118:" + index,
      name: "DEVOTIONAL NUMBER" + index,
    },
  };
}

//if we need to generate unique properties for a product
function generateContentItem(type, index) {
  switch (type) {
    case "BOOK":
      return generateBook(type, index);
    case "MUSIC":
      return generateMusic(type, index);
    case "SERIES":
      return generateSeries(type, index);
    case "GIFT":
      return generateGift(type, index);
    case "DEVOTIONAL":
      return generateDailyDevotion(type, index);
    case "PRAISE":
      return generateDailyDevotion(type, index);
    default:
      return generateGenericContent(type, index);
  }
  //return generateGenericContent(type, index);
}

function generateGenericContent(
  type, //: string,
  index //: number
) {
  //returns IContentListItem
  let topics =
    index % 2 == 0
      ? ["Dreams", "Bible"]
      : index % 3 == 0
      ? ["Dreams", "Bible", "Faith"]
      : ["Jesus"];
  return {
    id: type + "_ID_" + index,
    messageID: type + "_ID_" + index,
    contentType: type,
    thumbnailUrl:
      index % 2 == 0
        ? "http://www.joelosteen.com/contentassets/ddb0eb5bb0f048439eae44cb946ac9ec/jo004-1920x1080.png"
        : "https://www.joelosteen.com/globalassets/images/jom/how-to-watch/vo775blog-jpg.jpg",
    title:
      type +
      " " +
      index +
      " " +
      (index % 2 == 0
        ? "Dreams"
        : "A title here that is fairly long of the following type "),
    speaker: index % 2 == 0 ? "Joel Osteen" : "Victoria Osteen",
    //topic: (index % 2 == 0 ? "Dreams" : "Faith") + "_" + index,
    topics: topics,
    date: "5/" + (1 + (index % 30)) + "/2023",
    bookmarkUrl: "#BOOKMARK_" + type + "_ID_" + index,
    launchUrl: "#LAUNCH_" + type + "_ID_" + index,
  };
}
module.exports = {
  getDummyContent: function (
    contentType, // "MESSAGE" | "BLOG" | "ARTICLE";  //CONTENT_TYPES
    recordCount //number = 3
  ) {
    let retVal = [];

    for (var i = 0; i < recordCount; i++) {
      retVal.push(generateContentItem(contentType, i));
    }
    return retVal;
  },
};
