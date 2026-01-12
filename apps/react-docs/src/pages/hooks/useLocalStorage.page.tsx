import { PreviewContainer } from '@scxfe/docs-preview-react';
import { DemoLayout } from '@scxfe/docs-ui-react';
// @ts-expect-error: react-hooks package missing type declarations
import { useLocalStorage } from '@scxfe/react-hooks';

const useLocalStorageBasicCode = `
import { useLocalStorage } from '@scxfe/react-hooks';

function StorageDemo() {
  const [value, setValue] = useLocalStorage('key', 'default');

  return (
    <div>
      <p>当前值: {value}</p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
`;

const useLocalStorageObjectCode = `
import { useLocalStorage } from '@scxfe/react-hooks';

function StorageDemo() {
  const [data, setData] = useLocalStorage('user', {
    name: '',
    age: 0
  });

  const updateName = (name: string) => {
    setData({ ...data, name });
  };

  return (
    <div>
      <p>姓名: {data.name}</p>
      <p>年龄: {data.age}</p>
      <input
        value={data.name}
        onChange={(e) => updateName(e.target.value)}
      />
    </div>
  );
}
`;

function UseLocalStorageBasicDemo() {
  const [value, setValue] = useLocalStorage('demo-key', 'default');

  return (
    <div>
      <p>当前值: {value}</p>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

function UseLocalStorageObjectDemo() {
  const [data, setData] = useLocalStorage('demo-user', {
    name: '',
    age: 0,
  });

  const updateName = (name: string) => {
    setData({ ...data, name });
  };

  return (
    <div>
      <p>姓名: {data.name}</p>
      <p>年龄: {data.age}</p>
      <input value={data.name} onChange={(e) => updateName(e.target.value)} />
    </div>
  );
}

export default function UseLocalStoragePage() {
  return (
    <div>
      <h1>useLocalStorage 本地存储</h1>
      <p>本地存储同步 Hook。</p>

      <DemoLayout title="基础用法" description="存储和读取简单值。">
        <PreviewContainer code={useLocalStorageBasicCode}>
          <UseLocalStorageBasicDemo />
        </PreviewContainer>
      </DemoLayout>

      <DemoLayout title="复杂对象" description="存储和读取复杂对象。">
        <PreviewContainer code={useLocalStorageObjectCode}>
          <UseLocalStorageObjectDemo />
        </PreviewContainer>
      </DemoLayout>
    </div>
  );
}
