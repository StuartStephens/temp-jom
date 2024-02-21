/** @type {import('next').NextConfig} */
module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://lwcrmapi-mig2.lakewoodchurch.com/api/:path*",
      },
      {
        source: "/jom/:path*",
        destination: "https://int.joelosteen.com/jom/:path*",
      },
      {
        source: "/jomapi/:path*",
        destination: "https://localhost:4000/:path*",
      },
    ];
  };
  return {
    rewrites,
    sassOptions: {
      logger: {
        warn: function(message) {
          console.warn(message);
        },
        debug: function(message) {
          console.log(message);
        },
      },
    },
  };
};
