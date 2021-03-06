import { gql } from '@apollo/client'

const NODE_DATA = gql`
	fragment nodeData on Repository {
		# nodes {
		diskUsage
		id
		name
		openGraphImageUrl
		owner {
			login
			avatarUrl
		}
		description
		url
		createdAt
		updatedAt
		stargazerCount
		viewerHasStarred
		# }
	}
`
const PAGE_INFO = gql`
	fragment pageInfo on RepositoryConnection {
		pageInfo {
			endCursor
			hasNextPage
			hasPreviousPage
			startCursor
		}
	}
`

export const FIRST_PROJECTS = gql`
	${NODE_DATA}
	${PAGE_INFO}
	query GetRepos(
		$login: String!
		$pageSize: Int!
		$orderDirection: OrderDirection!
		$field: RepositoryOrderField!
		$repoName: String!
	) {
		repositoryOwner(
			login: $login # pageSize: $pageSize # endCursor: $endCursor
		) {
			repositories(
				first: $pageSize
				orderBy: {
					field: $field
					direction: $orderDirection
				}
			) {
				nodes {
					...nodeData
				}
				totalCount
				totalDiskUsage
				...pageInfo
			}
			repository(name: $repoName) {
				...nodeData
			}
		}
	}
`

export const NO_LOGIN = gql`
	${NODE_DATA}
	query GetRepos(
		# $login: String!
		$pageSize: Int!
		# $orderDirection: OrderDirection!
		# $field: RepositoryOrderField!
		$repoName: String!
	) {
		search(
			query: $repoName
			type: REPOSITORY
			first: $pageSize
		) {
			repositoryCount
			edges {
				node {
					... on Repository {
						...nodeData
					}
				}
			}
			pageInfo {
				endCursor
				hasNextPage
				hasPreviousPage
				startCursor
			}
		}
	}
`
export const SEARCH_NEXT = gql`
	${NODE_DATA}
	${PAGE_INFO}
	query GetRepos(
		$login: String!
		$pageSize: Int!
		$orderDirection: OrderDirection!
		$field: RepositoryOrderField!
		$repoName: String!
		$after: String
	) {
		repositoryOwner(
			login: $login # pageSize: $pageSize # endCursor: $endCursor
		) {
			repositories(
				first: $pageSize
				after: $after
				orderBy: {
					field: $field
					direction: $orderDirection
				}
			) {
				nodes {
					...nodeData
				}
				totalCount
				totalDiskUsage
				...pageInfo
			}
			repository(name: $repoName) {
				...nodeData
			}
		}
	}
`

export const SEARCH_PREV = gql`
	${NODE_DATA}
	${PAGE_INFO}
	query GetRepos(
		$login: String!
		$pageSize: Int!
		$orderDirection: OrderDirection!
		$field: RepositoryOrderField!
		$repoName: String!
		# $last: Int!,
		$before: String # $after: String
	) {
		repositoryOwner(
			login: $login # pageSize: $pageSize # endCursor: $endCursor
		) {
			repositories(
				last: $pageSize
				before: $before
				# first: $pageSize
				# after: $after
				orderBy: {
					field: $field
					direction: $orderDirection
				}
			) {
				nodes {
					...nodeData
				}
				totalCount
				totalDiskUsage
				...pageInfo
			}
			repository(name: $repoName) {
				...nodeData
			}
		}
	}
`

export const NO_LOGIN_NEXT = gql`
	${NODE_DATA}
	query GetRepos(
		# $login: String!
		$pageSize: Int!
		# $orderDirection: OrderDirection!
		# $field: RepositoryOrderField!
		$repoName: String!
		$after: String
	) {
		search(
			query: $repoName
			type: REPOSITORY
			first: $pageSize
			after: $after
		) {
			repositoryCount
			edges {
				node {
					... on Repository {
						...nodeData
					}
				}
			}
			pageInfo {
				endCursor
				hasNextPage
				hasPreviousPage
				startCursor
			}
		}
	}
`
export const NO_LOGIN_PREV = gql`
	${NODE_DATA}
	query GetRepos(
		# $login: String!
		$pageSize: Int!
		# $orderDirection: OrderDirection!
		# $field: RepositoryOrderField!
		$repoName: String!
		$before: String
	) {
		search(
			query: $repoName
			type: REPOSITORY
			last: $pageSize
			before: $before
		) {
			repositoryCount
			edges {
				node {
					... on Repository {
						...nodeData
					}
				}
			}
			pageInfo {
				endCursor
				hasNextPage
				hasPreviousPage
				startCursor
			}
		}
	}
`

export const ADD_STAR = gql`
	mutation AddStar($starrableId: String) {
		__typename
		addStar(
			input: { starrableId: $starrableId }
		) {
			clientMutationId
			starrable {
				viewerHasStarred
				stargazerCount
			}
		}
	}
`
export const REMOVE_STAR = gql`
	mutation RemoveStar($starrableId: String) {
		__typename
		removeStar(
			input: { starrableId: $starrableId }
		) {
			clientMutationId
			starrable {
				viewerHasStarred
				stargazerCount
			}
		}
	}
`
export const GET_REPO = gql`
	${NODE_DATA}
	query getRepo($name: String!, $owner: String!) {
		__typename
		repository(name: $name, owner: $owner) {
			...nodeData
			object(expression: "master:README.md") {
				... on Blob {
					id
					text
					commitUrl
				}
			}
		}
	}
`

export const CREATE_REPO = gql`
	${NODE_DATA}
	mutation CreateRepo(
		$name: String!
		$visibility: RepositoryVisibility!
		$description: String
	) {
		__typename
		createRepository(
			input: {
				name: $name
				visibility: $visibility
				description: $description
			}
		) {
			repository {
				...nodeData
			}
		}
	}
`
