<template>
  <div
    id="box"
    :style="{ 'border-bottom': hasItemSelected ? '2px solid blue' : 'none' }"
  >
    <ul>
      <li v-for="item in items" :key="item.id">
        <input type="checkbox" v-model="item.isChecked" @change="playSound" />
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style>
.border-bottom {
  width: 10px !important;
  height: 10px;
  background-color: pink;
}
</style>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: "Item 1", isChecked: false },
        { id: 2, name: "Item 2", isChecked: false },
        { id: 3, name: "Item 3", isChecked: false },
        //...
      ],
      audio: null,
    };
  },
  mounted() {
    // 创建一个新的 Audio 对象
    this.audio = new Audio(require("../assets/yinxiao.wav"));
  },
  computed: {
    hasItemSelected() {
      return this.items.some((item) => item.isChecked);
    },
  },
  methods: {
    playSound() {
      if (this.hasItemSelected) {
        // 至少有一个项目被勾选时播放声音
        this.audio.play();
      }
    },
  },
};
</script>