/**
 * Returns a message and no embeds
 */

import { CommitTemplate } from "../CommitTemplate";

const template: CommitTemplate = {
  message:
    "Successful commit to **{{ github.context.payload.repository.owner.name }}/{{ github.context.payload.repository.name}}**",
  extras: [
    {
      title: "View All Changes",
      url: "{{ github.context.payload.compare }}",
    },
  ],
};

export default template;
