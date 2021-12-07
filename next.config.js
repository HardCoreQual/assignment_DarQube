/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // TODO: require copy all images on own hosting, for not lost, and next-js require list of hostings in next.config, it's need be predefined
    domains: [
      'static.seekingalpha.com',
      'www.nasdaq.com',
      'images.mktw.net',
      'images.barrons.com',
      'cdn.benzinga.com',
      'images.wsj.net',
      'si.wsj.net',
      'static3.seekingalpha.com',
      's.wsj.net'
    ],
  },
}
