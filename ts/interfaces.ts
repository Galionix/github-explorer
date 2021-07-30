import { DefaultSession } from 'next-auth'
import { Column } from 'react-table'

export interface Session extends DefaultSession {
	// type AuthenticatedUser = {
	user?: {
		login?: string
		user?: string
		picture?: string
		accessToken?: string
		name?: string | null
		email?: string | null
		image?: string | null
	}
	// }
}

export interface TableProps {
	data: Node[]
	// columns: Column<RepoData>[]

	loading: boolean
	// any props that come into the component
}
export type StarButtonProps = {
	value: number
	id: string
	globalLoading: boolean
}

// export type RepoData = {
// 	createdAt: string
// 	diskUsage: number
// 	name: string
// 	stargazerCount: number
// 	updatedAt: string
// 	url: string
// 	id: string
// 	// any props that come into the component
// }


 

export type StoreState = {
	user: any
	setUser: (user: any) => void
	ownerFilter: string
	setOwnerFilter: (ownerFilter: string) => void
	sessionLoading: boolean
	setSessionLoading: (
		sessionLoading: boolean
	) => void
	pageSize: number
	setPageSize: (pageSize: number) => void
	orderDirection: string
	setOrderDirection: (
		orderDirection: string
	) => void
	sortingField: string
	setSortingField: (
		setSortingField: string
	) => void
	repoNameSearch: string
	setRepoNameSearch: (
		repoNameSearch: string
	) => void
}

// export interface PageInfo {
// 	__typename: string
// 	endCursor: string
// 	startCursor: string
// 	hasNextPage: boolean
// 	hasPreviousPage: boolean
// }

// export module Response {
export interface Owner {
	login: string
	avatarUrl: string
}

export interface Node {
	diskUsage: number
	id: string
	name: string
	openGraphImageUrl: string
	owner: Owner
	description: string
	url: string
	createdAt: Date
	updatedAt: Date
	stargazerCount: number
}

export interface PageInfo {
	endCursor: string
	hasNextPage: boolean
	hasPreviousPage: boolean
	startCursor: string
}

export interface Repositories {
	nodes: Node[]
	totalCount: number
	totalDiskUsage: number
	pageInfo: PageInfo
}

export interface RepositoryOwner {
	id: string
	login: string
	repositories: Repositories
	repository: Node
}

export interface Data {
	repositoryOwner: RepositoryOwner
}

export interface RootObject {
	data: Data
}
// }
export interface Error {
	message: string
}

export module NoLogin {
	export interface Owner {
		login: string
		avatarUrl: string
	}

	export interface Node {
		diskUsage: number
		id: string
		name: string
		openGraphImageUrl: string
		owner: Owner
		description: string
		url: string
		createdAt: Date
		updatedAt: Date
		stargazerCount: number
	}

	export interface Edge {
		node: Node
	}

	export interface PageInfo {
		endCursor: string
		hasNextPage: boolean
		hasPreviousPage: boolean
		startCursor: string
	}

	export interface Search {
		repositoryCount: number
		edges: Edge[]
		pageInfo: PageInfo
	}

	export interface Data {
		search: Search
	}

	export interface RootObject {
		data: Data
	}
}
