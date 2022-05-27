<script>
import { computed, onMounted, reactive, toRefs } from "vue";
import gql from "graphql-tag";
import { useQuery, useResult } from "@vue/apollo-composable";

import Header from "../components/Header.vue";
import Map from "../components/Map.vue";
import Table1 from "../components/Table.vue";

export default {
  components: { Header, Map, Table1 },
  setup() {
    const data = reactive({
      continents: {},
      selectedContinent: "",
      countries: [
        {
          name: "Antarctica",
          continent: {
            code: "AN",
          },
          code: "AQ",
          currency: null,
          emoji: "🇦🇶",
          emojiU: "U+1F1E6 U+1F1F6",
          languages: [],
        },
        {
          name: "Bouvet Island",
          continent: {
            code: "AN",
          },
          code: "BV",
          currency: "NOK",
          emoji: "🇧🇻",
          emojiU: "U+1F1E7 U+1F1FB",
          languages: [
            {
              name: "Norwegian",
              code: "no",
              native: "Norsk",
            },
            {
              name: "Norwegian Bokmål",
              code: "nb",
              native: "Norsk bokmål",
            },
            {
              name: "Norwegian Nynorsk",
              code: "nn",
              native: "Norsk nynorsk",
            },
          ],
        },
        {
          name: "South Georgia and the South Sandwich Islands",
          continent: {
            code: "AN",
          },
          code: "GS",
          currency: "GBP",
          emoji: "🇬🇸",
          emojiU: "U+1F1EC U+1F1F8",
          languages: [
            {
              name: "English",
              code: "en",
              native: "English",
            },
          ],
        },
        {
          name: "Heard Island and McDonald Islands",
          continent: {
            code: "AN",
          },
          code: "HM",
          currency: "AUD",
          emoji: "🇭🇲",
          emojiU: "U+1F1ED U+1F1F2",
          languages: [
            {
              name: "English",
              code: "en",
              native: "English",
            },
          ],
        },
        {
          name: "French Southern Territories",
          continent: {
            code: "AN",
          },
          code: "TF",
          currency: "EUR",
          emoji: "🇹🇫",
          emojiU: "U+1F1F9 U+1F1EB",
          languages: [
            {
              name: "French",
              code: "fr",
              native: "Français",
            },
          ],
        },
      ],
    });

    const ALL_CONTINENTS_QUERY = gql`
      query {
        continents {
          code
          name
        }
      }
    `;

    const { result } = useQuery(ALL_CONTINENTS_QUERY);
    data.continents = computed(() => result.value?.continents ?? []);
    return { ...toRefs(data) };
  },
};
</script>

<template>
  <main>
    <div class="noise-wrapper">
      <div class="noise">
        <Header />
        <Map />
      </div>
    </div>
    <section>
      <div class="chess">
        <Table :countries="countries" />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.noise-wrapper {
  background-color: #272727;
  color: white;
  .noise {
    background-image: url("../assets/noise.png");
    background-repeat: repeat;
    animation: AnimateBG 50s linear infinite;

    @keyframes AnimateBG {
      0% {
        background-position: 0%;
      }
      // 50% {
      //   background-position: 100% 50%;
      // }
      100% {
        background-position: 100%;
      }
    }
  }
}

.chess {
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding-bottom: 200px;
  padding: 20px;
  background: rgb(241, 241, 241);
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
