# 今天是儿童节，整个贪吃蛇到编辑器里玩儿吧
## 引言

这是深入浅出 Quill 系列的第6篇。

之前在掘金看到过一篇写贪吃蛇游戏的文章。

[《canvas 300行代码实现一个贪吃蛇 》](https://juejin.cn/post/6959789039566192654)

于是我突发奇想：

> 能不能把这个贪吃蛇游戏插入到编辑中呢？

大家在日常工作中有遇到往编辑器里插入什么奇葩内容呢？

欢迎在评论区讨论。

## 1 依然是插入自定义内容

按照以下四个步骤来就行：

*   第一步：自定义工具栏按钮
*   第二步：自定义 Blot 内容
*   第三步：在 Quill 注册自定义 Blot
*   第四步：调用 Quill 的 API 插入自定义内容

## 2 第一步：自定义工具栏按钮

这个非常简单：
```ts
    const TOOLBAR_CONFIG = [
      [{ header: ['1', '2', '3', false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
      ['card', 'divider', 'emoji', 'file', 'tag'],
      ['dragon', 'snake'], // 新增的
    ];
```
自定义工具栏按钮图标：
```ts
    const snakeIcon = `<svg>...</svg>`;
    const icons = Quill.import('ui/icons');
    icons.snake = snakeIcon;
```
增加工具栏按钮事件：
```ts
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: {
          container: TOOLBAR_CONFIG,
          handlers: {
            ...
            // 增加一个空的事件
            snake(value): void {
              console.log('snake~~');
            },
          },
        }
      },
    });
```
## 3 第二步：自定义 Blot 内容 SnakeBlot

snake.ts

```ts
import Quill from 'quill';
import GreedySnake from '../../shared/greedy-snake';

const BlockEmbed = Quill.import('blots/block/embed');

class SnakeBlot extends BlockEmbed {
  static blotName = 'snake';
  static tagName = 'canvas';

  static create(value): any {
    const node = super.create(value);
    const { id, width, height } = value;

    node.setAttribute('id', id || SnakeBlot.blotName);
    if (width !== undefined) {
      node.setAttribute('width', width);
    }
    if (height !== undefined) {
      node.setAttribute('height', height);
    }

    // 绘制贪吃蛇游戏的代码参考掘金文章：https://juejin.cn/post/6959789039566192654
    new GreedySnake(node).start();
    
    return node;
  }
}

export default SnakeBlot;

```

### 3.1 绘制贪吃蛇

绘制贪吃蛇的代码参考掘金文章：

[canvas 300行代码实现一个贪吃蛇](https://juejin.cn/post/6959789039566192654)

greedy-snake.ts
```ts
    // 大小为64 * 40
    export default class GreedySnake {
      canvas;
      ctx;
      maxX;
      maxY;
      itemWidth;
      direction;
      speed;
      isStop;
      isOver;
      isStart;
      score;
      timer;
      j;
      canChange;
      grid;
      snake;
      food;

      // mask;
      // scoreDom;

      constructor(container) {
        this.canvas = typeof container === 'string' ? document.querySelector(container) : container;
        this.canvas.setAttribute('width', 640);
        this.canvas.setAttribute('height', 400);
        this.canvas.setAttribute('style', 'border: solid 2px #ddd');
        this.ctx = this.canvas.getContext('2d');
        this.maxX = 64;          // 最大行
        this.maxY = 40;          // 最大列
        this.itemWidth = 10;     // 每个点的大小
        this.direction = 'right'; // up down right left 方向
        this.speed = 150;        // ms 速度
        this.isStop = false;     // 是否暂停
        this.isOver = false;     // 是否结束
        this.isStart = false;    // 是否开始
        this.score = 0;          // 分数
        this.timer = null;       // 移动定时器
        this.j = 1;
        this.canChange = true;

        this.grid = new Array();

        // this.scoreDom = document.querySelector('#score');
        // this.mask = document.querySelector('#mask');

        for (let i = 0; i < this.maxX; i++) {
          for (let j = 0; j < this.maxY; j++) {
            this.grid.push([i, j]);
          }
        }

        this.drawGridLine();
        this.getDirection();

        document.addEventListener('keydown', (event) => {
          if (event.keyCode === 13) {
            if (!this.isStart) return;
            this.start();
          }
        });
      }

      // 开始
      start(): void {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (!this.isStart) {
          this.isStart = true;
        }
        this.score = 0;
        this.speed = 150;
        this.isStop = false;
        this.isOver = false;
        this.direction = 'right';
        this.createSnake();
        this.createFood();
        this.draw();
        this.move();
        // this.mask.style.display = 'none';
      }

      // 创建蛇主体
      createSnake(): void {
        this.snake = [
          [4, 25],
          [3, 25],
          [2, 25],
          [1, 25],
          [0, 25]
        ];
      }

      // 移动
      move(): void {
        if (this.isStop) {
          return;
        }

        let [x, y] = this.snake[0];
        switch (this.direction) {
          case 'left':
            x--;
            break;
          case 'right':
            x++;
            break;
          case 'up':
            y--;
            break;
          case 'down':
            y++;
            break;
        }

        // 如果下一步不是食物的位置
        if (x !== this.food[0] || y !== this.food[1]) {
          this.snake.pop();
        } else {
          this.createFood();
        }

        if (this.over([x, y])) {
          this.isOver = true;
          // this.mask.style.display = 'block';
          // this.mask.innerHTML = '结束';
          return;
        }
        if (this.completed()) {
          // this.mask.style.display = 'block';
          // this.mask.innerHTML = '恭喜您，游戏通关';
          return;
        }

        this.snake.unshift([x, y]);

        this.draw();
        this.canChange = true;
        this.timer = setTimeout(() => this.move(), this.speed);
      }

      // 暂停游戏
      stop(): void {
        if (this.isOver) {
          return;
        }
        this.isStop = true;
        // this.mask.style.display = 'block';
        // this.mask.innerHTML = '暂停';
      }

      // 继续游戏
      continue(): void {
        if (this.isOver) {
          return;
        }
        this.isStop = false;
        this.move();
        // this.mask.style.display = 'none';
      }

      getDirection(): void {
        // 上38 下40 左37 右39 不能往相反的方向走
        document.onkeydown = (e) => {
          // 在贪吃蛇移动的间隔内不能连续改变两次方向
          if (!this.canChange) {
            return;
          }
          switch (e.keyCode) {
            case 37:
              if (this.direction !== 'right') {
                this.direction = 'left';
                this.canChange = false;
              }
              break;
            case 38:
              if (this.direction !== 'down') {
                this.direction = 'up';
                this.canChange = false;
              }
              break;
            case 39:
              if (this.direction !== 'left') {
                this.direction = 'right';
                this.canChange = false;
              }
              break;
            case 40:
              if (this.direction !== 'up') {
                this.direction = 'down';
                this.canChange = false;
              }
              break;
            case 32:
              // 空格暂停与继续
              if (!this.isStop) {
                this.stop();
              } else {
                this.continue();
              }
              break;
          }
        };
      }
      createPos(): any {
        // tslint:disable-next-line: no-bitwise
        const [x, y] = this.grid[(Math.random() * this.grid.length) | 0];

        for (const item of this.snake) {
          if (item[0] === x && item[1] === y) {
            return this.createPos();
          }
        }
        // for (let i = 0; i < this.snake.length; i++) {
        //   if (this.snake[i][0] === x && this.snake[i][1] === y) {
        //     return this.createPos();
        //   }
        // }

        return [x, y];
      }
      // 生成食物
      createFood(): void {
        this.food = this.createPos();

        // 更新分数
        // this.scoreDom.innerHTML = 'Score: ' + this.score++;

        if (this.speed > 50) {
          this.speed--;
        }
      }

      // 结束
      over([x, y]): boolean {
        if (x < 0 || x >= this.maxX || y < 0 || y >= this.maxY) {
          return true;
        }

        if (this.snake.some(v => v[0] === x && v[1] === y)) {
          return true;
        }
      }

      // 完成
      completed(): boolean {
        if (this.snake.length === this.maxX * this.maxY) {
          return true;
        }
      }

      // 网格线
      drawGridLine(): void {
        for (let i = 1; i < this.maxY; i++) {
          this.ctx.moveTo(0, i * this.itemWidth);
          this.ctx.lineTo(this.canvas.width, i * this.itemWidth);
        }

        for (let i = 1; i < this.maxX; i++) {
          this.ctx.moveTo(i * this.itemWidth, 0);
          this.ctx.lineTo(i * this.itemWidth, this.canvas.height);
        }
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#ddd';
        this.ctx.stroke();
      }

      // 绘制
      draw(): void {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawGridLine();

        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(
          this.food[0] * this.itemWidth + this.j,
          this.food[1] * this.itemWidth + this.j,
          this.itemWidth - this.j * 2,
          this.itemWidth - + this.j * 2
        );
        // tslint:disable-next-line: no-bitwise
        this.j ^= 1;

        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(
          this.snake[0][0] * this.itemWidth + 0.5,
          this.snake[0][1] * this.itemWidth + 0.5,
          this.itemWidth - 1,
          this.itemWidth - 1
        );
        this.ctx.fillStyle = 'red';
        for (let i = 1; i < this.snake.length; i++) {
          this.ctx.fillRect(
            this.snake[i][0] * this.itemWidth + 0.5,
            this.snake[i][1] * this.itemWidth + 0.5,
            this.itemWidth - 1,
            this.itemWidth - 1
          );
        }
      }
    }
```
## 4 第三步：在 Quill 注册自定义 Blot

有了 SnakeBlot，还需要将其注册到 Quill 中才能使用：
```ts
    import SnakeBlot from './formats/snake';
    Quill.register('formats/snake', SnakeBlot);
```
## 5 第四步：调用 Quill 的 API 插入自定义内容

调用完 API 就可以玩贪吃蛇游戏啦，开心到飞起！
```ts
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: {
          container: TOOLBAR_CONFIG,
          handlers: {
            ...
            snake(value): void {
              console.log('snake~~');
              const index = this.quill.getSelection().index;
              // 插入自定义内容
              this.quill.insertEmbed(index, 'snake', {
                id: 'canvas-snake',
              });
            },
          },
        }
      },
    });
```
效果图：

![插入贪吃蛇游戏2.gif](/assets/rich-text-editor-insert-snake-game-1.gif)

## 总结

在富文本中插入自定义内容的思路都是类似的，定义一个自定义 Blot 内容格式，然后注册这个自定义 Blot，调用 Quill 提供的方法进行内容插入。

大家可以尝试按照以上思路，尝试在 Quill 中插入：
- ECharts 图表
- PDF 文档
- PPT 文档

![charts图表.png](/assets/rich-text-editor-insert-snake-game-2.png)

深入浅出 Quill 系列还有最后一篇，主要给大家分享富文本编辑器的技术选型，也是对前面内容的一个总结，敬请期待！


<EditInfo time="2021年06月01日 08:34" title="阅读 3712 ·  点赞 41 ·  评论 21 ·  收藏 15" />
 
 