<template>
  <div class="table-container">
    <TableHeader/>
    <Filters @filter="(e) => $emit('filter', e)"/>
    <!-- {{countries}} -->
    <el-table v-loading="loading" :data="countries" stripe style="width: 100%" border>
      <el-table-column align="center" prop="emoji" label="Bandeira" width="100" />
      <el-table-column align="center" sortable prop="name" label="País" min-width="230" />
      <el-table-column align="center" sortable prop="currency" :formatter="formatter" label="Moeda" min-width="150" />
      <el-table-column align="center" prop="languages" :formatter="formatter" label="Línguas" min-width="200px">
        <template #default="scope">
          <el-tag
            v-for="language in scope.row.languages"
            :key="language.code"
            >{{ scope.row.name }}</el-tag
          >
        </template></el-table-column
      >
    </el-table>
  </div>
</template>

<script>
import { ElTable } from "element-plus";
import Filters from "./Filters.vue";
import TableHeader from "./TableHeader.vue";
export default {
  props: { countries: Array, loading: Boolean },
  components: { ElTable, Filters, TableHeader },
  setup() {

    const formatter = (row, column) => {
      return row[column.property] ? row[column.property] : "Não consta"
    }

    return {formatter}
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
