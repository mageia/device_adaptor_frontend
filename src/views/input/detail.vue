<template>
    <div class="app-container" style="width: 900px;margin: 0 auto;">
        <h1>编辑数据接入数据源</h1>
        <el-card class="mb20">
            <lean-form :sample-data="inputConfig" :form-data="data" :is-editing="true" :current-type="data.plugin_name" @changeFormData="changeFormData"></lean-form>
        </el-card>
        <el-button class="pull-right" type="primary" size="small" @click="updateDataSource()">保存</el-button>
        <el-button class="pull-right" type="default" size="small" @click="jumpTo()" style="margin-right:20px;">返回上一页</el-button>
        <!-- <el-row>
            <el-col :span="24">
                <no-ssr>
                    <json-editor :data="data" :height="500" @onChange="changeData"></json-editor>
                </no-ssr>
                <el-button type="primary" class="pull-right" @click="save">保存修改</el-button>
            </el-col>
        </el-row> -->
    </div>
</template>
<script>
import * as api from "@/api/index";
import LeanForm from "@/components/lean-form";
import { mapGetters } from "vuex";
export default {
    name: "KeyEdit",
    components: {
        LeanForm
    },
    data() {
        return {
            id: "",
            data: {}, //原始json
            inputConfig: {},
            currentData: {}
        };
    },
    computed: {
        ...mapGetters(["token"])
    },
    methods: {
        async fetchData() {
            let { data } = await api.getData("inputs", this.id);
            // let { data } = await this.$axios({
            //     method: "get",
            //     url: "/plugin/inputs/" + this.id,
            //     headers: {
            //         Authorization: this.jwt
            //     }
            // });

            this.data = data;
        },
        // update
        async updateDataSource() {
            let data = {
                plugin_name: this.data.plugin_name
            };
            let fields = Object.assign([], this.currentData.fields);
            fields.forEach(item => {
                if (item.type !== "combine") {
                    data[item.key] = item.value;
                } else {
                    // 如果为combine类型，需要把值和单位拼起来
                    data[item.key] = `${item.value}${item.unit}`;
                }
            });
            let response = await api.updateData("inputs", this.id, data);
            // let response = await this.$axios({
            //     method: "put",
            //     url: "/plugin/inputs/" + this.id,
            //     headers: {
            //         Authorization: this.jwt
            //     },
            //     data
            // });
            this.$message({
                message: "修改成功！",
                type: "success"
            });
        },
        jumpTo() {
            this.$router.push("/input/index");
        },
        initConfig() {
            this.inputConfig = JSON.parse(
                localStorage.getItem("INPUT_PLUGIN_CONFIG")
            );
        },
        changeFormData(data) {
            this.currentData = data;
        }
    },
    mounted() {
        this.$nextTick(function() {
            this.id = this.$route.params.id;
            this.fetchData(this.key);
            this.initConfig();
        });
    }
};
</script>
<style lang="less" scoped>
.json-editor {
    margin-bottom: 15px;
    height: 500px;
}
</style>