/**
 * @type { import('@commitlint/types').UserConfig }
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    messages: {
      skip: '(回车跳过)',
      emptyWarning: '必填'
    },
    questions: {
      type: {
        description: '选择提交信息',
        enum: {
          feat: { description: '新功能' },
          fix: { description: '修复bug' },
          docs: { description: '文档' },
          style: { description: '样式，格式化，不影响功能' },
          refactor: { description: '重构' },
          perf: { description: '优化' },
          test: { description: '测试' },
          build: { description: '构建' },
          ci: { description: 'CI' },
          chore: { description: '其他修改' },
          revert: { description: '恢复上一次提交' }
        }
      },
      scope: { description: '影响范围' },
      subject: { description: '详细描述' }
    }
  }
};
