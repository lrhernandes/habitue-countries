<template>
  <el-form :model="form" label-width="120px" label-position="top">
    <el-form-item>
      <el-radio-group v-model="form.show" size="medium">
        <el-radio-button label="todos">Exibir todos países </el-radio-button>
        <el-radio-button label="limitado"
          >Exibir apenas países com mais de 1 idioma</el-radio-button
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-select
        v-model="form.language"
        placeholder="Selecionar idioma"
        size="medium"
      >
        <el-option label="Português" value="pt" />
        <el-option label="Espanhol" value="es" />
      </el-select>
    </el-form-item>
    <el-button type="primary" @click="()=> $emit('filter', form)"
      >FILTRAR</el-button
    >
  </el-form>
</template>

<script>
import { ElTable } from "element-plus";
import feather from "feather-icons";
import { ref } from "vue";
export default {
  props: { countries: Array },
  components: { ElTable },
  mounted() {
    feather.replace();
  },
  setup() {
    const form = ref({
      show: "todos",
      language: "",
    });

    const formatter = (row, column) => {
      return row[column.property] ? row[column.property] : "Não consta";
    };

    return { formatter, form };
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: start;
  margin-bottom: 20px;
  gap: 10px;
  flex-wrap: wrap;

  .el-form-item {
    margin: 0px;
    flex: 1 100px;
  }
  .el-form-item + .el-form-item {
    margin-left: 10px;
  }

  .el-form-item + .el-button {
    margin-left: 10px;
  }

  .el-button {
    font-family: "Roboto", sans-serif;
  }
}
</style>
