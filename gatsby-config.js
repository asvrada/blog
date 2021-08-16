module.exports = {
  pathPrefix: `/blog`,
  siteMetadata: {
    title: `Mindscape`,
    description: `Jeff's blog about programming`,
    siteUrl: `https://asvrada.github.io/blog/`,
    social: {
      // twitter: ``,
    },
    theme: {
      avatar: `assets/img/triangle.svg`
    },
    postCategory: [
      {
        id: 0,
        name: "all",
        text: "All",
        color: ""
      },
      {
        id: 1,
        name: "code",
        text: "Code",
        color: "#7ed8e8"
      },
      {
        id: 2,
        name: "note",
        text: "Note",
        color: "#ffe300"
      },
      {
        id: 3,
        name: "life",
        text: "Life",
        color: "#57e357"
      },
      {
        id: 4,
        name: "leetcode",
        text: "LeetCode",
        color: "#7ed8e8"
      }]
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              prompt: {
                user: "jeff",
                host: "localhost",
                global: false
              }
            }
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`
  ]
};
