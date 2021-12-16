/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JSONObject";
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Upload";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSONObject";
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CommentCreateInput: { // input type
    message?: string | null; // String
  }
  LikeCreateInput: { // input type
    id: number; // Int!
  }
  ProfileCreateInput: { // input type
    avatar?: string | null; // String
    bio?: string | null; // String
    id: number; // Int!
    website?: string | null; // String
  }
  ProjectCreateInput: { // input type
    editor_input?: NexusGenScalars['JSONObject'] | null; // JSONObject
    id: number; // Int!
    title: string; // String!
  }
  ProjectOrderByInput: { // input type
    createdAt: NexusGenEnums['SortOrder']; // SortOrder!
  }
  UserCreateInput: { // input type
    comments: NexusGenInputs['CommentCreateInput'][]; // [CommentCreateInput!]!
    email: string; // String!
    name?: string | null; // String
    profile?: NexusGenInputs['ProfileCreateInput'] | null; // ProfileCreateInput
    projects: NexusGenInputs['ProjectCreateInput'][]; // [ProjectCreateInput!]!
  }
  VerificationTokenCreateInput: { // input type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    token: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenEnums {
  NotificationSource: 1 | 3 | 2 | 4
  SortOrder: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  JSONObject: any
  Upload: any
}

export interface NexusGenObjects {
  AuthResponse: { // root type
    code?: number | null; // Int
    data?: NexusGenRootTypes['User'] | null; // User
    message?: string | null; // String
    token?: string | null; // String
  }
  Comment: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    message: string; // String!
    parentId?: number | null; // Int
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  CommentResponse: { // root type
    code?: number | null; // Int
    data?: NexusGenRootTypes['Comment'] | null; // Comment
    message?: string | null; // String
  }
  Edge: { // root type
    cursor?: string | null; // String
    node?: NexusGenRootTypes['Project'] | null; // Project
  }
  ExistencePayload: { // root type
    exist?: boolean | null; // Boolean
  }
  ExistenceResponse: { // root type
    code?: number | null; // Int
    data?: NexusGenRootTypes['ExistencePayload'] | null; // ExistencePayload
    message?: string | null; // String
  }
  Like: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  LikeResponse: { // root type
    code?: number | null; // Int
    data?: NexusGenRootTypes['Like'] | null; // Like
    message?: string | null; // String
  }
  Mutation: {};
  Notification: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    message: string; // String!
    notification: NexusGenEnums['NotificationSource']; // NotificationSource!
    read: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage?: boolean | null; // Boolean
  }
  Profile: { // root type
    avatar?: string | null; // String
    bio?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    website?: string | null; // String
  }
  ProfileAvatar: { // root type
    avatar?: string | null; // String
    id: number; // Int!
  }
  ProfileAvatarResponse: { // root type
    code?: number | null; // Int
    data?: NexusGenRootTypes['ProfileAvatar'] | null; // ProfileAvatar
    message?: string | null; // String
  }
  ProfileInfo: { // root type
    bio?: string | null; // String
    id: number; // Int!
    website?: string | null; // String
  }
  ProfileInfoResponse: { // root type
    code?: number | null; // Int
    data?: NexusGenRootTypes['ProfileInfo'] | null; // ProfileInfo
    message?: string | null; // String
  }
  Project: { // root type
    _count?: NexusGenRootTypes['ProjectCountPayload'] | null; // ProjectCountPayload
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description?: string | null; // String
    editor_input?: NexusGenScalars['JSONObject'] | null; // JSONObject
    id: string; // String!
    thumbnail?: string | null; // String
    title?: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  ProjectCountPayload: { // root type
    comments?: number | null; // Int
    likes?: number | null; // Int
    views?: number | null; // Int
  }
  ProjectResponse: { // root type
    code?: number | null; // Int
    data?: NexusGenRootTypes['Project'] | null; // Project
    message?: string | null; // String
  }
  ProjectsByUsernameResponse: { // root type
    code?: number | null; // Int
    data?: Array<NexusGenRootTypes['Project'] | null> | null; // [Project]
    message?: string | null; // String
  }
  ProjectsListResponse: { // root type
    code?: number | null; // Int
    data?: Array<NexusGenRootTypes['Project'] | null> | null; // [Project]
    message?: string | null; // String
  }
  ProjectsResponse: { // root type
    code?: number | null; // Int
    edges?: Array<NexusGenRootTypes['Edge'] | null> | null; // [Edge]
    message?: string | null; // String
    pageInfo?: NexusGenRootTypes['PageInfo'] | null; // PageInfo
  }
  Query: {};
  SearchResponse: { // root type
    code?: number | null; // Int
    data?: NexusGenRootTypes['SearchResult'] | null; // SearchResult
    message?: string | null; // String
  }
  SearchResult: { // root type
    projectSearch: Array<NexusGenRootTypes['Project'] | null>; // [Project]!
    userSearch: Array<NexusGenRootTypes['User'] | null>; // [User]!
  }
  User: { // root type
    _count?: NexusGenRootTypes['UserCountPayload'] | null; // UserCountPayload
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
    verifiedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  UserCountPayload: { // root type
    followers?: number | null; // Int
    following?: number | null; // Int
    projects?: number | null; // Int
  }
  UserResponse: { // root type
    code?: number | null; // Int
    data?: NexusGenRootTypes['User'] | null; // User
    message?: string | null; // String
  }
  UsersResponse: { // root type
    code?: number | null; // Int
    data?: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    message?: string | null; // String
  }
  VerificationToken: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    token: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  VerificationTokenResponse: { // root type
    code?: number | null; // Int
    data?: NexusGenRootTypes['VerificationToken'] | null; // VerificationToken
    message?: string | null; // String
  }
  View: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    ip: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthResponse: { // field return type
    code: number | null; // Int
    data: NexusGenRootTypes['User'] | null; // User
    message: string | null; // String
    token: string | null; // String
  }
  Comment: { // field return type
    author: NexusGenRootTypes['User']; // User!
    children: NexusGenRootTypes['Comment'][]; // [Comment!]!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    message: string; // String!
    parentId: number | null; // Int
    project: NexusGenRootTypes['Project'] | null; // Project
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  CommentResponse: { // field return type
    code: number | null; // Int
    data: NexusGenRootTypes['Comment'] | null; // Comment
    message: string | null; // String
  }
  Edge: { // field return type
    cursor: string | null; // String
    node: NexusGenRootTypes['Project'] | null; // Project
  }
  ExistencePayload: { // field return type
    exist: boolean | null; // Boolean
  }
  ExistenceResponse: { // field return type
    code: number | null; // Int
    data: NexusGenRootTypes['ExistencePayload'] | null; // ExistencePayload
    message: string | null; // String
  }
  Like: { // field return type
    author: NexusGenRootTypes['User']; // User!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    project: NexusGenRootTypes['Project']; // Project!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  LikeResponse: { // field return type
    code: number | null; // Int
    data: NexusGenRootTypes['Like'] | null; // Like
    message: string | null; // String
  }
  Mutation: { // field return type
    checkEmail: NexusGenRootTypes['ExistenceResponse'] | null; // ExistenceResponse
    checkUsername: NexusGenRootTypes['ExistenceResponse'] | null; // ExistenceResponse
    createChildComment: NexusGenRootTypes['CommentResponse'] | null; // CommentResponse
    createComment: NexusGenRootTypes['CommentResponse'] | null; // CommentResponse
    createProject: NexusGenRootTypes['ProjectResponse'] | null; // ProjectResponse
    deleteComment: NexusGenRootTypes['CommentResponse'] | null; // CommentResponse
    deleteProject: NexusGenRootTypes['ProjectResponse'] | null; // ProjectResponse
    followUser: NexusGenRootTypes['UserResponse'] | null; // UserResponse
    forgotPassword: NexusGenRootTypes['VerificationTokenResponse'] | null; // VerificationTokenResponse
    login: NexusGenRootTypes['AuthResponse'] | null; // AuthResponse
    resetPassword: NexusGenRootTypes['UserResponse'] | null; // UserResponse
    signup: NexusGenRootTypes['AuthResponse'] | null; // AuthResponse
    toggleLikeProject: NexusGenRootTypes['LikeResponse'] | null; // LikeResponse
    unFollowUser: NexusGenRootTypes['UserResponse'] | null; // UserResponse
    updateComment: NexusGenRootTypes['CommentResponse'] | null; // CommentResponse
    updateProfileAvatar: NexusGenRootTypes['ProfileAvatarResponse'] | null; // ProfileAvatarResponse
    updateProfileInfo: NexusGenRootTypes['ProfileInfoResponse'] | null; // ProfileInfoResponse
    updateProject: NexusGenRootTypes['ProjectResponse'] | null; // ProjectResponse
    updateProjectThumbnail: NexusGenRootTypes['ProjectResponse'] | null; // ProjectResponse
    updateUser: NexusGenRootTypes['UserResponse'] | null; // UserResponse
    verifiedUser: NexusGenRootTypes['VerificationTokenResponse'] | null; // VerificationTokenResponse
  }
  Notification: { // field return type
    author: NexusGenRootTypes['User']; // User!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    message: string; // String!
    notification: NexusGenEnums['NotificationSource']; // NotificationSource!
    read: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean | null; // Boolean
  }
  Profile: { // field return type
    author: NexusGenRootTypes['User']; // User!
    avatar: string | null; // String
    bio: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    website: string | null; // String
  }
  ProfileAvatar: { // field return type
    avatar: string | null; // String
    id: number; // Int!
  }
  ProfileAvatarResponse: { // field return type
    code: number | null; // Int
    data: NexusGenRootTypes['ProfileAvatar'] | null; // ProfileAvatar
    message: string | null; // String
  }
  ProfileInfo: { // field return type
    bio: string | null; // String
    id: number; // Int!
    website: string | null; // String
  }
  ProfileInfoResponse: { // field return type
    code: number | null; // Int
    data: NexusGenRootTypes['ProfileInfo'] | null; // ProfileInfo
    message: string | null; // String
  }
  Project: { // field return type
    _count: NexusGenRootTypes['ProjectCountPayload'] | null; // ProjectCountPayload
    author: NexusGenRootTypes['User']; // User!
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string | null; // String
    editor_input: NexusGenScalars['JSONObject'] | null; // JSONObject
    id: string; // String!
    likes: NexusGenRootTypes['Like'][]; // [Like!]!
    thumbnail: string | null; // String
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  ProjectCountPayload: { // field return type
    comments: number | null; // Int
    likes: number | null; // Int
    views: number | null; // Int
  }
  ProjectResponse: { // field return type
    code: number | null; // Int
    data: NexusGenRootTypes['Project'] | null; // Project
    message: string | null; // String
  }
  ProjectsByUsernameResponse: { // field return type
    code: number | null; // Int
    data: Array<NexusGenRootTypes['Project'] | null> | null; // [Project]
    message: string | null; // String
  }
  ProjectsListResponse: { // field return type
    code: number | null; // Int
    data: Array<NexusGenRootTypes['Project'] | null> | null; // [Project]
    message: string | null; // String
  }
  ProjectsResponse: { // field return type
    code: number | null; // Int
    edges: Array<NexusGenRootTypes['Edge'] | null> | null; // [Edge]
    message: string | null; // String
    pageInfo: NexusGenRootTypes['PageInfo'] | null; // PageInfo
  }
  Query: { // field return type
    hotUsers: NexusGenRootTypes['UsersResponse'] | null; // UsersResponse
    me: NexusGenRootTypes['UserResponse'] | null; // UserResponse
    myProjects: NexusGenRootTypes['ProjectsResponse'] | null; // ProjectsResponse
    project: NexusGenRootTypes['ProjectResponse'] | null; // ProjectResponse
    projectPreview: NexusGenRootTypes['ProjectResponse'] | null; // ProjectResponse
    projects: NexusGenRootTypes['ProjectsResponse'] | null; // ProjectsResponse
    projectsByUsername: NexusGenRootTypes['ProjectsByUsernameResponse'] | null; // ProjectsByUsernameResponse
    search: NexusGenRootTypes['SearchResponse'] | null; // SearchResponse
    user: NexusGenRootTypes['UserResponse'] | null; // UserResponse
    users: NexusGenRootTypes['UsersResponse'] | null; // UsersResponse
  }
  SearchResponse: { // field return type
    code: number | null; // Int
    data: NexusGenRootTypes['SearchResult'] | null; // SearchResult
    message: string | null; // String
  }
  SearchResult: { // field return type
    projectSearch: Array<NexusGenRootTypes['Project'] | null>; // [Project]!
    userSearch: Array<NexusGenRootTypes['User'] | null>; // [User]!
  }
  User: { // field return type
    _count: NexusGenRootTypes['UserCountPayload'] | null; // UserCountPayload
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    followers: NexusGenRootTypes['User'][]; // [User!]!
    following: NexusGenRootTypes['User'][]; // [User!]!
    id: number; // Int!
    likes: NexusGenRootTypes['Like'][]; // [Like!]!
    notifications: NexusGenRootTypes['Notification'][]; // [Notification!]!
    profile: NexusGenRootTypes['Profile'] | null; // Profile
    projects: NexusGenRootTypes['Project'][]; // [Project!]!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
    verifiedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  UserCountPayload: { // field return type
    followers: number | null; // Int
    following: number | null; // Int
    projects: number | null; // Int
  }
  UserResponse: { // field return type
    code: number | null; // Int
    data: NexusGenRootTypes['User'] | null; // User
    message: string | null; // String
  }
  UsersResponse: { // field return type
    code: number | null; // Int
    data: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    message: string | null; // String
  }
  VerificationToken: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    token: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  VerificationTokenResponse: { // field return type
    code: number | null; // Int
    data: NexusGenRootTypes['VerificationToken'] | null; // VerificationToken
    message: string | null; // String
  }
  View: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    ip: string; // String!
    project: NexusGenRootTypes['Project']; // Project!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenFieldTypeNames {
  AuthResponse: { // field return type name
    code: 'Int'
    data: 'User'
    message: 'String'
    token: 'String'
  }
  Comment: { // field return type name
    author: 'User'
    children: 'Comment'
    createdAt: 'DateTime'
    id: 'Int'
    message: 'String'
    parentId: 'Int'
    project: 'Project'
    updatedAt: 'DateTime'
  }
  CommentResponse: { // field return type name
    code: 'Int'
    data: 'Comment'
    message: 'String'
  }
  Edge: { // field return type name
    cursor: 'String'
    node: 'Project'
  }
  ExistencePayload: { // field return type name
    exist: 'Boolean'
  }
  ExistenceResponse: { // field return type name
    code: 'Int'
    data: 'ExistencePayload'
    message: 'String'
  }
  Like: { // field return type name
    author: 'User'
    createdAt: 'DateTime'
    id: 'Int'
    project: 'Project'
    updatedAt: 'DateTime'
  }
  LikeResponse: { // field return type name
    code: 'Int'
    data: 'Like'
    message: 'String'
  }
  Mutation: { // field return type name
    checkEmail: 'ExistenceResponse'
    checkUsername: 'ExistenceResponse'
    createChildComment: 'CommentResponse'
    createComment: 'CommentResponse'
    createProject: 'ProjectResponse'
    deleteComment: 'CommentResponse'
    deleteProject: 'ProjectResponse'
    followUser: 'UserResponse'
    forgotPassword: 'VerificationTokenResponse'
    login: 'AuthResponse'
    resetPassword: 'UserResponse'
    signup: 'AuthResponse'
    toggleLikeProject: 'LikeResponse'
    unFollowUser: 'UserResponse'
    updateComment: 'CommentResponse'
    updateProfileAvatar: 'ProfileAvatarResponse'
    updateProfileInfo: 'ProfileInfoResponse'
    updateProject: 'ProjectResponse'
    updateProjectThumbnail: 'ProjectResponse'
    updateUser: 'UserResponse'
    verifiedUser: 'VerificationTokenResponse'
  }
  Notification: { // field return type name
    author: 'User'
    createdAt: 'DateTime'
    id: 'Int'
    message: 'String'
    notification: 'NotificationSource'
    read: 'Boolean'
    updatedAt: 'DateTime'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
  }
  Profile: { // field return type name
    author: 'User'
    avatar: 'String'
    bio: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    updatedAt: 'DateTime'
    website: 'String'
  }
  ProfileAvatar: { // field return type name
    avatar: 'String'
    id: 'Int'
  }
  ProfileAvatarResponse: { // field return type name
    code: 'Int'
    data: 'ProfileAvatar'
    message: 'String'
  }
  ProfileInfo: { // field return type name
    bio: 'String'
    id: 'Int'
    website: 'String'
  }
  ProfileInfoResponse: { // field return type name
    code: 'Int'
    data: 'ProfileInfo'
    message: 'String'
  }
  Project: { // field return type name
    _count: 'ProjectCountPayload'
    author: 'User'
    comments: 'Comment'
    createdAt: 'DateTime'
    description: 'String'
    editor_input: 'JSONObject'
    id: 'String'
    likes: 'Like'
    thumbnail: 'String'
    title: 'String'
    updatedAt: 'DateTime'
  }
  ProjectCountPayload: { // field return type name
    comments: 'Int'
    likes: 'Int'
    views: 'Int'
  }
  ProjectResponse: { // field return type name
    code: 'Int'
    data: 'Project'
    message: 'String'
  }
  ProjectsByUsernameResponse: { // field return type name
    code: 'Int'
    data: 'Project'
    message: 'String'
  }
  ProjectsListResponse: { // field return type name
    code: 'Int'
    data: 'Project'
    message: 'String'
  }
  ProjectsResponse: { // field return type name
    code: 'Int'
    edges: 'Edge'
    message: 'String'
    pageInfo: 'PageInfo'
  }
  Query: { // field return type name
    hotUsers: 'UsersResponse'
    me: 'UserResponse'
    myProjects: 'ProjectsResponse'
    project: 'ProjectResponse'
    projectPreview: 'ProjectResponse'
    projects: 'ProjectsResponse'
    projectsByUsername: 'ProjectsByUsernameResponse'
    search: 'SearchResponse'
    user: 'UserResponse'
    users: 'UsersResponse'
  }
  SearchResponse: { // field return type name
    code: 'Int'
    data: 'SearchResult'
    message: 'String'
  }
  SearchResult: { // field return type name
    projectSearch: 'Project'
    userSearch: 'User'
  }
  User: { // field return type name
    _count: 'UserCountPayload'
    comments: 'Comment'
    createdAt: 'DateTime'
    email: 'String'
    followers: 'User'
    following: 'User'
    id: 'Int'
    likes: 'Like'
    notifications: 'Notification'
    profile: 'Profile'
    projects: 'Project'
    updatedAt: 'DateTime'
    username: 'String'
    verifiedAt: 'DateTime'
  }
  UserCountPayload: { // field return type name
    followers: 'Int'
    following: 'Int'
    projects: 'Int'
  }
  UserResponse: { // field return type name
    code: 'Int'
    data: 'User'
    message: 'String'
  }
  UsersResponse: { // field return type name
    code: 'Int'
    data: 'User'
    message: 'String'
  }
  VerificationToken: { // field return type name
    createdAt: 'DateTime'
    email: 'String'
    expiredAt: 'DateTime'
    id: 'Int'
    token: 'String'
    updatedAt: 'DateTime'
  }
  VerificationTokenResponse: { // field return type name
    code: 'Int'
    data: 'VerificationToken'
    message: 'String'
  }
  View: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    ip: 'String'
    project: 'Project'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    checkEmail: { // args
      email: string; // String!
    }
    checkUsername: { // args
      username?: string | null; // String
    }
    createChildComment: { // args
      message?: string | null; // String
      parentId?: number | null; // Int
    }
    createComment: { // args
      id?: string | null; // String
      message?: string | null; // String
    }
    createProject: { // args
      description?: string | null; // String
      editor_input?: NexusGenScalars['JSONObject'] | null; // JSONObject
      title?: string | null; // String
    }
    deleteComment: { // args
      id?: number | null; // Int
    }
    deleteProject: { // args
      id?: string | null; // String
    }
    followUser: { // args
      following_id: number; // Int!
    }
    forgotPassword: { // args
      email: string; // String!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    resetPassword: { // args
      password: string; // String!
      token: string; // String!
    }
    signup: { // args
      email: string; // String!
      password: string; // String!
      username?: string | null; // String
    }
    toggleLikeProject: { // args
      id?: string | null; // String
    }
    unFollowUser: { // args
      following_id: number; // Int!
    }
    updateComment: { // args
      id?: number | null; // Int
      message?: string | null; // String
    }
    updateProfileAvatar: { // args
      avatar?: NexusGenScalars['Upload'] | null; // Upload
      id?: number | null; // Int
    }
    updateProfileInfo: { // args
      bio?: string | null; // String
      id?: number | null; // Int
      website?: string | null; // String
    }
    updateProject: { // args
      description?: string | null; // String
      editor_input?: NexusGenScalars['JSONObject'] | null; // JSONObject
      id?: string | null; // String
      title?: string | null; // String
    }
    updateProjectThumbnail: { // args
      id?: string | null; // String
    }
    updateUser: { // args
      email: string; // String!
      id?: number | null; // Int
      password: string; // String!
      username?: string | null; // String
    }
    verifiedUser: { // args
      token: string; // String!
    }
  }
  Query: {
    hotUsers: { // args
      take?: number | null; // Int
    }
    myProjects: { // args
      after?: string | null; // String
      first?: number | null; // Int
      orderBy?: NexusGenInputs['ProjectOrderByInput'] | null; // ProjectOrderByInput
    }
    project: { // args
      id?: string | null; // String
    }
    projectPreview: { // args
      id?: string | null; // String
    }
    projects: { // args
      after?: string | null; // String
      first?: number | null; // Int
      orderBy?: NexusGenInputs['ProjectOrderByInput'] | null; // ProjectOrderByInput
    }
    projectsByUsername: { // args
      username?: string | null; // String
    }
    search: { // args
      term?: string | null; // String
    }
    user: { // args
      username?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}