/**
 * @fileoverview GraphQL schema definitions for the Kappa Theta Pi API
 * Defines types, queries and mutations for users, chapters, events and related entities
 */

import { gql } from '@elysiajs/apollo';

/**
 * GraphQL schema type definitions using the gql tag
 *
 * @typedef {Object} TypeDefs
 * @property {Object} User - User type with authentication and profile data
 * @property {Object} Profile - Extended user profile information
 * @property {Object} Chapter - University chapter information and relationships
 * @property {Object} Event - Event details and chapter association
 * @property {Enum} Role - User role enumeration
 * @property {Scalar} DateTime - Custom scalar for date/time fields
 * @property {Object} Query - Root query type with data fetching operations
 * @property {Object} Mutation - Root mutation type with data modification operations
 */
export const typeDefs = gql`
  """
  User type containing core user data and authentication details
  """
  type User {
    id: ID!
    name: String
    email: String
    emailVerified: DateTime
    image: String
    role: Role!
    isTwoFactorEnabled: Boolean!
    profile: Profile
  }

  """
  Extended profile information associated with a user
  """
  type Profile {
    id: ID!
    role: Role!
    active: Boolean!
    version: String
    photoUrl: String
    address: Address
    member: Member
    company: Company
  }

  """
  University chapter information including location and relationships
  """
  type Chapter {
    id: ID!
    name: String!
    greekName: String!
    university: String!
    status: String!
    latitude: Float!
    longitude: Float!
    members: [Member!]
    events: [Event!]
    resources: [Resource!]
  }

  """
  Event details including timing, location and chapter association
  """
  type Event {
    id: ID!
    name: String!
    description: String!
    startDate: DateTime!
    endDate: DateTime!
    location: String!
    type: String!
    status: String!
    chapter: Chapter!
  }

  """
  User role enumeration defining access levels
  """
  enum Role {
    GUEST
    MEMBER
    COMPANY
  }

  """
  Custom scalar type for handling dates and times
  """
  scalar DateTime

  """
  Root Query type providing data fetching operations
  """
  type Query {
    """
    Fetch all users
    @returns {[User!]!} Array of user objects
    """
    users: [User!]!

    """
    Fetch a single user by ID
    @param {ID!} id - User ID
    @returns {User} User object if found
    """
    user(id: ID!): User

    """
    Fetch chapters with optional filtering
    @param {String} status - Filter by chapter status
    @param {String} search - Search chapters by name
    @returns {[Chapter!]!} Array of matching chapters
    """
    chapters(status: String, search: String): [Chapter!]!

    """
    Fetch a single chapter by ID
    @param {ID!} id - Chapter ID
    @returns {Chapter} Chapter object if found
    """
    chapter(id: ID!): Chapter

    """
    Fetch all events
    @returns {[Event!]!} Array of event objects
    """
    events: [Event!]!

    """
    Fetch a single event by ID
    @param {ID!} id - Event ID
    @returns {Event} Event object if found
    """
    event(id: ID!): Event
  }

  """
  Root Mutation type providing data modification operations
  """
  type Mutation {
    """
    Create a new event
    @param {String!} name - Event name
    @param {String!} description - Event description
    @param {DateTime!} startDate - Event start date/time
    @param {DateTime!} endDate - Event end date/time
    @param {String!} location - Event location
    @param {String!} type - Event type
    @param {String!} status - Event status
    @param {ID!} chapterId - Associated chapter ID
    @returns {Event!} Created event object
    """
    createEvent(
      name: String!
      description: String!
      startDate: DateTime!
      endDate: DateTime!
      location: String!
      type: String!
      status: String!
      chapterId: ID!
    ): Event!

    """
    Update an existing event
    @param {ID!} id - Event ID to update
    @param {String} name - Updated event name
    @param {String} description - Updated event description
    @param {DateTime} startDate - Updated start date/time
    @param {DateTime} endDate - Updated end date/time
    @param {String} location - Updated location
    @param {String} type - Updated event type
    @param {String} status - Updated event status
    @returns {Event!} Updated event object
    """
    updateEvent(
      id: ID!
      name: String
      description: String
      startDate: DateTime
      endDate: DateTime
      location: String
      type: String
      status: String
    ): Event!
  }
`;

export default typeDefs;
