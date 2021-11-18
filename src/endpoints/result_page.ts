import { escapeHtml, HttpResponse } from '../utils'
import { Storage } from '../common_types'
import renderLayout from '../view/layout'
import renderNotFoundPage from '../view/not_found_page'
import renderSocialHeaders from '../view/social_headers'

/**
 * Shows the collected signals and the fingerprint of the given visit
 */
export default async function resultPage(storage: Storage, visitId: string, requestUrl: string): Promise<HttpResponse> {
  const visit = await storage.finalizeAndGetVisit(visitId, true)
  if (!visit) {
    return renderNotFoundPage()
  }

  const fingerprintAge = Date.now() - visit.finalizedAt.getTime()

  const bodyHtml = `
${fingerprintAge > 5 * 60 * 1000 ? `warn` : ''}
<div class="fp-block" id="fp">
 ${escapeHtml(visit.fingerprint)}
</div>`
  return renderLayout({
    lowerHeadHtml: renderSocialHeaders(requestUrl, visit.fingerprint, ''),
    htmlTitle: '',
    bodyHtml,
  })
}
