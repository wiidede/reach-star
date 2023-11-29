import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  {
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
  unocss.configs.flat,
)
