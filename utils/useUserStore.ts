import create from 'zustand'
import { persist } from 'zustand/middleware'

type StoreState = {
	user: any
	setUser: (user: any) => void
}

export const useUserStore = create<StoreState>(
	persist(
		set => ({
			user: null,
			setUser: user => set({ user }),
		}),
		{
			name: 'user-storage',
		}
	)
)
