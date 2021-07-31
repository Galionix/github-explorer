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
	// setLoading: Function
	// any props that come into the component
}
export type StarButtonProps = {
	value: number
	id: string
	globalLoading: boolean
	starred: boolean
	// setLoading: Function
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
	setOwnerFilter: (ownerFilter: any) => void
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
	selectedOwner: string
	setSelectedOwner: (
		selectedOwner: string
	) => void
	selectedName: string
	setSelectedName: (selectedName: string) => void
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
	createdAt: number
	updatedAt: number
	stargazerCount: number
	viewerHasStarred: boolean
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
		createdAt: number
		updatedAt: number
		stargazerCount: number
		viewerHasStarred: boolean
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

declare module Star {
	export interface Starrable {
		viewerHasStarred: boolean
		stargazerCount: number
	}

	export interface RemoveStar {
		starrable: Starrable
	}

	export interface Data {
		__typename: string
		removeStar: RemoveStar
	}

	export interface RootObject {
		data: Data
	}
}

// export module RepoDetails {
// 	export interface Repository extends Node {}

// 	export interface Data {
// 		__typename: string
// 		repository: Repository
// 	}

// 	export interface RootObject {
// 		data: Data
// 	}
// }

export module RepoDetails {
	export interface Object {
		text: string
		commitUrl: string
	}

	export interface Repository extends Node {
		id: string
		description: string
		descriptionHTML: string
		object: Object
	}

	export interface Data {
		__typename: string
		repository: Repository
	}

	export interface RootObject {
		data: Data
	}
}


