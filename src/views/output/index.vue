<template>
    <div class="app-container">
        <h2 class="title">
            数据输出

        </h2>
        <el-card>
            <el-button type="primary" size="medium" class="pull-right mb20" @click="isModalShow=true">添加数据源</el-button>
            <el-table :data="outputData" :stripe="true" size="small" :default-sort="{prop: 'created_at', order: 'descending'}" border>
                <el-table-column type="index">
                </el-table-column>
                <el-table-column prop="plugin_name" label="类型">
                </el-table-column>
                <el-table-column prop="url_address" label="地址">
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间">
                    <template slot-scope="scope">
                        {{scope.row.created_at | formatDate}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" round @click="editData(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" round @click="confirmDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog title="添加数据源" :visible.sync="isModalShow" width="500px">
            <lean-form :sample-data="outputConfig" @changeFormData="changeFormData"></lean-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isModalShow = false">取 消</el-button>
                <el-button type="primary" @click="createDataSource">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import * as api from "@/api/index";
import LeanForm from "@/components/lean-form";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
export default {
    components: {
        LeanForm
    },
    data() {
        return {
            tableData: [],
            isModalShow: false,
            form: {},
            currentDataSource: {},
            formLabelWidth: "80px",
            outputConfig: null,
            outputType: [],
            outputData: [],
            units: ["s", "ms"]
        };
    },
    computed: {
        ...mapGetters(["token"])
    },
    filters: {
        formatDate(val) {
            if (!val) return "";
            return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
        }
    },
    methods: {
        async getInitConfig() {
            // console.log(this.jwt)
            let { data } = await api.getConfigSample();
            this.outputConfig = data.outputs;
            this.outputType = Object.keys(data.outputs);
            // this.outputType = data.outputs
            window.localStorage.setItem(
                "OUTPUT_PLUGIN_CONFIG",
                JSON.stringify(this.outputConfig)
            );
            window.localStorage.setItem(
                "OUTPUT_PLUGIN_TYPE",
                JSON.stringify(this.outputType)
            );
            // window.localStorage.setItem('OUTPUT_PLUGIN_TYPE', JSON.stringify(this.outputType))
        },
        async geInitData() {
            let response = await api.getCurrentConfig();
            let data = response.data;
            this.outputData = data.outputs;
        },
        async createDataSource() {
            let data = {
                plugin_name: this.form.plugin_name
            };

            this.form.fields.forEach(item => {
                if (item.type !== "combine") {
                    data[item.key] = item.value;
                } else {
                    data[item.key] = `${item.value}${item.unit}`;
                }
            });
            console.log(data);
            try {
                let response = await api.createData("outputs", data);
                this.outputData.splice(0, 0, response.data);
                this.$message({
                    message: "添加成功！",
                    type: "success"
                });
                this.isModalShow = false;
            } catch (err) {
                console.log(err);
                this.$message({
                    message: JSON.stringify(err.data),
                    type: "error"
                });
            }
        },
        // 删除
        async deleteKey() {
            try {
                let response = await api.deleteData(
                    "outputs",
                    this.currentDataSource.id
                );

                if (response.data) {
                    this.outputData = response.data;
                    this.$message({
                        message: "删除成功！",
                        type: "success"
                    });
                }
            } catch (err) {
                this.$message({
                    message: "删除失败！",
                    type: "error"
                });
            }
        },
        editData(item) {
            this.$router.push(`/output/detail/${item.id}`);
        },
        confirmDelete(item) {
            this.currentDataSource = item;
            this.$confirm(
                `确认要删除数据源： ${this.currentDataSource.name_override}?`,
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            ).then(() => {
                this.deleteKey();
            });
        },
        changeFormData(data) {
            this.form = data;
        }
    },
    beforeMount() {
        this.getInitConfig();
    },
    mounted() {
        this.$nextTick(() => {
            this.geInitData();
        });
    }
};
</script>