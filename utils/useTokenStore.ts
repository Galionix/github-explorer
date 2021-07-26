import create from 'zustand'
import { persist } from 'zustand/middleware'

type StoreState = {
	token: string
	setToken: (token: string) => void
}

export const useTokenStore = create<StoreState>(
	persist(
		set => ({
			token: '',
			setToken: token => set({ token }),
		}),
		{
			name: 'user-storage',
		}
	)
)
