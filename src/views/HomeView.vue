<template>
  <main>
    <section>
      <div class="hero">
        <img class="banner" src="/banner.jpg" />
        <div class="search-wrapper">
          <h1 class="title">Countries general data</h1>
          <p>Language and currency information</p>
          <div id="search" class="button-list">
            <el-button
              v-for="continent in continents"
              :key="continent.code"
              type="info"
              round
              :class="{ active: selectedContinent === continent.code }"
              @click="handleSelect(continent.code)"
            >
              {{ continent.name }}
            </el-button>
          </div>
        </div>
      </div>
    </section>
    <section class="table-wrapper" v-if="countries">
      <article>
        <Table1 :loading="loading" :countries="countries" />
      </article>
    </section>
  </main>
</template>

<script>
import { computed, reactive, toRefs, ref } from "vue";
import gql from "graphql-tag";
import { useQuery, provideApolloClient } from "@vue/apollo-composable";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import Table1 from "../components/Table.vue";
import { ElButton } from "element-plus";

export default {
  components: { Table1, ElButton },
  setup() {
    const data = reactive({
      continents: [],
      selectedContinent: "",
      countries: null,
      loading: false,
    });

    const httpLink = createHttpLink({
      uri: "https://countries.trevorblades.com/graphql",
    });
    const cache = new InMemoryCache();
    const apolloClient = new ApolloClient({ link: httpLink, cache });
    provideApolloClient(apolloClient);

    const ALL_CONTINENTS_QUERY = gql`
      query {
        continents {
          code
          name
        }
      }
    `;

    const SEARCH_COUNTRIES = gql`
      query searchCountry($code: String) {
        continents(filter: { code: { eq: $code } }) {
          countries {
            name
            code
            currency
            emoji
            languages {
              name
              code
              native
            }
          }
        }
      }
    `;

    async function handleSelect(code) {
      if (data.selectedContinent === code) return;
      data.selectedContinent = code;
      data.loading = true;

      const { result } = useQuery(SEARCH_COUNTRIES, { code });
      data.countries = computed(
        () => result.value?.continents[0]?.countries ?? []
      );

      setTimeout(() => (data.loading = false), 500);
    }

    const { result } = useQuery(ALL_CONTINENTS_QUERY);
    data.continents = computed(() => result.value?.continents ?? []);

    return { ...toRefs(data), handleSelect };
  },
};
</script>

<style scoped lang="scss">
.el-button:not(.is-text, .is-link, .el-button--text) {
  background-color: rgba(53, 53, 53, 0.91);
  border: 0px;
  font-family: Poppins;
  font-size: 13px;
}
.el-button:not(.is-text, .is-link, .el-button--text):hover,
.el-button:not(.is-text, .is-link, .el-button--text):focus,
.el-button:not(.is-text, .is-link, .el-button--text):active,
.el-button.active {
  background-color: rgb(0, 0, 0);
}

.button-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: start;
}

main {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  color: white;
  font-family: Poppins;
}

.hero {
  height: 100vh;
  top: 0px;
  position: relative;
  overflow: hidden;
}

.banner {
  width: 100vw;
  position: absolute;
  top: 0px;
  height: 100vh;
}

.search-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100vh;
  padding: 0 10vw;
  background-color: rgba(0, 0, 0, 0.43);

  .search {
    width: 50%;
    max-height: 60vh;
    object-fit: contain;
  }
  h1 {
    font-size: 32px;
    font-weight: 400;
    margin: 0px;
    max-width: 75vw;
    svg {
      margin-left: 10px;
    }
  }
  p {
    margin-top: 0px;
    font-size: 13px;
    margin-bottom: 40px;
  }
}

.table-wrapper {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 100vw;
  background: rgb(243, 243, 243);
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>
