import ThemeWrapper from '../src/components/hoc/styledTheme'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}

// .storybook/preview.js

import React from 'react'
import { Helmet } from 'react-helmet'

export const decorators = [
  Story => (
    <>
      <Helmet>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap'
          rel='stylesheet'
        />
        <script
          src='https://kit.fontawesome.com/acc0890c64.js'
          crossorigin='anonymous'
        ></script>
      </Helmet>
      <ThemeWrapper>
        <div
          id='app'
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column',
            background: '#E9ECEE',
            padding: '1rem'
          }}
        >
          <Story />
        </div>
      </ThemeWrapper>
    </>
  )
]
