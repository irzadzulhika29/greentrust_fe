export const PRESS_BUTTON_VARIANTS = {
  secondary: {
    base: 'bg-[#FDA800] text-white hover:bg-[#e09700]',
    shadow: '0 4px 0 0 #b36d00',
    hoverShadow: '0 2px 0 0 #b36d00',
    pressShadow: '0 1px 0 0 #b36d00',
  },
  primary: {
    base: 'bg-[#205336] text-white hover:bg-[#173d28]',
    shadow: '0 4px 0 0 #0f2518',
    hoverShadow: '0 2px 0 0 #0f2518',
    pressShadow: '0 1px 0 0 #0f2518',
  },
  outline: {
    base: 'bg-white text-[#205336] border border-[#205336] hover:bg-[#e8f0eb]',
    shadow: '0 4px 0 0 #0f2518',
    hoverShadow: '0 2px 0 0 #0f2518',
    pressShadow: '0 1px 0 0 #0f2518',
  },
  'outline-orange': {
    base: 'bg-white text-[#FDA800] border border-[#FDA800] hover:bg-[#fff4d6]',
    shadow: '0 4px 0 0 #b36d00',
    hoverShadow: '0 2px 0 0 #b36d00',
    pressShadow: '0 1px 0 0 #b36d00',
  },
  ghost: {
    base: 'bg-white text-[#111111] border border-[#e5e4e0] hover:bg-[#f4f3ec]',
    shadow: '0 4px 0 0 #d1cfc9',
    hoverShadow: '0 2px 0 0 #d1cfc9',
    pressShadow: '0 1px 0 0 #d1cfc9',
  },
  danger: {
    base: 'bg-rose-500 text-white hover:bg-rose-600',
    shadow: '0 4px 0 0 #be123c',
    hoverShadow: '0 2px 0 0 #be123c',
    pressShadow: '0 1px 0 0 #be123c',
  },
}

export const getPressButtonVariant = (variant) =>
  PRESS_BUTTON_VARIANTS[variant] ?? PRESS_BUTTON_VARIANTS.secondary

export const getPressButtonMotion = (variant, disabled = false) =>
  disabled
    ? { whileHover: {}, whileTap: {} }
    : {
        whileHover: {
          y: 2,
          boxShadow: getPressButtonVariant(variant).hoverShadow,
        },
        whileTap: {
          y: 3,
          boxShadow: getPressButtonVariant(variant).pressShadow,
        },
      }
