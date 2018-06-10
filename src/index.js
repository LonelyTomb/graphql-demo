const { GraphQLServer } = require('graphql-yoga')
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
    Query: {
        info: () => `hello`,
        feed: () => links,
        link: (root, args) => links.filter(link => link.id === args.id)
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },
        updateLink: (root, args) => {
            links.map((val, index) => {
                if (val.id === args.id) {
                    links[index].url = args.url
                    links[index].description = args.description
                    return val
                }
            })
        },
        deleteLink: (root, args) => {
            links = links.filter(link => link.id !== args.id)
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))