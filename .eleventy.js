const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, cls, sizes) {
  sizes = JSON.parse(sizes);
  let metadata = await Image(src, {
    widths: sizes,
    formats: ["avif", "jpeg", "svg"],
    outputDir: "./dist/assets/img",
    svgShortCircuit: true,
    urlPath: "/assets/img/"
  });

  let imageAttributes = {
    alt,
    class: cls,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch the CSS Output
  eleventyConfig.setBrowserSyncConfig({
    files: "./dist/css/**/*.css",
  })

  // Add Shortcode for Images
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
};
