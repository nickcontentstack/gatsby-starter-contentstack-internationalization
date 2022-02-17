/* eslint-disable no-console */
/* eslint-disable no-lonely-if */
/* eslint-disable prefer-template */
import React from 'react'
import { Link, navigate } from 'gatsby'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const masterLocaleCode = 'en-us'
const langArray = [
  { label: 'English', value: 'en-us' },
  { label: 'Spanish', value: 'es-es' }
]
const changeLanguage = (option, location, lang) => {
  const path = location.pathname
  if (option.value === lang) return
  let sanitizedPath = ''
  if (option.value !== masterLocaleCode) {
    if (lang === masterLocaleCode) {
      sanitizedPath = `/${option.value + path}`
    } else {
      const pathWithoutLocale = `${path.substring(`/${lang}`.length, path.length)}`
      sanitizedPath = `/${option.value + pathWithoutLocale}`
    }
  } else {
    sanitizedPath = `${path.substring(`/${lang}`.length, path.length)}`
  }
  navigate(sanitizedPath)
}

// eslint-disable-next-line react/prop-types
const Header = ({ header, lang, location }) => (
  <div className="header">
    <div
      style={{
        display: 'flex',
        margin: '0 auto',
        maxWidth: '960px',
        padding: '0.55rem 2.0875rem',
        justifyContent: 'space-between'
      }}
    >
      <div className="display-flex">
        {
           // eslint-disable-next-line react/prop-types
          header.menu.map((nav, idx) => (
          <Link
            className="float-left margin-left"
            to={`${lang !== 'en-us' ? '/' + lang : ''}${nav.link.href}`}
            key={idx}
          >
            {nav.link.title}
          </Link>
          ))}
      </div>
      <div className="display-flex">
        <Dropdown
          options={langArray}
          className="margin-right"
          onChange={(option) => { changeLanguage(option, location, lang) }}
          value={lang}
        />
      </div>
    </div>
  </div>
)

export default Header
