import { createApp, h, provide, render } from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import './assets/base.css'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://countries.trevorblades.com/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})


const app = createApp({
    setup(){
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App)
})

app.use(router)

app.mount('#app')