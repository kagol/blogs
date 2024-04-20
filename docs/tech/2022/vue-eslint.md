# 前端 Vuer，请给你的项目加上 ESLint

![](/assets/vue-eslint-1.png)

## 1 ESLint 是什么

ESLint 是一个插件式的 JavaScript / JSX 代码检查工具，用于检测和修复 JavaScript 代码中的问题，目标是让代码更一致并避免错误。

## 2 在 Vue 项目中引入 ESLint

使用 Vue CLI 搭建的 Vue2 项目已经自带 ESLint，就不赘述，我们看下 Vite 搭建的 Vue3 项目中怎么引入 ESLint。

使用以下命令搭建一个 Vue3 项目：
```shell
npm create vite@latest vue3-project
```

创建之后，启动起来：
```shell
npm i
npm run dev
```

效果如下：

![](/assets/vue-eslint-2.png)

### 2.1 引入 ESLint

执行以下命令：
```shell
npm init @eslint/config
```

进入交互式界面，可通过上下方向键选择，通过按回车键确定。

第一个问题是：
- 你希望用 ESLint 来干嘛？
- 我们选择最全面的那个：检查语法，发现问题，并强制统一代码样式

```
$ npm init @eslint/config
? How would you like to use ESLint? … 
  To check syntax only
  To check syntax and find problems
❯ To check syntax, find problems, and enforce code style
```

第二个问题是：
- 你的项目用的是什么模块系统？
- 因为是运行在浏览器端，选择 `ESModule`

```
? What type of modules does your project use? … 
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
```

第三个问题是：
- 你用的什么框架？（居然没有 Angular）
- 选择 `Vue`

```
? Which framework does your project use? … 
  React
❯ Vue.js
  None of these
```

第四个问题是：
- 你是否使用 TypeScript？
- 选择 `Yes`

```
? Does your project use TypeScript? › No / Yes
```

第五个问题是：
- 你的代码运行在什么环境？（这个可以多选）
- 选择 `Browser` 浏览器环境

```
? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser
✔ Node
```

第六个问题是：
- 你想定义怎样的代码风格？
- 选择使用一个流行的代码风格

```
? How would you like to define a style for your project? … 
❯ Use a popular style guide
  Answer questions about your style
```

第七个问题是：
- 你想使用哪个样式风格？
- `Airbnb` 用的人比较多，就选这个吧

```
? Which style guide do you want to follow? … 
❯ Airbnb: https://github.com/airbnb/javascript
  Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo
```

第八个问题是：
- 配置文件用什么格式？
- 就选 JavaScript 吧（生成 `eslintrc.js` 文件）

```
? What format do you want your config file to be in? … 
❯ JavaScript
  YAML
  JSON
```

完成！是不是超级简单！

看下我们都选了哪些配置：

```
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · vue
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
```

主要给我们安装了以下依赖：
- `eslint-config-airbnb-base@15.0.0`
- `eslint-plugin-import@2.26.0`
- `eslint-plugin-vue@9.2.0`
- `eslint@8.20.0`
- `@typescript-eslint/parser@5.30.6`
- `@typescript-eslint/eslint-plugin@5.30.6`

并生成了一个 `eslintrc.cjs` 配置文件：
```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  
  // 自定义 rules 规则
  rules: {
  },
};
```

### 2.2 ESLint 配置

