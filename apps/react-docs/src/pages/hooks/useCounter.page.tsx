import { PreviewContainer } from '@scxfe/docs-preview-react';
import { DemoLayout } from '@scxfe/docs-ui-react';
// @ts-expect-error: react-hooks package missing type declarations
import { useCounter } from '@scxfe/react-hooks';

const useCounterBasicCode = `
import { useCounter } from '@scxfe/react-hooks';

function CounterDemo() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div>
      <p>当前值: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
`;

const useCounterInitialCode = `
import { useCounter } from '@scxfe/react-hooks';

function CounterDemo() {
  const { count, increment, decrement, reset } = useCounter({
    initial: 10,
    min: 0,
    max: 20
  });

  return (
    <div>
      <p>当前值: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
`;

function UseCounterDemo() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div>
      <p>当前值: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}

function UseCounterInitialDemo() {
  const { count, increment, decrement, reset } = useCounter({
    initial: 10,
    min: 0,
    max: 20,
  });

  return (
    <div>
      <p>当前值: {count}</p>
      <p>范围: 0 - 20</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}

export default function UseCounterPage() {
  return (
    <div>
      <h1>useCounter 计数器</h1>
      <p>简单的计数器 Hook。</p>

      <DemoLayout title="基础用法" description="最简单的计数器用法。">
        <PreviewContainer code={useCounterBasicCode}>
          <UseCounterDemo />
        </PreviewContainer>
      </DemoLayout>

      <DemoLayout title="自定义初始值" description="设置初始值和范围限制。">
        <PreviewContainer code={useCounterInitialCode}>
          <UseCounterInitialDemo />
        </PreviewContainer>
      </DemoLayout>
    </div>
  );
}
