import { PreviewContainer } from '@scxfe/docs-preview-react';
import { DemoLayout } from '@scxfe/docs-ui-react';
// @ts-expect-error: react-hooks package missing type declarations
import { useToggle } from '@scxfe/react-hooks';

const useToggleBasicCode = `
import { useToggle } from '@scxfe/react-hooks';

function ToggleDemo() {
  const { state, toggle } = useToggle();

  return (
    <div>
      <p>当前状态: {state ? '开' : '关'}</p>
      <button onClick={toggle}>切换</button>
    </div>
  );
}
`;

const useToggleInitialCode = `
import { useToggle } from '@scxfe/react-hooks';

function ToggleDemo() {
  const { state, toggle, setTrue, setFalse } = useToggle({
    initialValue: true
  });

  return (
    <div>
      <p>当前状态: {state ? '开' : '关'}</p>
      <button onClick={toggle}>切换</button>
      <button onClick={setTrue}>设为开</button>
      <button onClick={setFalse}>设为关</button>
    </div>
  );
}
`;

function UseToggleDemo() {
  const { state, toggle } = useToggle();

  return (
    <div>
      <p>当前状态: {state ? '开' : '关'}</p>
      <button onClick={toggle}>切换</button>
    </div>
  );
}

function UseToggleInitialDemo() {
  const { state, toggle, setTrue, setFalse } = useToggle({
    initialValue: true,
  });

  return (
    <div>
      <p>当前状态: {state ? '开' : '关'}</p>
      <button onClick={toggle}>切换</button>
      <button onClick={setTrue}>设为开</button>
      <button onClick={setFalse}>设为关</button>
    </div>
  );
}

export default function UseTogglePage() {
  return (
    <div>
      <h1>useToggle 切换</h1>
      <p>布尔值切换 Hook。</p>

      <DemoLayout title="基础用法" description="最简单的切换用法。">
        <PreviewContainer code={useToggleBasicCode}>
          <UseToggleDemo />
        </PreviewContainer>
      </DemoLayout>

      <DemoLayout title="自定义初始值" description="设置初始值为 true。">
        <PreviewContainer code={useToggleInitialCode}>
          <UseToggleInitialDemo />
        </PreviewContainer>
      </DemoLayout>
    </div>
  );
}
