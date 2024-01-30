// const main = require("./db.json");
// const book = require("./products/books.json");
// const music = require("./products/music.json");
// const series = require("./products/series.json");
// const gift = require("./products/gifts.json");

// const menustate = require("./menustates.json");
const menustate_root = require("./menustates/menustate-root.json");
const menustate_home = require("./menustates/menustate-home.json");
const menustate_our_ministry = require("./menustates/menustate-our-ministry.json");
const menustate_community = require("./menustates/menustate-community.json");
const menustate_watch = require("./menustates/menustate-watch.json");
const menustate_inspiration = require("./menustates/menustate-inspiration.json");
const menustate_store = require("./menustates/menustate-store.json");
const menustate_login = require("./menustates/menustate-login.json");
const menustate_manage_account = require("./menustates/menustate-manage-account.json");
const menustate_manage_information = require("./menustates/menustate-manage-information.json");

const page_home = require("./pages/home.json");
const page_aco = require("./pages/aco.json");
const page_inspiration = require("./pages/inspiration.json");
const page_community = require("./pages/community.json");
const page_watch = require("./pages/watch.json");
const page_manage_account = require("./pages/manage-account.json");
const page_our_ministry = require("./pages/our-ministry.json");
const page_store = require("./pages/store.json");
const component_types = require("./componenttypes/componenttypes.json");

// Something more
const content = require("./products/content");
// import { getDummyContent } from "./products/content";

const messages = content.getDummyContent("MESSAGE", 10);
const articles = content.getDummyContent("ARTICLE", 10);
const blogs = content.getDummyContent("BLOG", 10);
const wallpapers = content.getDummyContent("WALLPAPER", 10);
const dailyDevotionals = content.getDummyContent("DEVOTIONAL", 10);
const praises = content.getDummyContent("PRAISE", 10);
const prayers = content.getDummyContent("PRAYER", 10);

const books = content.getDummyContent("BOOK", 10);
const music = content.getDummyContent("MUSIC", 10);
const series = content.getDummyContent("SERIES", 10);
const gifts = content.getDummyContent("GIFT", 10);

console.log("BOOKS", books);

const cb = { ...messages };
module.exports = () => ({
  book: books,
  music: music,
  series: series,
  gift: gifts,
  //product: { ...books, ...music, ...series, ...gifts }, //gets all products
  message: messages,
  article: articles,
  blog: blogs,
  wallpaper: wallpapers,
  devotional: dailyDevotionals,
  content: [
    ...messages,
    ...articles,
    ...blogs,
    ...wallpapers,
    ...dailyDevotionals,
  ],
  menustate: [
    menustate_root,
    menustate_home,
    menustate_our_ministry,
    menustate_community,
    menustate_inspiration,
    menustate_watch,
    menustate_store,
    menustate_login,
    menustate_manage_account,
    menustate_manage_information,
  ],
  page: [
    ...page_home,
    ...page_aco,
    ...page_inspiration,
    ...page_community,
    ...page_watch,
    ...page_manage_account,
    ...page_our_ministry,
    ...page_store,
  ],
  component: component_types,
  shoutofpraise: praises,
  prayer: prayers,
  // menustate: menustate,
});
