<template>
  <el-form :model="form" label-width="120px" label-position="top">
    <el-form-item>
      <el-radio-group v-model="form.show" size="medium" @change="applyFilter">
        <el-radio-button label="todos">All Countries</el-radio-button>
        <el-radio-button label="limitado"
          >Multilingual Countries</el-radio-button
        >
        <el-radio-button label="monolingue"
          >Monolingual Countries</el-radio-button
        >
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref } from "vue";

export default {
  emits: ["filter"],
  setup(props, { emit }) {
    const form = ref({
      show: "todos",
    });

    const applyFilter = () => {
      emit("filter", form.value);
    };

    return { form, applyFilter };
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
}
</style>
