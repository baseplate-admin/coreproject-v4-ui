<script lang="ts">
	import VercelHover from "$components/vercel_hover.svelte";
	import { createAuthStore } from "$stores/auth.svelte";
	import { page } from "$app/stores";
	import { cn } from "$functions/classnames";
	import { blur } from "svelte/transition";
	import { t } from "$lib/translations";
	import Modals from "$modals/index.svelte";
	import { createModalStore } from "$stores/modals.svelte";
	import { url_matches_with_pathname } from "$functions/urls/url_matches_with_pathname";

	const modal_store = createModalStore(),
		auth_store = createAuthStore();

	// Local
	const icon_mapping: {
		// Top,middle,bottom
		[key in "top" | "middle" | "bottom" | "profile"]: {
			// Icon name
			[key in string]: {
				name?: string;
				icon: {
					component: string;
					class?: string;
				};
				url?: string;
				show_on_mobile?: boolean | undefined;
			};
		};
	} = {
		top: {
			search: {
				icon: {
					component: `<coreproject-shape-search class="size-[1.25vw]"></coreproject-shape-search>`
				}
			}
		},
		middle: {
			home: {
				icon: {
					component: `<coreproject-shape-home class="size-[1.25vw]"></coreproject-shape-home>`
				},
				url: "/anime",
				show_on_mobile: true
			},

			explore: {
				icon: {
					component: `<coreproject-shape-compass class="size-[1.25vw]"></coreproject-shape-compass>`
				},
				url: "/anime/explore",
				show_on_mobile: true
			},
			list: {
				icon: {
					component: `<coreproject-shape-menu class="size-[1.25vw]"></coreproject-shape-menu>`
				},
				url: "/anime/list",
				show_on_mobile: false
			},
			schedule: {
				icon: {
					component: `<coreproject-shape-calendar class="size-[1.25vw]"></coreproject-shape-calendar>`
				},
				url: "/anime/shedule",
				show_on_mobile: false
			},
			forum: {
				icon: {
					component: `<coreproject-shape-forum class="size-[1.25vw]"></coreproject-shape-forum>`
				},
				url: "/anime/forum",
				show_on_mobile: true
			}
		},
		bottom: {
			settings: {
				icon: {
					component: `<coreproject-shape-settings variant='filled' class="size-[1.25vw]"></coreproject-shape-settings>`
				},
				url: undefined
			},
			misc: {
				icon: {
					component: `<coreproject-shape-help-circle class="size-[1.25vw]"></coreproject-shape-help-circle>`
				},
				url: undefined
			}
		},
		profile: {
			profile: {
				url: "/profile",
				icon: {
					component: `<coreproject-shape-user class="size-4 md:size-[1vw]"></coreproject-shape-user>`
				}
			},
			"my list": {
				url: "/my-list",
				icon: {
					component: `<coreproject-shape-menu class="size-4 md:size-[1vw]"></coreproject-shape-menu>`
				}
			},
			prefernce: {
				url: "/prefernce",
				icon: {
					component: `<coreproject-shape-preference class="size-4 md:size-[1vw]"></coreproject-shape-preference>`
				}
			}
		}
	};
</script>

