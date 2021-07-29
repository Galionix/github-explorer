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
		}),
		{
			name: 'user-storage',
		}
	)
)
