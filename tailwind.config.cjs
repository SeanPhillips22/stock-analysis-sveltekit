const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			tiny: '320px',
			xs: '350px',
			bp: '380px',
			diabp: '513px',
			xsm: '600px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1200px',
			xxl: '1280px',
			xxxl: '1440px',
			landscape: { raw: '(orientation: landscape)' }
		},
		extend: {
			gridTemplateColumns: {
				sidebar: 'minmax(0, 1fr) 300px',
				leftnav: 'auto minmax(0, 1fr)',
			},
			fontSize: {
				smaller: ['0.95rem', '1.35rem'],
				small: ['0.9rem', '1.3rem'],
				tiny: ['0.8rem', '1.15rem'],
				xxs: ['0.7rem', '0.9rem']
			},
			colors: {
				blue: {
					brand_sharp: 'rgba(44, 98, 136)',
					brand_light: 'rgba(60, 116, 212)',
					link: 'rgb(30, 115, 186, 1)',
					row_hover: 'rgba(242, 249, 255, 1)'
				}
			}
		}
	},

	plugins: []
}

module.exports = config
