import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
  faPinterestP,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

/**
 * Share targets mirror the channels the weekly blast already goes out on, so a
 * reader arriving from one platform can pass the page along on any of them.
 */
export function shareTargets({ url, title, image }) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const targets = [
    {
      name: 'Facebook',
      icon: faFacebookF,
      variant: 'primary',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'X',
      icon: faXTwitter,
      variant: 'dark',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      icon: faLinkedinIn,
      variant: 'info',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: faEnvelope,
      variant: 'secondary',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ]

  // Pinterest requires an image to pin, so only offer it when the page has one.
  if (image) {
    targets.splice(3, 0, {
      name: 'Pinterest',
      icon: faPinterestP,
      variant: 'danger',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(
        image,
      )}&description=${encodedTitle}`,
    })
  }

  return targets
}

export default function ShareBar({ url, title, image, label = 'Share this' }) {
  const targets = shareTargets({ url, title, image })
  return (
    <div className="d-print-none my-4">
      <span className="text-muted me-2 small">{label}:</span>
      {targets.map((target) => (
        <Button
          key={target.name}
          href={target.href}
          variant={target.variant}
          size="sm"
          className="me-2 mb-1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share "${title}" on ${target.name}`}
        >
          <FontAwesomeIcon icon={target.icon} />
        </Button>
      ))}
    </div>
  )
}
