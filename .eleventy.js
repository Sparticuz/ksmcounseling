module.exports = function(eleventyConfig) {
  // Copy `css` to `_site/css`
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
    return {
      dir: {
        input: "src",
        output: "dist"
      }
    }
  };
