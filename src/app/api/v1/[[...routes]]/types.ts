import { t } from 'elysia';

/**
 * Schema for creating a new member
 * @typedef {Object} MemberSchema
 * @property {string} profileId - The ID of the member's profile
 * @property {string} resumeId - The ID of the member's resume
 * @property {string} chapterId - The ID of the chapter the member belongs to
 */
const memberSchema = t.Object({
  profileId: t.String(),
  resumeId: t.String(),
  chapterId: t.String(),
});

/**
 * Schema for creating a new event
 * @typedef {Object} EventSchema
 * @property {string} name - The name of the event
 * @property {string} [description] - Optional description of the event
 * @property {string} startDate - Start date/time in ISO format
 * @property {string} endDate - End date/time in ISO format
 * @property {string} location - Location where event takes place
 * @property {string} type - Type of event
 * @property {string} status - Current status of event
 * @property {string} [chapterId] - Optional ID of chapter hosting event
 */
const eventSchema = t.Object({
  name: t.String(),
  description: t.Optional(t.String()),
  startDate: t.String(), // Will be converted to DateTime
  endDate: t.String(), // Will be converted to DateTime
  location: t.String(),
  type: t.String(),
  status: t.String(),
  chapterId: t.Optional(t.String()),
});

/**
 * Schema for creating a new resource
 * @typedef {Object} ResourceSchema
 * @property {string} title - Title of the resource
 * @property {string} type - Type of resource (e.g. article, video)
 * @property {string} url - URL where resource can be accessed
 * @property {string} [description] - Optional description
 * @property {string} category - Category the resource belongs to
 * @property {string[]} tags - Array of tag strings
 * @property {string} [chapterId] - Optional ID of chapter owning resource
 */
const resourceSchema = t.Object({
  title: t.String(),
  type: t.String(),
  url: t.String(),
  description: t.Optional(t.String()),
  category: t.String(),
  tags: t.Array(t.String()),
  chapterId: t.Optional(t.String()),
});

/**
 * Schema for creating a new chapter
 * @typedef {Object} ChapterSchema
 * @property {string} name - Full name of the chapter
 * @property {string} greekName - Greek letter name of chapter
 * @property {string} foundingDate - Founding date in ISO format
 * @property {string} university - University where chapter is located
 * @property {string} location - Physical location of chapter
 * @property {string} status - Current status of chapter
 * @property {number} latitude - Latitude coordinate
 * @property {number} longitude - Longitude coordinate
 */
const chapterSchema = t.Object({
  name: t.String(),
  greekName: t.String(),
  foundingDate: t.String(), // Will be converted to DateTime
  university: t.String(),
  location: t.String(),
  status: t.String(),
  latitude: t.Number(),
  longitude: t.Number(),
});

/**
 * Schema for updating an existing member
 * @typedef {Object} MemberUpdateSchema
 * @property {string} [resumeId] - New resume ID
 * @property {string} [chapterId] - New chapter ID
 */
const memberUpdateSchema = t.Object({
  resumeId: t.Optional(t.String()),
  chapterId: t.Optional(t.String()),
});

/**
 * Schema for updating an existing event
 * @typedef {Object} EventUpdateSchema
 * @property {string} [name] - New event name
 * @property {string} [description] - New description
 * @property {string} [startDate] - New start date in ISO format
 * @property {string} [endDate] - New end date in ISO format
 * @property {string} [location] - New location
 * @property {string} [type] - New event type
 * @property {string} [status] - New status
 */
const eventUpdateSchema = t.Object({
  name: t.Optional(t.String()),
  description: t.Optional(t.String()),
  startDate: t.Optional(t.String()),
  endDate: t.Optional(t.String()),
  location: t.Optional(t.String()),
  type: t.Optional(t.String()),
  status: t.Optional(t.String()),
});

/**
 * Schema for updating an existing resource
 * @typedef {Object} ResourceUpdateSchema
 * @property {string} [title] - New resource title
 * @property {string} [type] - New resource type
 * @property {string} [url] - New URL
 * @property {string} [description] - New description
 * @property {string} [category] - New category
 * @property {string[]} [tags] - New array of tags
 * @property {string} [chapterId] - New chapter ID
 */
const resourceUpdateSchema = t.Object({
  title: t.Optional(t.String()),
  type: t.Optional(t.String()),
  url: t.Optional(t.String()),
  description: t.Optional(t.String()),
  category: t.Optional(t.String()),
  tags: t.Optional(t.Array(t.String())),
  chapterId: t.Optional(t.String()),
});

/**
 * Schema for updating an existing chapter
 * @typedef {Object} ChapterUpdateSchema
 * @property {string} [name] - New chapter name
 * @property {string} [greekName] - New Greek letter name
 * @property {string} [university] - New university
 * @property {string} [location] - New location
 * @property {string} [status] - New status
 * @property {number} [latitude] - New latitude
 * @property {number} [longitude] - New longitude
 */
const chapterUpdateSchema = t.Object({
  name: t.Optional(t.String()),
  greekName: t.Optional(t.String()),
  university: t.Optional(t.String()),
  location: t.Optional(t.String()),
  status: t.Optional(t.String()),
  latitude: t.Optional(t.Number()),
  longitude: t.Optional(t.Number()),
});

/**
 * Schema for creating an RSVP response
 * @typedef {Object} RSVPSchema
 * @property {string} status - RSVP status ('yes', 'no', 'maybe')
 */
const rsvpSchema = t.Object({
  status: t.String(),
});

export type {
  memberSchema,
  eventSchema,
  resourceSchema,
  chapterSchema,
  memberUpdateSchema,
  eventUpdateSchema,
  resourceUpdateSchema,
  chapterUpdateSchema,
  rsvpSchema,
};
