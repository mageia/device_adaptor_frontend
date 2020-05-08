<template>
    <div class="app-container" style="width: 900px;margin: 0 auto;">
        <h1>编辑数据源</h1>
        <el-card class="mb20">
            <lean-form :sample-data="outputConfig" :form-data="data" :is-editing="true" :current-type="data.plugin_name" @changeFormData="changeFormData"></lean-form>
        </el-card>
        <el-button class="pull-right" type="primary" size="small" @click="updateDataSource()">保存</el-button>
        <el-button class="pull-right" type="default" size="small" @click="jumpTo()" style="margin-right:20px;">返回上一页</el-button>
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
            outputConfig: {},
            currentData: {}
        };
    },
    computed: {
        ...mapGetters(["token"]),
        outputType() {
            return JSON.parse(
                window.localStorage.getItem("OUTPUT_PLUGIN_TYPE")
            );
        }
    },
    methods: {
        async fetchData() {
            let { data } = await api.getData("outputs", this.id);

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
                    data[item.key] = `${item.value}${item.unit}`;
                }
            });
            let response = await api.updateData("outputs", this.id, data);
            this.$message({
                message: "修改成功！",
                type: "success"
            });
            this.isEditModalShow = false;
        },
        jumpTo() {
            this.$router.push("/output/index");
        },
        initConfig() {
            this.outputConfig = JSON.parse(
                localStorage.getItem("OUTPUT_PLUGIN_CONFIG")
            );
        },
        changeFormData(data) {
            this.currentData = data;
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        this.fetchData();
        this.initConfig();
    }
};
</script>
<style lang="less" scoped>
/*.json-editor {*/
/*    margin-bottom: 15px;*/
/*    height: 500px;*/
/*}*/
</style>