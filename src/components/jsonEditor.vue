<!-- 
    jsonEidtor组件

    #props： 
    height - eidtor的高度，默认500
    data - editor显示的内容， 默认为 {}

    #methods： 
    onChange - 当内容发生变化返回当前的内容

 -->
<template>
    <div ref="jsonEditor" class="json-editor" :style="{height: height+'px'}">
    </div>
</template>
<script>
import JSONEditor from "jsoneditor";
export default {
    name: "json-editor",
    props: {
        height: {
            type: Number,
            default: 500
        },
        data: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    watch: {
        // data: {
        //     handler(cur, old) {
        //         debugger
        //         this.updateEditor()
        //     },
        //     deep: true
        // }
        data(cur, old) {
            this.updateEditor();
            // 如果传入的json发生变化，会出发onchange，保证初始currentjson有值，以及拖拽后改变currentjson的值
            this.$emit("onChange", this.data);
        }
    },
    methods: {
        // 初始化jsoneditor
        initJsonEditor() {
            // let JSONEditor = null;
            // if (typeof window !== "undefined") {
            //     JSONEditor = require("jsoneditor");
            // }
            let self = this;
            let options = {
                mode: "code",
                modes: ["code", "text", "view"],
                ace: false,
                onEditable: function(node) {
                    if (!node.path) {
                        // In modes code and text, node is empty: no path, field, or value
                        // returning false makes the text area read-only
                        return true;
                    }
                },
                onError: function(err) {
                    alert(err.toString());
                },
                onChange: function() {
                    let json = null;

                    // 如果json格式正确会终止操作，不会emit onchange事件
                    try {
                        json = self.getEditorJson();
                    } catch (err) {
                        return;
                    }

                    self.$emit("onChange", json);
                }
                // onChangeText: function (json) {
                //     //console.log( json );
                //     self.$emit("onChange", json)
                // }
            };
            this.editor = new JSONEditor(this.$refs.jsonEditor, options);
        },
        updateEditor() {
            this.editor.set(this.data);
        },
        getEditorJson() {
            return this.editor.get();
        }
    },
    mounted() {
        this.initJsonEditor();
    }
};
</script>
<style>
@import "../../node_modules/jsoneditor/dist/jsoneditor.min.css";
</style>