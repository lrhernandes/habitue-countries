<template>
  <div class="table-container">
    <TableHeader />
    <Filters @filter="applyFilter" />
    <el-table
      v-loading="loading"
      :data="filteredCountries"
      stripe
      style="width: 100%"
      border
    >
      <el-table-column align="center" label="Flag" width="100">
        <template #default="scope">
          <img
            :src="`https://flagcdn.com/16x12/${scope.row.code.toLowerCase()}.png`"
            :srcset="`
              https://flagcdn.com/32x24/${scope.row.code.toLowerCase()}.png 2x,
              https://flagcdn.com/48x36/${scope.row.code.toLowerCase()}.png 3x
            `"
            width="16"
            height="12"
            :alt="scope.row.name"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="name"
        label="Country"
        min-width="230"
      />
      <el-table-column
        align="center"
        sortable
        prop="currency"
        :formatter="formatter"
        label="Currency"
        min-width="150"
      />
      <el-table-column
        align="center"
        prop="languages"
        label="Languages"
        min-width="200px"
      >
        <template #default="scope">
          <el-tag v-for="language in scope.row.languages" :key="language.code">
            {{ language.name }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import Filters from "./Filters.vue";
import TableHeader from "./TableHeader.vue";

export default {
  props: { countries: Array, loading: Boolean },
  components: { Filters, TableHeader },
  setup(props) {
    const filterCriteria = ref("todos");

    const applyFilter = (filter) => {
      filterCriteria.value = filter.show;
    };

    const filteredCountries = computed(() => {
      if (filterCriteria.value === "limitado") {
        return props.countries.filter(
          (country) => country.languages.length > 1
        );
      } else if (filterCriteria.value === "monolingue") {
        return props.countries.filter(
          (country) => country.languages.length === 1
        );
      }
      return props.countries;
    });

    const formatter = (row, column) => {
      return row[column.property] ? row[column.property] : "Não consta";
    };

    return { formatter, applyFilter, filteredCountries };
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  padding: 30px;
  margin: 30px;
  max-width: 1000px;
  width: calc(95vw - 40px) !important;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
