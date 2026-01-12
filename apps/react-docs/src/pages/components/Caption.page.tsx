import { PreviewContainer } from '@scxfe/docs-preview-react';
import { DemoLayout } from '@scxfe/docs-ui-react';
import { Caption } from '@scxfe/react-ui';

const captionDefaultCode = `
import { Caption } from '@scxfe/react-ui';

<Caption>默认形状标题</Caption>
`;

const captionSquareCode = `
import { Caption } from '@scxfe/react-ui';

<Caption shape="square">方形标题</Caption>
`;

const captionCircleCode = `
import { Caption } from '@scxfe/react-ui';

<Caption shape="circle">圆形标题</Caption>
`;

export default function CaptionPage() {
  return (
    <div>
      <h1>Caption 标题</h1>
      <p>带有装饰性背景条的标题组件。</p>

      <DemoLayout title="基础用法" description="最简单的标题用法，使用默认形状。">
        <PreviewContainer code={captionDefaultCode}>
          <Caption>默认形状标题</Caption>
        </PreviewContainer>
      </DemoLayout>

      <DemoLayout title="不同形状" description="Caption 支持多种形状配置，包括默认、方形和圆形。">
        <PreviewContainer code={captionSquareCode}>
          <Caption shape="square">方形标题</Caption>
        </PreviewContainer>
      </DemoLayout>

      <DemoLayout title="圆形标题" description="使用圆形背景条。">
        <PreviewContainer code={captionCircleCode}>
          <Caption shape="circle">圆形标题</Caption>
        </PreviewContainer>
      </DemoLayout>
    </div>
  );
}
