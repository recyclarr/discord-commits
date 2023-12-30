import st from 'stjs'
import { CommitTemplate } from './CommitTemplate'

export function loadTemplate(name: string): CommitTemplate {
  try {
    return require(`./templates/${name}`).default
  } catch (err) {
    return require('./templates/plain').default
  }
}

export function stringToBoolean(string: string): boolean {
  switch (string.toLowerCase().trim()) {
    case 'false':
    case 'no':
    case '0':
    case '':
    case null:
      return false
    default:
      return true
  }
}

export function stringOrFalse(string: string): string | boolean {
  switch (string.toLowerCase().trim()) {
    case 'false':
    case 'no':
    case '0':
    case '':
    case null:
      return false
    default:
      return string
  }
}

type CommitDetails = {
  title: string
  description: string
  message: string
}

export function createCommit(commit: { message: string }): CommitDetails {
  const messageSections = commit.message.split('\n\n')
  return {
    title: messageSections[0],
    description: messageSections.slice(1).join('\n\n'),
    ...commit
  }
}

export function parseTemplate(data: any, template: CommitTemplate) {
  return st.select(data).transformWith(template).root()
}
