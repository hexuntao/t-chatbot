import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: '解释技术概念',
    message: `什么是ai?`
  },
  {
    heading: '总结一篇文章',
    message: '为二年级学生总结以下文章    : \n'
  },
  {
    heading: '起草电子邮件',
    message: `起草一封关于以下内容的电子邮件给我的老板    : \n`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">t-chatbot</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          基于openai chatGPT api 实现 仿 chatGPT 页面聊天功能
        </p>
        <p className="leading-normal text-muted-foreground">
          您可以在此处开始对话或尝试以下示例：
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
