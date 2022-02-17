/* eslint-disable no-shadow */
const pathLib = require('path')

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = pathLib.resolve('src/templates/blog-post.js')
  const result = await graphql(`
    {
      allContentstackBlogPosts {
        nodes {
          title
          url
          locale
          publish_details {
            locale
          }
        }
      }
    }
  `)
  function createnewPage (path, comp, title, locale) {
    createPage({
      path: `${path}`,
      component: comp,
      context: {
        title,
        locale
      }
    })
  }
  result.data.allContentstackBlogPosts.nodes.forEach((node) => {
    let lang = ''
    if (node.publish_details.locale !== 'en-us') {
      lang = `/${node.publish_details.locale}`
    }
    createnewPage(`${lang}${node.url}`, blogPostTemplate, node.title, node.publish_details.locale)
  })
}
