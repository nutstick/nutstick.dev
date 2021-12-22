/* eslint-disable max-len */

import cx from 'classnames'
import {
  themeDark as colorDark,
  themeLight as colorLight,
  colors,
} from './colors.css'
import { blog, deck, dimensions } from './dimensions.css'

export const themeLight = cx(colorLight, blog)

export const themeDark = cx(colorDark, blog)

export const deckThemeLight = cx(colorLight, deck)

export const deckThemeDark = cx(colorDark, deck)

export const vars = {
  dimensions,
  ...colors,
}
