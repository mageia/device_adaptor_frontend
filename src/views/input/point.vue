<template>
    <div class="app-container" style="width: 900px;margin: 0 auto;">
        <h1>编辑点表</h1>
        <el-card class="mb20">
            <el-form :label-position="'left'" label-width="80px" :model="form">
                <el-form-item label="点表地址">
                    <el-input v-model="form.point_map_path"></el-input>
                </el-form-item>
            </el-form>
            <el-row>
                <h4>点表详情</h4>
<!--                <el-button type="primary" @click.native="probeData">检测点表</el-button>-->
            </el-row>
            <json-editor :data="currentJson" :height="500" @onChange="changeData"></json-editor>
        </el-card>
        <el-button class="pull-right" type="primary" size="small" @click="updateDataSource()">保存</el-button>
        <el-button class="pull-right" type="default" size="small" @click="jumpTo()" style="margin-right:20px;">返回上一页
        </el-button>
    </div>
</template>
<script>
  import * as api from "@/api/index";
  import JsonEditor from "@/components/jsonEditor";
  // import JsonEditor from "@/components/tableEditor";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        id: "",
        form: {},
        currentJson: {}
      };
    },
    computed: {
      ...mapGetters(["jwt"])
    },
    components: {
      JsonEditor
    },
    methods: {
      async fetchData() {
        let {data} = await api.getPointMap(this.id);
        // let { data } = await this.$axios({
        //     method: "get",
        //     url: "/pointMap/" + this.id,
        //     headers: {
        //         Authorization: this.jwt
        //     }
        // });
        this.form = data;
        this.currentJson = data.point_map_content
          ? data.point_map_content
          : {};
      },

      async probeData() {
        let {data} = await api.probePointMap(this.id);
        // let { data } = await this.$axios({
        //     method: "get",
        //     url: "/pointMap/" + this.id,
        //     headers: {
        //         Authorization: this.jwt
        //     }
        // });
        this.form = data;
        this.currentJson = data.point_map_content
          ? data.point_map_content
          : {};
      },

      async updateDataSource() {
        try {
          let data = {
            point_map_path: this.form.point_map_path,
            point_map_content: JSON.stringify(this.currentJson)
          };
          let response = api.updatePointMap(this.id, data);
          // let response = await this.$axios({
          //     method: "put",
          //     url: "/pointMap/" + this.id,
          //     headers: {
          //         Authorization: this.jwt
          //     },
          //     data
          // });
          this.$message({
            message: "修改成功！",
            type: "success"
          });
        } catch (err) {
          this.$message({
            message: "修改失败！",
            type: "error"
          });
        }
      },
      jumpTo() {
        this.$router.push("/");
      },
      changeData(json) {
        // console.log(typeof(JSON.parse(json)))
        console.log(json);
        this.currentJson = json;
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.id = this.$route.params.id;
        this.fetchData(this.key);
      });
    }
  };
</script>
