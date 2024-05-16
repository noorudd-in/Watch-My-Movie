'use client'
import { TypeAnimation } from 'react-type-animation';

const GlobalHeader = () => {
  return (
    <TypeAnimation
      sequence={[
        'Created by Nooruddin Shaikh',
        (el) => el?.addEventListener('click', () => window.open('https://linkedin.com/in/nooruddin-shaikh')),
        3000,
        'Created with NextJS',
        3000,
        'Created with Typescript',
        3000,
        'Created with Zustand',
        3000,
        'Created with Tailwind CSS',
        3000,
        'Created with Shadcdn/ui',
        3000,
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{textDecoration: 'underline', textUnderlineOffset: '4px'}}
    />
  )
}

export default GlobalHeader