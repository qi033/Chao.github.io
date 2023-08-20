 <template>
  <!-- 这是数据页面 -->
  <div id="shujbox">
    <div id="dataBox">
      <ul
        v-for="(item, index) in datyouaTwo ? datyoua : datyouaTwo"
        :key="index"
      >
        <li>
          <div class="dataBox_zuo">
            <input
              type="checkbox"
              @click="toggleStrike(item)"
              v-model="item.isChecked"
              @change="playSound"
            />
            <a :class="{ 'strike-through': item.shouldStrike }" href="">{{
              item.name
            }}</a>
            <!-- 插件日期 -->
            <div class="riqibox">
              <div class="block">
                <el-date-picker
                  v-model="item.date"
                  type="date"
                  placeholder="-"
                  @blur="saveToLocalstorage"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="dataBox_you" style="margin-right: 10px; color: #000">
            <i class="el-icon-delete" @click="deleteItem(index)"></i>
          </div>
        </li>
      </ul>
    </div>

    <div id="dataBox_btn">
      <div class="dataBox_btn_son" :class="{ 'show-border': showBorder }">
        <span>➕&nbsp;</span>
        <input
          type="text"
          name=""
          id=""
          placeholder="添加任务"
          @click="showBorder = !showBorder"
          @keyup.enter="addItem"
          v-model="newItemName"
          style="border: none !important; border: 1px solid #fff !important"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "@/api/bus.js";
export default {
  data() {
    return {
      showBorder: false,
      isChecked: false,
      audio: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      newItemName: "",
      datyoua: [],
      datyouaTwo: [],
    };
  },
  created() {
    // 获取本地存储的数据
    const savedData = localStorage.getItem("datyoua");
    if (savedData) {
      this.datyoua = JSON.parse(savedData);
    }
    Bus.$on("setBusBox", (data) => {
      console.log(data, "6666");
      this.datyoua = [];
      if (data != []) {
        console.log("111");
        data.forEach((item) => {
          this.datyoua.push(item);
        });
      }
    });
  },
  mounted() {
    Bus.$emit("setBus", this.datyoua);
    this.audio = new Audio(require("../../assets/yinxiao.wav"));
  },
  methods: {
    playSound() {
      if (this.datyoua.some((item) => item.isChecked)) {
        // 至少有一个项目被勾选时播放声音
        this.audio.play();
      }
    },

    //给字体加删除线
    toggleStrike(item) {
      console.log(item);
      if (item) {
        item.shouldStrike = !item.shouldStrike;
      }
    },

    //本地存储日期
    saveToLocalstorage() {
      localStorage.setItem("datyoua", JSON.stringify(this.datyoua));
      this.resetSetItem("datyoua", JSON.stringify(this.datyoua));
    },
    // 添加新项

    addItem() {
      // 判断输入框是否为空
      if (this.newItemName.trim() !== "") {
        const newItem = {
          id: this.datyoua.length + 1,
          name: this.newItemName.trim(),
          date: null,
          shouldStrike: false,
        };
        this.datyoua.push(newItem);
        // 添加完后清空输入框
        this.newItemName = "";
        localStorage.setItem("datyoua", JSON.stringify(this.datyoua));
        this.resetSetItem("datyoua", JSON.stringify(this.datyoua));
      }
    },

    deleteItem(index) {
      if (confirm("确定删除吗")) {
        this.datyoua.splice(index, 1);
        localStorage.setItem("datyoua", JSON.stringify(this.datyoua));
        this.resetSetItem("datyoua", JSON.stringify(this.datyoua));
      }
    },
  },
};
</script>
<style lang="less" scoped>
.strike-through {
  text-decoration: line-through !important;
}
// 底部
.dataBox_btn {
  width: 200px;
  height: 200px;
  border: 1px solid black;
  transition: border-bottom-color 0.5s;
}

.show-border {
  border-bottom: 2px solid #33c5c5;

  border-bottom-color: #33c5c5;
}

#dataBox_btn {
  width: 80%;
  position: fixed;
  background-color: #1c1c1e;
  bottom: 0px;
  height: 50px;
  span {
    margin-top: 3px;
  }
  .dataBox_btn_son {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: center;
    // background-color: #1c1c1e;
    margin-top: 15px;
    input {
      background-color: #1c1c1e;
      width: 100%;
      color: #fff;
      border: none;
      outline: none;
      height: 30px;
    }
  }
}
.dataBox_zuo {
  margin-top: 5px;
}
ul li {
  list-style: none;
}
a {
  color: #333333;
  text-decoration: none;
}
#dataBox {
  .dataBox_zuo {
    margin-left: 10px;
    a {
      padding-left: 10px;
    }
  }
  width: 95%;
  margin: auto;
  height: 300px;
  margin-top: 10px;
  ul li {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    border-radius: 10px;
    a {
      color: #000;
    }
    input {
    }
    background-color: #fff;
    margin-top: 10px;
  }
}
</style>