<script lang="ts">
	import Search from '$icons/shapes/search.svelte';
	import Home from '$icons/shapes/home.svelte';
	import Explore from '$icons/shapes/explore.svelte';
	import Misc from '$icons/shapes/misc.svelte';
	import List from '$icons/shapes/list.svelte';
	import Schedule from '$icons/shapes/schedule.svelte';
	import Settings from '$icons/shapes/settings.svelte';
	import Forum from '$icons/shapes/forum.svelte';
	import AnimeCoreIcon from '$icons/logos/anime_core.svelte';
	import Register from '$icons/shapes/register.svelte';
	import Login from '$icons/shapes/login.svelte';
	import User from '$icons/shapes/user.svelte';
	import Preference from '$icons/shapes/preference.svelte';
	// Local
	const icon_mapping: {
		// Top,middle,bottom
		[key in 'top' | 'middle' | 'bottom' | 'profile']: {
			// Icon name
			[key in string]: {
				name?: string;
				icon: {
					component: any;
					class: string;
				};
				url?: string;
				show_on_mobile?: boolean | undefined;
			};
		};
	} = {
		top: {
			search: {
				icon: {
					component: Search,
					class: 'w-[1.25vw] text-black'
				}
			}
		},
		middle: {
			home: {
				icon: {
					component: Home,
					class: 'w-[1.25vw] text-white'
				},
				url: '/anime',
				show_on_mobile: true
			},

			explore: {
				icon: {
					component: Explore,
					class: 'w-[1.25vw] text-white'
				},
				url: '/anime/explore',
				show_on_mobile: true
			},
			list: {
				icon: {
					component: List,
					class: 'w-[1.7vw] text-white'
				},
				url: '/anime/list',
				show_on_mobile: false
			},
			schedule: {
				icon: {
					component: Schedule,
					class: 'w-[1.25vw] text-white'
				},
				url: '/anime/shedule',
				show_on_mobile: false
			},
			forum: {
				icon: {
					component: Forum,
					class: 'w-[1.25vw] text-white'
				},
				url: '/anime/forum',
				show_on_mobile: true
			}
		},
		bottom: {
			settings: {
				icon: {
					component: Settings,
					class: 'w-[1.25vw] text-white'
				},
				url: undefined
			},
			'misc.': {
				icon: {
					component: Misc,
					class: 'w-[1.25vw] text-white'
				},
				url: undefined
			}
		},
		profile: {
			profile: {
				url: '/profile',
				icon: {
					component: User,
					class: 'w-4 md:w-[1vw]'
				}
			},
			'my list': {
				url: '/my-list',
				icon: {
					component: List,
					class: 'w-4 md:w-[1vw]'
				}
			},
			prefernce: {
				url: '/prefernce',
				icon: {
					component: Preference,
					class: 'w-4 md:w-[1vw]'
				}
			}
		}
	};
</script>
