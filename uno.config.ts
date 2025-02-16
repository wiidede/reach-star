import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-yellow-400 text-white cursor-pointer hover:bg-yellow-300 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['the-icon-primary', 'inline-block select-none transition opacity-100 hover:opacity-75'],
    ['the-icon', 'inline-block select-none'],
    ['line-warp', 'whitespace-pre-wrap break-words'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Nunito',
        serif: 'Nunito',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
  rules: [
    [/^flex-(\d+)$/, ([, d]) => ({ flex: `${Number(d)}` })],
    [/^text-uno-(\d+)$/, ([, d]) => ({ color: `rgb(var(--primary-${Number(d)}))` })],
    [/^bg-uno-(\d+)$/, ([, d]) => ({ 'background-color': `rgb(var(--primary-${Number(d)}))` })],
    [/^border-uno-(\d+)$/, ([, d]) => ({ 'border-color': `rgb(var(--primary-${Number(d)}))` })],
    [/^transition-size-(\d+)$/, ([, d]) => ({
      'transition-property': 'height, width, font-size',
      'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'transition-duration': `${Number(d)}ms`,
    })],
  ],
})
