import { gql } from '@apollo/client'

export const FIRST_PROJECTS = gql`
	query GetRepos(
		$login: String!
		$pageSize: Int!
	) {
		repositoryOwner(
			login: $login # pageSize: $pageSize # endCursor: $endCursor
		) {
			repositories(
				first: $pageSize
				orderBy: {
					field: CREATED_AT
					direction: DESC
				}
			) {
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
				pageInfo {
					endCursor
					hasNextPage
					hasPreviousPage
					startCursor
				}
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