<Modals />
<div class="relative flex h-dvh w-full flex-col bg-secondary">
	<header
		class="absolute top-0 z-10 flex h-[4.5rem] w-full flex-none items-center justify-between bg-secondary/95 px-4 backdrop-blur-3xl md:static md:h-[5vw] md:bg-secondary md:px-[1.75vw] md:py-[1vw]"
	>
		<a href="/">
			<coreproject-shape-logo class="w-9 md:w-[2.25vw]"></coreproject-shape-logo>
		</a>
		<div class="relative flex items-center md:static">
			<div class="absolute left-1/2 -translate-x-1/2">
				<a href="/anime" class="hidden md:flex">
					<coreproject-logo-animecore class="w-[10vw]"></coreproject-logo-animecore>
				</a>
				<div>
					<form class="relative flex h-12 w-[65vw] items-center md:hidden">
						<button class="btn absolute left-4 border-none !bg-transparent p-0" aria-label="Search">
							<coreproject-shape-search class="w-5"></coreproject-shape-search>
						</button>
						<input
							type="text"
							placeholder="Search for animes, mangas..."
							class="h-full w-full rounded-lg border-none bg-neutral pl-12 text-base font-semibold text-accent shadow-lg !ring-0 placeholder:font-medium"
						/>
					</form>
				</div>
			</div>
		</div>
		{#if auth_store.state}
			<div class="dropdown dropdown-end">
				<div tabIndex={0} role="button" class="btn border-none !bg-transparent p-0">
					<img
						alt=""
						src="https://github.com/AKindWorld.png"
						class="size-12 rounded-lg md:size-[3vw] md:rounded-[0.5vw]"
					/>
				</div>
				<div
					role="button"
					tabIndex={0}
					class="menu dropdown-content top-14 z-20 min-w-48 rounded-lg bg-neutral p-4 md:top-[4vw] md:min-w-[12vw] md:rounded-[0.75vw] md:p-[0.5vw] md:text-[0.9vw]"
				>
					<!-- profile dropdown card -->
				</div>
			</div>
		{:else}
			<div class="hidden md:flex md:gap-[0.75vw]">
				<a
					href="/user/register"
					class="btn btn-neutral h-max min-h-max leading-none md:rounded-[0.75vw] md:p-[0.9vw] md:text-[1vw]"
				>
					{$t("common.navbar.register")}
				</a>
				<a
					href="/user/login"
					class="btn btn-primary h-max min-h-max leading-none text-accent md:rounded-[0.75vw] md:p-[0.9vw] md:text-[1vw]"
				>
					{$t("common.navbar.login")}
				</a>
			</div>

			<div class="dropdown dropdown-end flex md:hidden">
				<div role="button" class="avatar btn border-none !bg-transparent p-0">
					<div class="w-12 rounded-lg md:w-[3vw] md:rounded-[0.5vw]">
						<img
							alt=""
							src="https://i.pinimg.com/1200x/a8/2d/aa/a82daa4b726d8f02d8ce28f3e3b3677a.jpg"
						/>
					</div>
				</div>
				<div
					role="button"
					class="z-1 menu dropdown-content top-14 flex min-w-36 flex-col gap-3 rounded-lg bg-base-100 p-4"
				>
					<li>
						<a
							href="/user/login"
							class="flex items-center gap-3 !bg-transparent p-0 leading-none !text-white"
						>
							<coreproject-shape-login class="w-4 md:w-[1vw]"></coreproject-shape-login>
							{$t("common.navbar.login")}
						</a>
					</li>
					<li>
						<a
							href="/user/register"
							class="flex items-center gap-3 !bg-transparent p-0 leading-none !text-white"
						>
							<coreproject-shape-register class="w-4 md:w-[1vw]"></coreproject-shape-register>
							{$t("common.navbar.register")}
						</a>
					</li>
				</div>
			</div>
		{/if}
	</header>
	<div class="flex flex-1 overflow-hidden">
		<aside
			class="hidden w-[6vw] flex-col justify-between overflow-y-auto overflow-x-hidden py-[2vw] md:flex"
		>
			<div>
				<div class="flex flex-col items-center">
					<button
						class="btn btn-warning size-[3vw] min-h-full rounded-[0.75vw] p-0"
						onclick={() => {
							modal_store.open_modal("search");
						}}
					>
						<coreproject-shape-search class="size-[1.25vw]"></coreproject-shape-search>
					</button>
				</div>

				<VercelHover
					glider_container_class="mt-[2.8125vw] flex flex-col items-center gap-[0.75vw]"
					active_element_class="rounded-[1vw] bg-white/10"
					direction="vertical"
					GLIDER_TRANSITION_DURATION={200}
				>
					{#snippet children(handle_mouse_enter, handle_mouse_leave)}
						{#each Object.entries(icon_mapping.middle) as item}
							{@const item_name = item[0]}
							{@const item_icon = item[1]?.icon}
							{@const item_href = item[1]?.url}

							{@const is_active = url_matches_with_pathname({
								url: item_href,
								pathname: $page.url.pathname
							})}

							<a
								onmouseenter={handle_mouse_enter}
								onmouseleave={handle_mouse_leave}
								href={item_href}
								class="{cn(
									'btn relative size-[4vw] min-h-max rounded-[1vw] border-none p-0',
									is_active
										? 'relative !bg-accent before:absolute before:-left-[0.55vw] before:z-10 before:h-[1.25vw] before:w-[0.25vw] before:rounded-full before:bg-primary'
										: '!bg-transparent'
								)} "
							>
								<div class="inline-grid">
									{#if is_active}
										<div
											transition:blur
											class="absolute inset-0 flex flex-col items-center justify-center gap-[0.5vw]"
										>
											<icon class="!text-secondary">
												{@html item_icon.component}
											</icon>
										</div>
									{:else}
										<div
											transition:blur
											class="absolute inset-0 flex flex-col items-center justify-center gap-[0.5vw]"
										>
											<icon class="!text-white">
												{@html item_icon.component}
											</icon>

											<span class="text-[0.75vw] font-semibold capitalize leading-[1.05vw]">
												{$t(`common.sidebar.${item_name}`)}
											</span>
										</div>
									{/if}
								</div>
							</a>
						{/each}
					{/snippet}
				</VercelHover>
			</div>
			<div class="flex flex-col items-center">
				{#each Object.entries(icon_mapping.bottom) as item}
					{@const item_icon = item[1].icon}
					{@const item_name = item[0]}

					<button
						type="button"
						class="btn h-[4vw] w-[4vw] flex-col justify-center gap-[0.45vw] border-none !bg-transparent p-0 text-sm"
					>
						{@html item_icon.component}

						<span class="!m-0 text-[0.75vw] font-semibold capitalize leading-[1.05vw]">
							{$t(`common.sidebar.${item_name}`)}
						</span>
					</button>
				{/each}
			</div>
		</aside>
		<div id="page" class="w-full overflow-y-scroll">
			<slot />
		</div>
	</div>
</div>
