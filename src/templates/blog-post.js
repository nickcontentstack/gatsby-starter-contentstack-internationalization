/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import 'react-responsive-carousel/lib/styles/carousel.css'

const { Carousel } = require('react-responsive-carousel')

export default function Blogpost ({ data, location }) {
  const result = data.contentstackBlogPosts
  const headerData = data.contentstackHeader
  const footerData = data.contentstackFooter
  const lang = headerData.publish_details.locale
  function dateSetter (params) {
    const date = new Date(params)
    const yy = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
    const mm = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
    const dd = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
    return `${mm}-${dd}-${yy}`
  }

  function createContent (text, idx) {
    return (
      <div
        key={idx}
        dangerouslySetInnerHTML={{ __html: text }}
        className="blogPostContent"
      />
    )
  }
  function createCarousel (images, id) {
    return (
      <div key={id} className="imageCarousel">
        <h2 className="slideShowTitle">Slide Show</h2>

        <Carousel showThumbs={false} infiniteLoop showArrows>
          {images.map((image, idx) => (
            <img
              src={image.url}
              key={'K' * idx}
              style={{ width: '100%', height: '400px' }}
              alt={image.filename}
            />
          ))}
        </Carousel>
      </div>
    )
  }
  function createQuotes (quote, id) {
    return (
      <div className="blogQuotes" key={id}>
        <h2 className="quotesTitle">Blog Quotes</h2>
        <blockquote
          className="otro-blockquote"
          dangerouslySetInnerHTML={{ __html: quote }}
        />
      </div>
    )
  }
  function createSocialNetwork (code, id) {
    return (
      <div className="embededSocialCode" key={id}>
        <h2 className="socialTitle">Social Network</h2>

        <div
          className="singleQuotes"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </div>
    )
  }
  return (
    <Layout
      header={headerData}
      footer={footerData}
      seo={result.seo}
      lang={lang}
      location={location}
    >
      <div className="blogContainer">
        <div className="heroBanner">
          <ul>
            <li>
              <img
                src={result.hero_banner.banner_image.url}
                className="bannerImage"
                alt={result.hero_banner.banner_image.filename}
              />
              <div className="bannerContent">
                <h1>{result.title}</h1>
                <div>
                  <span className="blogPostTimeStamp">
                    {dateSetter(result.created_at)}
                  </span>
                  ,
                  <span className="blogpost-author">{result.author[0].title}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="blogContent">
          {result.blog_body.map((post) => Object.entries(post).map((entry, idx) => {
            if (entry[0] === 'rich_text_editor' && entry[1] !== null) {
              return createContent(entry[1].rich_text, idx)
            }
            if (entry[0] === 'image_carousel' && entry[1] !== null) {
              return createCarousel(entry[1].image, idx)
            }
            if (entry[0] === 'quotes' && entry[1] !== null) {
              return createQuotes(entry[1].quote, idx)
            }
            if (entry[0] === 'social_network' && entry[1] !== null) {
              return createSocialNetwork(entry[1].embedded_code, idx)
            }
          }))}
        </div>
      </div>
    </Layout>
  )
}
export const postQuery = graphql`
  query($title: String!, $locale: String!) {
    contentstackBlogPosts(title: { eq: $title }, publish_details: {locale: { eq: $locale}}) {
      url
      title
      publish_details {
        locale
      }
      seo {
        meta_title
      }
      hero_banner {
        banner_title
        banner_image {
          url
          filename
        }
      }
      blog_body {
        image_carousel {
          image {
            url
            filename
          }
        }
        quotes {
          quote
        }
        rich_text_editor {
          rich_text
        }
        social_network {
          embedded_code
        }
      }
      created_at(locale: "")
      author {
        title
      }
    }
    contentstackFooter(publish_details: {locale: { eq: $locale }}) {
      title
      copyright
      social {
        title
        social_links {
          fontawesome_class
          link {
            title
            href
          }
        }
      }
      publish_details {
        locale
      }
      group {
        address
        title
      }
    }
    contentstackHeader(publish_details: {locale: { eq: $locale }}) {
      title
      menu {
        link {
          title
          href
        }
      }
      publish_details {
        locale
      }
    }
  }
`
