import { HttpResponse } from '../utils'
import renderPage, { Options as PageOptions } from './page'

export interface Options extends PageOptions {
  wideSubBodyHtml?: string
}

/**
 * A generic page layout that includes the page paddings and the footer
 */
export default function renderLayout({ bodyHtml = '', wideSubBodyHtml, ...options }: Options): HttpResponse {
  return renderPage({
    ...options,
    bodyHtml: `<div>${bodyHtml}</div>`,
  })
}
