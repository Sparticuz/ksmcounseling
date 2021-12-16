const Image = require("@11ty/eleventy-img");
// const purgeCssPlugin = require("eleventy-plugin-purgecss");

const imageShortcode = async (src, alt, cls, sizes) => {
  sizes = JSON.parse(sizes);
  let metadata = await Image(src, {
    widths: sizes,
    formats: ["avif", "jpeg", "svg"],
    outputDir: "./_site/assets/img",
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

module.exports = function (eleventyConfig) {
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");

  // eleventyConfig.addPlugin(purgeCssPlugin, {});

  // Watch the CSS Output
  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/css/**/*.css",
  })

  // Add Shortcode for Images
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  return {
    dir: {
      input: "src",
    }
  }
};
