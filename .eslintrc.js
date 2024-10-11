module.exports = {
  root: true, // 让eslint不要往父级去继续查找配置
  env: {
    node: true, // 因为某些文件，如某些构建脚本之类的运行在node环境，所以这里也指定了node相关的全局变量
  },
  globals: {
    // Ref sugar (take 2)
    $: "readonly",
    $$: "readonly",
    $ref: "readonly",
    $shallowRef: "readonly",
    $computed: "readonly",

    // index.d.ts
    // global.d.ts
    Fn: "readonly",
    PromiseFn: "readonly",
    RefType: "readonly",
    LabelValueOptions: "readonly",
    EmitType: "readonly",
    TargetContext: "readonly",
    ComponentElRef: "readonly",
    ComponentRef: "readonly",
    ElRef: "readonly",
    global: "readonly",
    ForDataType: "readonly",
    ComponentRoutes: "readonly",
    DICT: "readonly",

    // script setup
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  extends: [
    "plugin:vue/vue3-essential", // 使用eslint-plugin-vue的vue3-recommended规则集校验vue模板
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/eslint-config-typescript",
    "plugin:prettier/recommended", // eslint-plugin-prettier作用是让eslint用prettier来格式化，相当于当代码格式不符合prettier的配置的时候，也可以报错一个eslint错误
  ],
  parser: "vue-eslint-parser", // 因为需要校验vue模板文件里面的html，所以这里使用vue-eslint-parser这个parser作为解释器
  parserOptions: {
    // 因为上面使用了vue-eslint-parser，它只会校验模板里面的html，对于script里面的ts，仍然需要其他解释器去处理,所以vue-eslint-parser就预留了parser选项让我们传进去解释器
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020, // 这里我们使用es2020的语法，所以在这里指定一下
    sourceType: "module", // 我们的文件都是模块而非script，所以这里指定成module
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true, // 项目用到了jsx的写法，所以要开启jsx
    },
  },
  rules: {
    "vue/no-mutating-props": "off",
    "vue/valid-v-for": "off",
    "vue/require-v-for-key": "off",
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off", // any
    "no-debugger": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off", // setup()
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
