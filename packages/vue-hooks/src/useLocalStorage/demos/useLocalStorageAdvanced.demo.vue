<script setup lang="ts">
import { useLocalStorage } from '../../useLocalStorage';

const title = '高级用法';
const description = '展示 useLocalStorage hook 的序列化功能和自定义序列化器。';

const person = useLocalStorage('demo-person', {
  name: '张三',
  age: 25,
  city: '北京',
});

const tags = useLocalStorage('demo-tags', ['Vue', 'React', 'TypeScript']);

const customSerializer = {
  read: (value: string) => {
    try {
      const parsed = JSON.parse(value);
      return parsed.timestamp;
    } catch {
      return Date.now();
    }
  },
  write: (value: number) => {
    return JSON.stringify({
      timestamp: value,
      updatedAt: new Date().toISOString(),
    });
  },
};

const timestamp = useLocalStorage('demo-timestamp', Date.now(), {
  serializer: customSerializer,
});
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <div class="storage-item">
        <h4>存储对象</h4>
        <div class="object-display">
          <div class="field-group">
            <label>姓名:</label>
            <input v-model="person.name" type="text" class="input" />
          </div>
          <div class="field-group">
            <label>年龄:</label>
            <input v-model.number="person.age" type="number" class="input" />
          </div>
          <div class="field-group">
            <label>城市:</label>
            <input v-model="person.city" type="text" class="input" />
          </div>
        </div>
        <div class="hint">对象会自动序列化为 JSON</div>
      </div>

      <div class="storage-item">
        <h4>存储数组</h4>
        <div class="tags-display">
          <span v-for="(tag, index) in tags" :key="index" class="tag">
            {{ tag }}
            <button class="tag-close" @click="tags.splice(index, 1)">×</button>
          </span>
          <button class="add-tag-btn" @click="tags.push('New Tag')">+ 添加标签</button>
        </div>
        <div class="hint">数组会自动序列化为 JSON</div>
      </div>

      <div class="storage-item">
        <h4>自定义序列化器</h4>
        <div class="timestamp-display">
          <div class="timestamp-value">
            {{ new Date(timestamp).toLocaleString('zh-CN') }}
          </div>
          <button class="btn" @click="timestamp = Date.now()">更新时间戳</button>
        </div>
        <div class="hint">使用自定义的序列化器处理时间戳</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background-color: #fff;
}

.demo-title {
  margin-bottom: 20px;
}

.demo-title h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.demo-title p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.storage-item h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.object-display {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.field-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.field-group label {
  min-width: 40px;
  font-size: 14px;
  color: #666;
}

.input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

.input:focus {
  outline: none;
  border-color: #1890ff;
}

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  font-size: 14px;
  color: #1890ff;
}

.tag-close {
  margin-left: 4px;
  padding: 0 4px;
  border: none;
  background: transparent;
  color: #1890ff;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.tag-close:hover {
  color: #ff4d4f;
}

.add-tag-btn {
  padding: 4px 8px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
}

.add-tag-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.timestamp-display {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.timestamp-value {
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  text-align: center;
}

.btn {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.hint {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}
</style>
