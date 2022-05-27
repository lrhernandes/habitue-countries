import { createApp, h, provide, render } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import "./styles/base.scss";
import "./styles/element/index.scss";


const httpLink = createHttpLink({
  uri: "https://countries.trevorblades.com/graphql",
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});


app.use(router);
app.mount("#app");
