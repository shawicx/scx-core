import { PreviewContainer } from '@scxfe/docs-preview-react';
import { DemoLayout } from '@scxfe/docs-ui-react';
import { GradientBorder, GradientBorderPlacement } from '@scxfe/react-ui';

const gradientBorderBasicCode = `
import { GradientBorder, GradientBorderPlacement } from '@scxfe/react-ui';

<GradientBorder
  width="100%"
  height="200px"
  gradientColor="#1890ff"
  placement={GradientBorderPlacement.TOP_BOTTOM}
>
  <div style={{ padding: '20px' }}>
    <h4>渐变边框容器</h4>
    <p>这是一个带有渐变边框的容器组件。</p>
  </div>
</GradientBorder>
`;

const gradientBorderLeftRightCode = `
import { GradientBorder, GradientBorderPlacement } from '@scxfe/react-ui';

<GradientBorder
  width="100%"
  height="200px"
  gradientColor="#52c41a"
  placement={GradientBorderPlacement.LEFT_RIGHT}
>
  <div style={{ padding: '20px' }}>
    <h4>左右渐变</h4>
    <p>左右两侧显示渐变边框。</p>
  </div>
</GradientBorder>
`;

export default function GradientBorderPage() {
  return (
    <div>
      <h1>GradientBorder 渐变边框</h1>
      <p>带有渐变边框的容器组件。</p>

      <DemoLayout title="基础用法" description="最简单的渐变边框用法，使用上下渐变方向。">
        <PreviewContainer code={gradientBorderBasicCode}>
          <GradientBorder
            width="100%"
            height="200px"
            gradientColor="#1890ff"
            placement={GradientBorderPlacement.TOP_BOTTOM}
          >
            <div style={{ padding: '20px' }}>
              <h4>渐变边框容器</h4>
              <p>这是一个带有渐变边框的容器组件。</p>
            </div>
          </GradientBorder>
        </PreviewContainer>
      </DemoLayout>

      <DemoLayout title="不同方向" description="支持多种渐变方向配置。">
        <PreviewContainer code={gradientBorderLeftRightCode}>
          <GradientBorder
            width="100%"
            height="200px"
            gradientColor="#52c41a"
            placement={GradientBorderPlacement.LEFT_RIGHT}
          >
            <div style={{ padding: '20px' }}>
              <h4>左右渐变</h4>
              <p>左右两侧显示渐变边框。</p>
            </div>
          </GradientBorder>
        </PreviewContainer>
      </DemoLayout>
    </div>
  );
}
