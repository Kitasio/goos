// import adapter from '@sveltejs/adapter-static';

// export default {
// 	kit: {
// 		adapter: adapter({
// 			// default options are shown
// 			pages: 'build',
// 			assets: 'build',
// 			fallback: null
// 		})
// 	}
// };

import vercel from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: vercel()
	}
};