<template>
    <div class="app-container" style="margin: 0 auto;" data-app="true">

        <el-card class="mb20">
            <!--            <el-form :label-position="'left'" label-width="80px" :model="form">-->
            <!--                <el-form-item label="点表地址">-->
            <!--                    <el-input v-model="form.point_map_path"></el-input>-->
            <!--                </el-form-item>-->
            <!--            </el-form>-->
            <!--            <el-row>-->
            <!--                <h4>点表详情</h4>-->
            <!--                <el-button type="primary" @click.native="probeData">检测点表</el-button>-->
            <!--            </el-row>-->
            <v-card-title>
                <h1>点表详情</h1>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="values" item-key="address" :search="search" show-select
                          :footer-props="{'items-per-page-options': [10, 20, 50, -1]}">
                <!-- Edit name -->
                <template v-slot:item.name="props">
                    <v-edit-dialog :return-value.sync="props.item.name" large>
                        <div>{{ props.item.name }}</div>
                        <template v-slot:input>
                            <v-text-field v-model="props.item.name" label="Edit" single-line counter autofocus
                                          :rules="[max25chars]"></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>

            </v-data-table>
            <!--            <json-editor :data="currentJson" :height="500" @onChange="changeData"></json-editor>-->
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
        currentJson: {},

        max25chars: v => v.length <= 25 || 'Input too long!',
        page: 1,
        pageCount: 0,
        itemsPerPage: 2,
        search: '',
        pagination: {},
        selected: [],
        headers: [],
        values: [],
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
        this.currentJson = data.point_map_content || {};

        this.headers = data.headers.map(h => {
          return {text: h, value: h}
        });
        Object.keys(data.point_map_content).forEach(k => {
          this.values.push(data.point_map_content[k]);
        })
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
        console.log(this.selected);

        try {
          this.values.forEach(v => {
            this.currentJson[v.point_key] = v
          });
          let putBody = {
            point_map_path: this.form.point_map_path,
            point_map_content: JSON.stringify(this.currentJson)
          };

          let response = api.updatePointMap(this.id, putBody);
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
        this.$router.push("/input/index");
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
