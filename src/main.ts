import core from '@actions/core'
import github from '@actions/github'
const fetch = require('node-fetch')
import {
  createCommit,
  loadTemplate,
  parseTemplate,
  stringOrFalse,
  stringToBoolean
} from './api.js'
import defaultPayload from './defaults/payload-commits.js'
import { EmbedBuilder, WebhookClient } from 'discord.js'

interface DiscordTemplate{
  function Send();
}

export function Send(client: WebhookClient, commit: any) {
  let embed = new EmbedBuilder()
    .setTitle(commit.title)
    .setDescription(commit.description)
    .setURL(commit.url)
    .setAuthor({ name: commit.author.name });

  client.send({
    embeds: [embed],
  });
}
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  const templateName = core.getInput('template') || 'plain'
  const template = await loadTemplate(templateName)

  const message = core.getInput('message') || template.message
  const webhook = core.getInput('webhook')
  const lastCommitOnly = core.getBooleanInput('last-commit-only')
  const extraEmbeds = core.getBooleanInput('include-extras')
    ? template.extras ?? []
    : []

  let embed = core.getInput('embed') ?? JSON.stringify(template.embed)

  const DATA = {
    env: { ...process.env },
    github: { ...github }
  }

  github.context.payload.commits ??= defaultPayload

  if (lastCommitOnly) {
    github.context.payload.commits = github.context.payload.commits.slice(-1)
  }

  let embeds = github.context.payload.commits.map(
    (commit: { message: string }) => {
      return parseTemplate(
        {
          ...DATA,
          commit: createCommit(commit)
        },
        JSON.parse(embed)
      )
    }
  )

  embeds = embeds.concat(extraEmbeds.map(x => parseTemplate(DATA, x)))

  const payload = {
    content: parseTemplate(DATA, message),
    embeds: embeds.filter(x => x)
  }

  try {
    await fetch(`${webhook}?wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-GitHub-Event': 'push'
      },
      body: JSON.stringify(payload)
    })
  } catch (err) {
    console.error(err)
    core.error(err)
    core.setFailed('Message :', err.response ? err.response.data : err.message)
  }
}
