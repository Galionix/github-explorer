import { gql } from '@apollo/client'

const NODE_DATA = gql`
	fragment nodeData on RepositoryConnection {
		nodes {
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
		}
		totalCount
		totalDiskUsage
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
				# nodes {
				...nodeData
				# }

				...pageInfo
			}
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
