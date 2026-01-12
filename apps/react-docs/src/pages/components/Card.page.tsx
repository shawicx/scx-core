import { PreviewContainer } from '@scxfe/docs-preview-react';
import { DemoLayout } from '@scxfe/docs-ui-react';
import { Card, CardMode } from '@scxfe/react-ui';

const cardDefaultCode = `
import { Card, CardMode } from '@scxfe/react-ui';

<Card mode={CardMode.DEFAULT}>
  <h4>默认模式卡片</h4>
  <p>这是一个默认模式的卡片组件。</p>
</Card>
`;

const cardGradientBorderCode = `
import { Card, CardMode } from '@scxfe/react-ui';

<Card mode={CardMode.GRADIENT_BORDER}>
  <h4>渐变边框卡片</h4>
  <p>这是一个渐变边框模式的卡片组件。</p>
</Card>
`;

const cardCustomStyleCode = `
import { Card, CardMode } from '@scxfe/react-ui';

<Card mode={CardMode.DEFAULT}>
  <h4>自定义样式卡片</h4>
  <p>您可以添加任意内容，包括文本、图片、表单等。</p>
  <div style={{ marginTop: '16px' }}>
    <button>操作按钮</button>
  </div>
</Card>
`;

export default function CardPage() {
  return (
    <div>
      <h1>Card 卡片</h1>
      <p>基础的卡片容器，用于承载内容。</p>

      <DemoLayout title="基础用法" description="最简单的卡片用法，使用默认模式。">
        <PreviewContainer code={cardDefaultCode}>
          <Card mode={CardMode.DEFAULT}>
            <h4>默认模式卡片</h4>
            <p>这是一个默认模式的卡片组件。</p>
          </Card>
        </PreviewContainer>
      </DemoLayout>

      <DemoLayout title="不同模式" description="Card 支持多种模式，包括默认模式和渐变边框模式。">
        <PreviewContainer code={cardGradientBorderCode}>
          <Card mode={CardMode.GRADIENT_BORDER}>
            <h4>渐变边框卡片</h4>
            <p>这是一个渐变边框模式的卡片组件。</p>
          </Card>
        </PreviewContainer>
      </DemoLayout>

      <DemoLayout title="自定义样式" description="卡片容器可以承载任意内容。">
        <PreviewContainer code={cardCustomStyleCode}>
          <Card mode={CardMode.DEFAULT}>
            <h4>自定义样式卡片</h4>
            <p>您可以添加任意内容，包括文本、图片、表单等。</p>
            <div style={{ marginTop: '16px' }}>
              <button>操作按钮</button>
            </div>
          </Card>
        </PreviewContainer>
      </DemoLayout>
    </div>
  );
}
