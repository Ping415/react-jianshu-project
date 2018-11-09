import { injectGlobal } from "styled-components";

//全局样式
injectGlobal`
  @keyframes hide-item {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    color: red;
  }
}

.hide {
  /* forwards保存最后一帧动画样式 */
  animation: hide-item 2s ease-in forwards;
}
`