- parser 解析器
- extends 配置扩展
- plugins 插件
- rules 自定义规则 [https://eslint.org/docs/latest/rules/](https://eslint.org/docs/latest/rules/)
- eslint-disable-next-line 禁用ESLint

### 2.3 执行 ESLint 代码检查

在 package.json 文件的 scripts 中配置 lint 脚本命令：

```json
"scripts": {
  "dev": "vite",
  "build": "vue-tsc --noEmit && vite build",
  "preview": "vite preview",
  
  // 配置 lint 脚本命令
  "lint": "eslint --ext .vue,.ts src/"
},
```

执行 lint 脚本命令：

```shell
npm run lint
```

出现了一堆报错：

```
/vue3-project/src/App.vue
  4:53  error  Missing semicolon  semi

/vue3-project/src/components/HelloWorld.vue
  2:26  error  Missing semicolon  semi
  4:31  error  Missing semicolon  semi
  6:21  error  Missing semicolon  semi

/vue3-project/src/main.ts
  1:32  error  Missing semicolon  semi
  2:21  error  Missing semicolon  semi
  3:28  error  Missing semicolon  semi
  5:29  error  Missing semicolon  semi

/vue3-project/src/vite-env.d.ts
  4:3   error  Expected 1 empty line after import statement not followed by another import  import/newline-after-import
  4:45  error  Missing semicolon                                                            semi
  5:48  error  Missing semicolon                                                            semi
  6:27  error  Missing semicolon                                                            semi

✖ 12 problems (12 errors, 0 warnings)
  12 errors and 0 warnings potentially fixable with the `--fix` option.
```

大部分都是说句尾没有分号，因为我们选择的是 Airbnb 代码规范，所以会有这个报错提示，不同的代码规范，内置的检查规则不一定完全相同。

### 2.4 自动修复 ESLint 问题

在 scripts 中增加自动修复 ESLint 问题的脚本命令：
```json
"scripts": {
  "dev": "vite",
  "build": "vue-tsc --noEmit && vite build",
  "preview": "vite preview",
  "lint": "eslint --ext .vue,.ts src/",
  
  // 自动修复 ESLint 问题脚本命令
  "lint:fix": "eslint --ext .vue,.ts src/ --fix"
},
```

执行：
```shell
npm run lint:fix
```

执行自动修复的命令之后，所有分号都加上了，未使用的变量也自动移除了。

再次执行：
```shell
npm run lint
```

没有再报错。

## 3 配置 husky 和 PR 门禁

### 3.1 配置 husky 门禁

为了确保每次提交(git commit)之前代码都通过 ESLint 检查，我们增加一个 pre-commit 门禁。

- 第一步：安装 husky 和 lint-staged

```shell
npm i lint-staged husky -D
```

- 第二步：在 package.json 的 scripts 中增加 prepare 脚本命令

```json
"scripts": {
  "dev": "vite",
  "build": "vue-tsc --noEmit && vite build",
  "preview": "vite preview",
  "lint": "eslint --ext .vue,.ts src/",
  "lint:fix": "eslint --ext .vue,.ts src/ --fix",
  
  // 在 npm install 之后自动执行，生成`.husky`目录。
  "prepare": "husky install"
},
```

- 第三步：执行 prepare 脚本

```shell
npm run prepare
```

该命令执行完会在项目根目录自动生成`.husky`目录。

- 第四步：增加 pre-commit 钩子

执行以下命令，会在`.husky`目录自动生成`pre-commit`文件钩子。

```shell
npx husky add .husky/pre-commit "npx lint-staged"
```

- 第五步：增加 lint-staged 配置

```json
"lint-staged": {
  "src/**/*.{vue,ts}": "eslint --fix"
},
```

通过以上五个步骤，以后每次使用`git commit`命令提交提交代码，都会：
- 被 pre-commit 钩子拦截
- 执行 npx lint-staged 命令
- 进而执行 eslint --fix 命令，对本次提交修改的代码涉及的文件进行代码检查，并自动修复能修复的错误，不能修复的错误会提示出来，只有所有 ESLint 错误都修复了才能提交成功

### 3.2 配置 PR 门禁

如果你在做自己的开源项目，并且非常幸运，有一群志同道合的小伙伴愿意一起参与贡献，这时为了统一大家的代码风格，让贡献者们专注于特性开发，不用担心代码格式规范问题，并通过 ESLint 工具提示贡献者，哪些代码可能带来潜在的风险，你就有必要给提交的 PR 加上 ESLint 门禁。

我们已经增加了本地的 ESLint 命令：

```json
"scripts": {
  "lint": "eslint --ext .vue,.ts src/",
},
```

我们需要在本目录创建一个`.github/workflows/pull-request.yml`文件，在该文件中写入以下内容：

```yml
name: Pull Request

on:
  push:
    branches: [ dev, main ]
  pull_request:
    branches: [ dev, main ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x]

    name: "ESLint"
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Install pnpm
        uses: npm/action-setup@v2
        with:
          version: 6

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install deps
        run: npm i

      - name: ESLint
        run: npm run lint
```

这样只要 PR 是往 dev 或 main 分支合入的，都会跑一遍这个 Github Actions 工作流任务，ESLint 检查不通过的话，PR 的 checks 里面会提示，拦截该 PR 的合入。

PR 的提交者看到提示，也可以点到任务里面去看是哪里报错，修改掉这些 ESLint 问题，PR 就会变成绿色，项目的管理员就可以顺利合入 PR 到目标分支啦🎉

## 4 常见的 ESLint 问题及修复案例

接下来跟大家分享 Vue DevUI 开源 Vue3 组件库 ESLint 问题修复过程中遇到的典型问题。

### 4.1 案例1：warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

该问题出现频率比较高，原因是有些类型写了`any`，需要明确的类型。

比如Pagination组件的单元测试文件`pagination.spec.ts`中：

```ts
const wrapper = mount({
    components: {
        DPagination
    },
    template: `<d-pagination ... />`
}, globalOption);

const btns = wrapper.findAll('a.devui-pagination-link');

expect(btns.map((ele: any) => ele.text()).join()).toEqual('<,1,...,4,5,6,...,16,>');
```

其中的`ele: any`就属于这类问题。

解决办法是给`ele`加上明确的类型，看逻辑是`<button>`元素，由于是`@vue/test-utils`库的包裹元素，因此需要包一层`DOMWrapper`：

```ts
import { DOMWrapper } from '@vue/test-utils';

expect(btns.map((ele:  DOMWrapper<Element>) => ele.text()).join()).toEqual('<,1,...,4,5,6,...,16,>');
```

### 4.2 案例2：'xxx' was used before it was defined no-use-before-define

这也是一个比较常见的问题，在声明之前使用变量或方法，解决办法也很简单，只需要调整下代码的顺序即可，将变量或方法的声明放在调用的语句之前。

比如Pagination组件的`pagination.tsx`中：

```ts
    // 极简模式下，可选的下拉选择页码
    const litePageOptions = computed(() =>  liteSelectOptions(totalPages.value));

    // 当前页码
    const cursor = computed({
      get() {
        // 是否需要修正错误的pageIndex
        if (!props.showTruePageIndex && props.pageIndex > totalPages.value) {
          emit('update:pageIndex', totalPages.value || 1);
          return totalPages.value || 1;
        }
        return props.pageIndex || 1;
      },
      set(val: number) {
        emit('update:pageIndex', val);
      }
    });

    // 总页数
    const totalPages = computed(() => Math.ceil(props.total / props.pageSize));
```

其中的`totalPages`的声明在比较靠后的位置，但是却在声明之前在`litePageOptions`和`cursor`变量中都使用了`totalPages`，所以提示 ESLint 问题。

解决的方法就是将`totalPages`的声明放在`litePageOptions`和`cursor`之前。

```ts
    // 总页数
    const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

    // 极简模式下，可选的下拉选择页码
    const litePageOptions = computed(() =>  liteSelectOptions(totalPages.value));

    // 当前页码
    const cursor = computed({ ... });
```

### 4.3 案例3：warning Missing return type on function @typescript-eslint/explicit-module-boundary-types

该问题是因为函数缺少返回类型，比如Fullscreen组件`utils.ts`文件的`launchImmersiveFullScreen`方法中：

```ts
export const launchImmersiveFullScreen = async (docElement: any) => {
  let fullscreenLaunch = null;
  if (docElement.requestFullscreen) {
    fullscreenLaunch = docElement.requestFullscreen();
  } else if (docElement.mozRequestFullScreen) {
    fullscreenLaunch = docElement.mozRequestFullScreen();
  } else if (docElement.webkitRequestFullScreen) {
    fullscreenLaunch = Promise.resolve(docElement.webkitRequestFullScreen());
  } else if (docElement.msRequestFullscreen) {
    fullscreenLaunch = Promise.resolve(docElement.msRequestFullscreen());
  }
  return await fullscreenLaunch.then(() => !!document.fullscreenElement);
};
```

先看下`launchImmersiveFullScreen`方法的参数问题，`docElement`用了`any`，也缺失了返回类型，`docElement`其实就是`document`对象，可以使用`HTMLElement`类型，但是`launchImmersiveFullScreen`这个方法是用来启动沉浸式全屏的，为了实现浏览器兼容，比如使用了`docElement.mozRequestFullScreen`兼容火狐，而这些方法在HTMLElement中是没有的，会报TS类型错误，所以需要做一些改造。

```ts
interface CompatibleHTMLElement extends HTMLElement {
  mozRequestFullScreen?: () => void;
  webkitRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
}
```

这里定义了一个`CompatibleHTMLElement`的类型，继承了`HTMLElement`，并增加了一些自定义的方法。

```ts
export const launchImmersiveFullScreen = async (docElement: CompatibleHTMLElement) => {
  ...
}
```

再来看下`launchImmersiveFullScreen`方法的返回类型问题。

```ts
return await fullscreenLaunch.then(() => !!document.fullscreenElement);
```

该方法返回了一个`Promise`对象，它的类型是一个泛型，我们需要传入具体的类型：

```ts
export const launchImmersiveFullScreen = async (docElement: CompatibleHTMLElement): Promise<boolean> => {
  ...
  return await fullscreenLaunch.then(() => !!document.fullscreenElement);
};
```

### 4.4 案例4：'xxx' is already declared in the upper scope @typescript-eslint/no-shadow

这个问题是由于嵌套的作用域中定义了相同的变量名，比如Tree组件的`use-checked.ts`文件中：

```ts
export default function useChecked(...) {
  const onNodeClick = (item: TreeItem) => {
    // 这里定义了 id 变量
    const { id } = item;
    ...
    filter 里面又定义了一个 id 参数
    const currentSelectedItem = flatData.filter(({ id }) => currentSelected[id] && currentSelected[id] !== 'none');
    ...
  }
}
```

修改方式就是将其中一个 id 的名字改了，比如把里面的 id 改成 itemId：

```ts
const currentSelectedItem = flatData.filter(({ id: itemId }) => currentSelected[itemId] && currentSelected[itemId] !== 'none');
```

欢迎在评论区分享你在项目中遇到的 `ESLint` 问题👏👏

<EditInfo time="2022年07月20日 07:58" title="阅读 3974 ·  点赞 80 ·  评论 31 ·  收藏 99" />
