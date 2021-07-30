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
	${PAGE_INFO}
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
			first: $pageSiz
		) {
			repositoryCount
			edges {
				node {
					... on Repository {
						...nodeData
					}
				}
			}
			...pageInfo
		}
	}
`

// export const PREV_PROJECTS = {
// 	query: gql`
//             query Query {
//                         user: user(login: $user.login) {
//                             repositories(last: $pageSize,before: $startCursor  ) {
//      pageInfo {
//           endCursor
//         startCursor
//         hasNextPage
//         hasPreviousPage
//       }
//       totalCount
//       totalDiskUsage
//       nodes {
//         name
//         updatedAt
//         createdAt
//         url
//         diskUsage
//         stargazerCount
//         id
//       }
//                             }
//                         }

// 					}

// 				`,
// }
