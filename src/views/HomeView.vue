<script>
import { computed, onMounted, reactive, toRefs } from "vue";
import gql from "graphql-tag";
import { useQuery, useResult } from "@vue/apollo-composable";

import Logo from "../components/Logo.vue";

export default {
  components: { Logo },
  setup() {
    const data = reactive({
      continents: {},
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
    <Logo />
    <div class="map-wrapper">
      <h1 class="poiret">
        selecione um <span>continente</span> para continuar
      </h1>
      <img class="map" src="../assets/map.png" />
      <div class="star-wrapper">
        <div class="star-line"></div>
        <img class="star" src="../assets/star.png" alt="">
        <div class="star-line"></div>
      </div>
    </div>

    <select name="continentes" id="" placeholder="Selecione o continente">
      <option
        :value="continent.name"
        :label="continent.name"
        :key="continent.code"
        v-for="continent in continents"
      ></option>
    </select>
  </main>
</template>

<style scoped>
.map-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.map-wrapper .map {
  width: 50%;
  max-height: 60vh;
  object-fit: contain;
}
.map-wrapper .star {
  height: 40px;
  width: 35px;
  margin: 20px;
}

.star-wrapper{
  display: flex;
  flex-direction: row;
  margin: 20px 0px;
  align-items: center;
}
.star-line{
  border-bottom: 1px solid black;
  width: 30vw;
  max-width: 350px;
  height: 0px;
}
h1 {
  font-size: 36px;
  font-weight: 400;
  margin: 40px 0px;
}
h1 span {
  border-bottom: 1px solid black;
}
select {
  width: 400px;
  height: 50px;
  padding: 10px;
  border: 1px solid black;
  outline: none;
  border-radius: 0px;
  background: white;
  font-family: "Poiret One", cursive;
  font-size: 20px;
}
</style>
