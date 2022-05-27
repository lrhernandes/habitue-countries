<script>
import { computed, onMounted, reactive, toRefs } from "vue";
import gql from "graphql-tag";
import { useQuery, useResult } from "@vue/apollo-composable";

import Header from "../components/Header.vue";
import Map from "../components/Map.vue";

export default {
  components: { Header, Map },
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
        <div class="select-options"></div>

        <div class="table-wrapper">
          <table>
            <tr>
              <th>País</th>
              <th>Moeda</th>
              <th>Línguas</th>
            </tr>
            <tbody>
              <tr v-for="country in countries" :key="country.code">
                <td>{{ country.name }}</td>
                <td>{{ country.currency }}</td>
                <td>
                  <div
                    v-for="language in country.languages"
                    :key="language.code"
                  >
                    {{ language.name }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
  }
}

.table-wrapper {
  padding: 20px;
  margin: 20px;
  max-width: 95vw;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  table {
    background: white;
    width: 100%;
    border-collapse: collapse;
    font-family: "Roboto", sans-serif;

    th {
      padding-top: 12px;
      width: 100%;
      padding-bottom: 12px;
      text-align: left;
      background-color: #17e8b0;
      color: #272727;
    }
    tbody {
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      td {
        width: 100%;
        border-bottom: 1px solid gray;
      }
    }
  }
}

.chess {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
  background-image: repeating-linear-gradient(
      to bottom,
      #dcdcdc 0,
      #dcdcdc 0px,
      transparent 1px,
      transparent 30px
    ),
    repeating-linear-gradient(
      to right,
      #fff 0,
      #fff 29px,
      #dcdcdc 29px,
      #dcdcdc 30px
    );

  select {
    margin-top: 30px;
    color: #272727;
  }
}
</style>
