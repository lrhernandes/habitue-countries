<template>
  <div class="custom-select">
    <el-select v-model="selected" size="large" placeholder="Selecione">
      <el-option
        :value="option.code"
        :label="option.name"
        :key="option.code"
        v-for="option in options"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { ElSelect } from "element-plus";
import feather from "feather-icons";
export default {
  components: {
    ElSelect,
  },
  props: {
    options: Array,
    selected: String,
    placeholder: String,
  },
  setup() {},
  mounted() {
    feather.replace();
  },
};
</script>

<style lang="scss">
.custom-select {
  .el-input__wrapper {
    border-radius: 50px !important;
    height: 50px !important;
    width: 250px !important;
    font-size: 16px !important;
  }
}
</style>
