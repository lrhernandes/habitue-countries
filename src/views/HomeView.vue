<script>
import { computed, onMounted, reactive, toRefs, ref, watch } from "vue";
import gql from "graphql-tag";
import feather from "feather-icons";
import { useQuery, provideApolloClient } from "@vue/apollo-composable";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import Select from "../components/Select.vue";
import store from "../store";

import Header from "../components/Header.vue";
import Table1 from "../components/Table.vue";

export default {
  components: { Header, Map, Table1, Select },

  setup() {
    const data = reactive({
      continents: {},
      selectedContinent: "",
      countries: null,
      selectedCountries: [],
      loading: false
    });

    //apollo config
    const httpLink = createHttpLink({
      uri: "https://countries.trevorblades.com/graphql",
    });
    const cache = new InMemoryCache();
    const apolloClient = new ApolloClient({
      link: httpLink,
      cache,
    });
    provideApolloClient(apolloClient);

    // queries
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
          name
          code
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

    // functions
    async function handleSelect(e) {
      data.loading = true
      if (typeof e == "string") {
        const { result } = useQuery(SEARCH_COUNTRIES, {
          code: e,
        });
        const final = computed(() => result.value?.continents[0].countries ?? []);
        console.log("aa", final)
        data.countries = final;
      }
      setTimeout(()=> data.loading = false, 500)
      
    }

    const { result } = useQuery(ALL_CONTINENTS_QUERY);
    data.continents = computed(() => result.value?.continents ?? []);

    return { ...toRefs(data), handleSelect };
  },
};
</script>

<template>
  <main>
    <section class="noise-wrapper">
      <div class="noise">
        <Header />
        <section class="search-wrapper">
          <h1 class="nunito">selecione um continente para continuar</h1>
          <div id="search"></div>
          <Select
            @select="handleSelect"
            :options="continents"
            :selected="selectedContinent"
            placeholder="Continente"
          />
          <div class="star-wrapper">
            <div class="star">
              <svg
                width="45"
                height="50"
                viewBox="0 0 103 122"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M51.5 3.78813L61.708 41.0857L61.9689 42.0392L62.9254 41.7892L99.0936 32.3357L73.1122 60.3196L72.4805 61L73.1122 61.6804L99.0936 89.6643L62.9254 80.2108L61.9689 79.9608L61.708 80.9143L51.5 118.212L41.292 80.9143L41.0311 79.9608L40.0746 80.2108L3.90643 89.6643L29.8878 61.6804L30.5195 61L29.8878 60.3196L3.90644 32.3357L40.0746 41.7892L41.0311 42.0392L41.292 41.0857L51.5 3.78813Z"
                  stroke="white"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section class="table-wrapper" v-if="countries">
      <article>
        <Table :loading="loading" :countries="countries" />
      </article>
    </section>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.search-wrapper {
  display: flex;
  margin-top: 130px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .search {
    width: 50%;
    max-height: 60vh;
    object-fit: contain;
  }
  h1 {
    font-size: 36px;
    font-weight: 400;
    margin: 40px 0px;
    text-align: center;
    max-width: 75vw;
    svg {
      margin-left: 10px;
    }
  }

  .star-wrapper {
    display: flex;
    flex-direction: row;
    margin: 50px 0px;
    align-items: center;

    .star {
      margin: 20px;
      -webkit-animation: spin 15s linear infinite;
      -moz-animation: spin 15s linear infinite;
      animation: spin 15s linear infinite;
    }
    @-moz-keyframes spin {
      100% {
        -moz-transform: rotate(360deg);
      }
    }
    @-webkit-keyframes spin {
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes spin {
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    .star-line {
      border-bottom: 1px solid rgb(190, 190, 190);
      width: 30vw;
      max-width: 350px;
      height: 0px;
    }
  }
}
.noise-wrapper {
  flex: 1;
  background-color: #272727;
  color: white;
  display: flex;
  flex-direction: column;
  .noise {
    flex: 1;
    background-image: url("../assets/noise.png");
    background-repeat: repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: AnimateBG 25s linear infinite;

    @keyframes AnimateBG {
      0% {
        background-position: 0%;
      }
      100% {
        background-position: 100%;
      }
    }
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
  // background-image: repeating-linear-gradient(
  //     to bottom,
  //     #dcdcdc 0,
  //     #dcdcdc 0px,
  //     transparent 1px,
  //     transparent 30px
  //   ),
  //   repeating-linear-gradient(
  //     to right,
  //     #fff 0,
  //     #fff 29px,
  //     #dcdcdc 29px,
  //     #dcdcdc 30px
  //   );
}
</style>
