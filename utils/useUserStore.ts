import { StoreState } from '@/ts/interfaces'
import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create<StoreState>(
	persist(
		set => ({
			user: null,
			setUser: user => set({ user }),
			sessionLoading: false,
			setSessionLoading: sessionLoading =>
				set({ sessionLoading }),
			pageSize: 5,
			setPageSize: (pageSize: number) =>
				set({ pageSize }),
			orderDirection: 'ASC',
			setOrderDirection: (
				orderDirection: string
			) => set({ orderDirection }),
			sortingField: 'STARGAZERS',
			setSortingField: (sortingField: string) =>
				set({ sortingField }),
			ownerFilter: '',
			setOwnerFilter: (ownerFilter: string) =>
				set({ ownerFilter }),
			repoNameSearch: '',
			setRepoNameSearch: (
				repoNameSearch: string
			) => set({ repoNameSearch }),
		}),
		{
			name: 'user-storage',
		}
	)
)
 