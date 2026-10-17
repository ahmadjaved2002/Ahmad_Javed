import { useId } from 'react';

/**
 * The portfolio's visual signature: concentric rings, a rotating text ring,
 * a crosshair and one lime point. Used in the hero and echoed in the final scene.
 * Pure SVG, no images, no 3D.
 */
export default function Orb({
  className = '',
  label = 'FRONTEND DEVELOPER • INTERFACES • MOTION • SYSTEMS • ',
  ...rest
}) {
  const pathId = `orb-ring-${useId().replace(/:/g, '')}`;
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" aria-hidden="true" focusable="false" {...rest}>
      <g data-orb-parallax>
        <circle cx="200" cy="200" r="192" stroke="#262626" />
        <circle cx="200" cy="200" r="140" stroke="#262626" />
        <circle cx="200" cy="200" r="88" stroke="#262626" strokeDasharray="2 6" />
        <path d="M200 8V392M8 200H392" stroke="#1d1d1d" />
        <path d="M200 8A192 192 0 0 1 392 200" stroke="#C6FF4D" strokeOpacity="0.55" />

        <g>
          <defs>
            <path id={pathId} d="M200 200m-166 0a166 166 0 1 1 332 0a166 166 0 1 1 -332 0" />
          </defs>
          <text fill="#929292" fontFamily="JetBrains Mono, monospace" fontSize="12" letterSpacing="2">
            <textPath href={`#${pathId}`} textLength="1030" lengthAdjust="spacing">
              {label}
            </textPath>
          </text>
        </g>

        <g data-orb-dot>
          <circle cx="200" cy="200" r="30" stroke="#C6FF4D" strokeOpacity="0.35" />
          <circle cx="200" cy="200" r="9" fill="#C6FF4D" />
        </g>
      </g>
    </svg>
  );
}
