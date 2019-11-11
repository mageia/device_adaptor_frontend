<template>
    <div class="app-container">
        <h2 class="title">
            数据接入
        </h2>
        <el-card class="box-card">
            <el-button type="primary" size="medium" class="pull-right mb20" @click="isModalShow=true">添加数据源</el-button>
            <el-table :data="inputData" :stripe="true" size="small" border :default-sort="{prop: 'created_at', order: 'descending'}">
                <el-table-column type="index">
                </el-table-column>
                <el-table-column prop="name_override" label="名称" width="200">
                </el-table-column>
                <el-table-column prop="plugin_name" label="类型">
                </el-table-column>
                <el-table-column prop="interval" label="采集频率">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间">
                    <template slot-scope="scope">
                        {{scope.row.created_at | formatDate}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" round @click="editData(scope.row)">编辑</el-button>
                        <el-button type="primary" size="small" round @click="editData(scope.row, 'point')">编辑点表</el-button>
                        <el-button type="danger" size="small" round @click="confirmDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog title="添加数据源" :visible.sync="isModalShow" width="500px">
            <lean-form :sample-data="inputsConfig" @changeFormData="changeFormData" :reset="isReset"></lean-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="primary" @click="createDataSource">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import * as api from "@/api/index.js";
import LeanForm from "@/components/lean-form";
import dayjs from "dayjs";
import { mapGetters } from "vuex";
export default {
    components: {
        LeanForm
    },
    data() {
        return {
            isReset: false,
            tableData: [],
            isModalShow: false,
            form: {},
            currentDataSource: {},
            formLabelWidth: "80px",
            inputsConfig: null,
            inputType: [],
            inputData: [],
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
            this.inputsConfig = data.inputs;
            this.inputType = Object.keys(this.inputsConfig);
            // this.outputType = data.outputs
            window.localStorage.setItem(
                "INPUT_PLUGIN_CONFIG",
                JSON.stringify(this.inputsConfig)
            );
            window.localStorage.setItem(
                "INPUT_PLUGIN_TYPE",
                JSON.stringify(this.inputType)
            );
            // window.localStorage.setItem('OUTPUT_PLUGIN_TYPE', JSON.stringify(this.outputType))
        },
        async geInitData() {
            // console.log(this.jwt)
            let { data } = await api.getCurrentConfig();
            this.inputData = data.inputs;
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
                let response = await api.createData("inputs", data);
                // let response = await this.$axios({
                //     method: "post",
                //     url: "/plugin/inputs/",
                //     headers: {
                //         Authorization: this.jwt
                //     },
                //     data
                // });
                this.inputData.splice(0, 0, response.data);
                this.$message({
                    message: "添加成功！",
                    type: "success"
                });
                this.resetForm();
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
                    "inputs",
                    this.currentDataSource.id
                );
                // let response = await this.$axios({
                //     method: "delete",
                //     url: `/plugin/inputs/${this.currentDataSource.id}`,
                //     headers: {
                //         Authorization: this.jwt
                //     }
                // });

                if (response.data) {
                    this.inputData = response.data;
                    this.$message({
                        message: "删除成功！",
                        type: "success"
                    });
                }
            } catch (err) {
                console.log(err);
                this.$message({
                    message: "删除失败！",
                    type: "error"
                });
            }
        },
        editData(item, type) {
            if (type === "point") {
                this.$router.push(`/input/point/${item.id}`);
            } else {
                this.$router.push(`/input/detail/${item.id}`);
            }
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
        },
        resetForm() {
            this.isReset = !this.isReset;
        },
        cancelForm() {
            this.isModalShow = false;
            this.resetForm();
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