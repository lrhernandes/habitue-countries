<script>
import feather from "feather-icons";
import gql from "graphql-tag";
import { computed, onMounted, reactive, toRefs } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import Select from "./Select.vue";

export default {
  mounted() {
    feather.replace();
  },
  setup() {
    const ALL_CONTINENTS_QUERY = gql`
      query {
        continents {
          code
          name
        }
      }
    `;
    const data = reactive({
      continents: {},
      selectedContinent: "",
    });
    function handleSearchCountries() {
      //     const SEARCH_COUNTRIES = gql`
      //   query searchCountry($code: String = "${this.selectedContinent}"){
      //     continents(
      //       filter: {
      //         code: {
      //           eq: $code
      //         }
      //       }
      //     ){
      //       name,
      //       code,
      //       countries{
      //         name,
      //         code,
      //         currency,
      //         emoji,
      //         languages{
      //           name,
      //           code,
      //           native
      //         }
      //       }
      //     }
      //   }
      // `;
      const { countries } = useQuery(SEARCH_COUNTRIES);
      data.countries = computed(() => countries.value?.continents ?? []);
    }
    const { result } = useQuery(ALL_CONTINENTS_QUERY);
    data.continents = computed(() => result.value?.continents ?? []);
    return { ...toRefs(data), handleSearchCountries };
  },
  components: { Select },
};
</script>

<template>
  <section>
    <div class="map-wrapper">
      <h1 class="nunito">selecione um continente para continuar</h1>
      <div id="map"></div>
      <Select
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
    </div>
  </section>
</template>

<style scoped lang="scss">
.map-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .map {
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
</style>
