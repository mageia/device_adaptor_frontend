<template>
    <div>
        <el-form ref="leanForm" :model="form">
            <el-form-item v-if="isEditing" label="类型" :label-width="formLabelWidth">
                <span>{{currentType}}</span>
            </el-form-item>
            <el-form-item v-if="!isEditing" label="类型" :label-width="formLabelWidth">
                <el-select v-model="form.plugin_name" placeholder="选择数据源类型">
                    <el-option v-for="item in inputType" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="item.label" :label-width="formLabelWidth" v-for="(item, idx) in form.fields"
                          :key="idx">
                <el-input v-if="item.type==='input'" v-model="item.value" autoComplete="off"></el-input>
                <template v-if="item.type==='combine'">
                    <el-input v-model="item.value" autoComplete="off"
                              style="width: 80px;margin-right: 10px;"></el-input>
                    <el-select v-model="item.unit" style="width: 70px">
                        <el-option v-for="item in units" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </template>
                <template v-if="item.type==='radio'">
                    <el-radio-group v-model="item.value">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </template>
                <template v-if="item.type==='list'">
                </template>
                <template v-if="item.type==='select'">
                    <el-select v-model="item.default" placeholder="请选择">
                        <el-option v-for="(key, val) in item.choice" :key="key" :value="val"> </el-option>
                    </el-select>
                </template>
                <el-input v-if="item.type==='text'" type="textarea" v-model="item.value" autoComplete="off"
                          :rows="10"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  export default {
    name: "lean-form",
    props: {
      // 配置样例，根据配置样例，生成不同的配置项
      sampleData: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 只要reset发生变化就会重置表单（外部可以通过控制reset进行变化，来清空表单）
      reset: {
        type: Boolean,
        default: false
      },
      // 以下是编辑表单使用的props
      // 是否是编辑模式： true为编辑模式，需要传入 formdata 和 currentType
      isEditing: {
        type: Boolean,
        default: false
      },
      // 编辑时，当前表单的值
      formData: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 当前plugin_type，更具当前plugin_type 获取对应的 sampleData
      currentType: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        formLabelWidth: '140px',
        // 表单项
        form: {
          plugin_name: '',
          fields: [] //动态生成的表单项 {key 表单项对应的变量, value 变量的默认值, label 表单项的label, type 标单项的类型}
        },
        units: ['s', 'ms'],
      }
    },
    computed: {
      dataType() {
        console.log(this.form.plugin_name)
        return this.form.plugin_name
      },
      inputType() {
        return Object.keys(this.sampleData)
      }
    },
    watch: {
      currentType(cur, old) {
        console.log(this.formData)
        this.formatForm()
      },
      dataType(cur, old) {
        this.formatForm()
      },
      'form.fields': {
        handler() {
          console.log(this.form)
          this.$emit('changeFormData', this.form)
        },
        deep: true
      },
      reset(cur, old) {
        this.resetForm()
      }
    },
    methods: {
      // 根据config sample生成对应的form表单列表
      formatForm() {
        this.form.fields = []

        let inputType = !this.isEditing ? this.dataType : this.currentType

        if (!inputType) return

        console.log(this.sampleData);

        Object.keys(this.sampleData).length > 0 && this.sampleData[inputType].forEach((item, idx) => {
          if (item.Type !== 'none' && item.Key !== 'plugin_name') {
            // 如果是combinetype，value的值为‘2s’，需要把单位和值匹配出来
            if (item.Type === 'combine') {
              let tempVal = !this.isEditing ? item.Default : this.formData[item.Key]
              let unit = /[a-z]*$/.exec(tempVal)[0]
              let interval = /^[0-9]*/.exec(tempVal)[0]
              this.form.fields.push({
                key: item.Key,
                value: interval,
                label: item.Label,
                choice: item.Choice,
                default: item.Default,
                type: item.Type,
                unit: unit
              });
            } else {
              if (item.Type === 'text' && !this.isEditing) return
              this.form.fields.push({
                key: item.Key,
                value: !this.isEditing ? item.Default : this.formData[item.Key],
                label: item.Label,
                choice: item.Choice,
                default: item.Default,
                type: item.Type
              })
            }
          }
        })
      },
      formChange() {
        console.log('change')
      },
      resetForm() {
        this.form = {
          plugin_name: '',
          fields: []
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.formatForm()
      })
    }
  }
</script>
