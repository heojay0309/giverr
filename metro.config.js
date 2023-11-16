// // Learn more https://docs.expo.io/guides/customizing-metro

const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});
// fix many bug react lib error about style
config.resolver.sourceExts.push('mjs');
config.resolver.assetExts.push(['db', 'json', 'lottie']);

module.exports = config;
